require('dotenv').config();
const nodemailer = require('nodemailer');
const { createClient } = require('redis');

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

let transporter = null;
let emailEnabled = false;

// Redis client
let redisClient = null;

// Redis keys
const SIGNUPS_KEY = 'blinkhourcity:signups';
const DAILY_KEY_PREFIX = 'blinkhourcity:daily:';

// Initialize Redis
async function initRedis() {
  if (redisClient) return;

  if (!process.env.REDIS_URL) {
    console.error('❌ REDIS_URL is missing');
    return;
  }

  try {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on('error', err => console.error('Redis Error:', err));
    await redisClient.connect();
    console.log('✅ Redis connected');
  } catch (err) {
    console.error('❌ Redis connection failed:', err.message);
  }
}

// Initialize email
async function initEmail() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('⚠️ Email credentials missing');
    emailEnabled = false;
    return;
  }

  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });
    await transporter.verify();
    emailEnabled = true;
    console.log('✅ Email ready');
  } catch (err) {
    console.error('❌ Email setup failed:', err.message);
    emailEnabled = false;
  }
}

// Load signups
async function loadSignups() {
  try {
    const data = await redisClient.get(SIGNUPS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('❌ loadSignups error:', err.message);
    return [];
  }
}

// Save signups
async function saveSignups(signups) {
  try {
    await redisClient.set(SIGNUPS_KEY, JSON.stringify(signups));
    console.log(`💾 Saved ${signups.length} signups`);
    return true;
  } catch (err) {
    console.error('❌ saveSignups error:', err.message);
    return false;
  }
}

function censorEmail(email) {
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

async function sendWelcomeEmail(email, username, socialPlatform) {
  if (!emailEnabled || !transporter) return false;

  try {
    const mailOptions = {
      from: `"BLINKHOURCITY 💖" <${EMAIL_USER}>`,
      to: email,
      subject: '💖 Welcome to BLINKHOURCITY!',
      html: `
        <h1 style="color:#ec4899">Hey ${username}!</h1>
        <p style="font-size:18px">Welcome to the BLINK family! 💖</p>
        <p>You joined via <strong>${socialPlatform}</strong></p>
        <p>Thank you for being part of BLINKHOURCITY!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${censorEmail(email)}`);
    return true;
  } catch (err) {
    console.error('❌ Email failed:', err.message);
    return false;
  }
}

// Main handler
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  await initEmail();
  await initRedis();

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // GET /api/stats
  if (pathname === '/api/stats' && req.method === 'GET') {
    const signups = await loadSignups();
    return res.status(200).json({
      streams: 5300000,
      blinks: signups.length,
      views: 40900000000
    });
  }

  // POST /api/signup
  if (pathname === '/api/signup' && req.method === 'POST') {
    try {
      const { email, username, socialPlatform } = req.body || {};

      if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email' });
      }
      if (!username?.trim()) {
        return res.status(400).json({ message: 'Username required' });
      }
      if (!socialPlatform) {
        return res.status(400).json({ message: 'Select a platform' });
      }

      const today = new Date().toISOString().split('T')[0];
      const dailyKey = `${DAILY_KEY_PREFIX}${today}`;
      let dailyCount = parseInt(await redisClient.get(dailyKey) || '0', 10);

      if (dailyCount >= 500) {
        return res.status(429).json({ 
          message: 'Daily limit reached',
          limitReached: true
        });
      }

      const signups = await loadSignups();

      if (signups.some(s => s.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({ message: 'Email already registered 💖' });
      }

      const newSignup = {
        email,
        username: username.trim(),
        socialPlatform,
        timestamp: new Date().toISOString()
      };

      signups.push(newSignup);
      await saveSignups(signups);

      await redisClient.incr(dailyKey);
      await redisClient.expire(dailyKey, 86400);

      sendWelcomeEmail(email, username, socialPlatform).catch(console.error);

      return res.status(200).json({ 
        message: 'Welcome! Check your email 💖',
        count: signups.length
      });
    } catch (err) {
      console.error('Signup error:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // GET /api/signups - styled HTML table page
  if (pathname === '/api/signups' && req.method === 'GET') {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>BLINKHOURCITY - All BLINKs Joined 💖</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <style>
    body {
      background: linear-gradient(to bottom, #000, #1a0033);
      color: white;
      font-family: 'Segoe UI', system-ui, sans-serif;
      min-height: 100vh;
      margin: 0;
    }
    .glow-pink { box-shadow: 0 0 25px rgba(236, 72, 153, 0.6); }
    .gradient-text {
      background: linear-gradient(90deg, #ec4899, #a855f7, #ec4899);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% 100%;
      animation: gradientFlow 6s linear infinite;
    }
    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .blink { animation: blink 1.5s infinite; }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 0.75rem;
    }
    th, td {
      padding: 1rem 1.25rem;
      text-align: left;
    }
    th {
      background: rgba(236, 72, 153, 0.15);
      color: #ec4899;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    tr {
      background: rgba(30, 30, 50, 0.7);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    tr:hover {
      transform: translateY(-3px);
      background: rgba(50, 30, 70, 0.8);
      box-shadow: 0 10px 20px rgba(236, 72, 153, 0.2);
    }
    td:nth-child(1) { font-weight: bold; color: #ec4899; }
    td:nth-child(2) { color: #d946ef; }
    td:nth-child(3) { color: #a855f7; }
    td:nth-child(4) { color: #9ca3af; font-style: italic; }
  </style>
</head>
<body class="bg-black text-white">
  <div class="container mx-auto px-4 py-12 max-w-6xl">
    <header class="text-center mb-12">
      <h1 class="text-5xl md:text-6xl font-extrabold gradient-text mb-4 blink">
        BLINKHOURCITY FAMILY 💖
      </h1>
      <p class="text-xl text-pink-300 mb-2">Total BLINKs Joined:</p>
      <div id="total-count" class="text-6xl md:text-8xl font-black text-pink-500 glow-pink inline-block px-10 py-6 rounded-3xl bg-black/50">
        0
      </div>
      <p class="text-sm text-gray-400 mt-4 animate-pulse">Live • Auto-refreshes every 10 seconds</p>
    </header>

    <div id="loading" class="text-center py-20 text-pink-400 text-2xl animate-pulse">
      Loading BLINK family members...
    </div>
    <div id="empty" class="hidden text-center py-20 text-gray-400 text-xl">
      No BLINKs have joined yet. Be the first! 💖
    </div>

    <table id="signups-table" class="hidden w-full">
      <thead>
        <tr>
          <th>Username</th>
          <th>Platform</th>
          <th>Joined At</th>
          <th>Email (censored)</th>
        </tr>
      </thead>
      <tbody id="signups-body"></tbody>
    </table>
  </div>

  <script>
    async function loadSignups() {
      try {
        const res = await fetch('/api/signups-json');
        const data = await res.json();

        document.getElementById('total-count').textContent = data.total.toLocaleString();

        const body = document.getElementById('signups-body');
        body.innerHTML = '';

        if (data.total === 0) {
          document.getElementById('empty').classList.remove('hidden');
          document.getElementById('loading').classList.add('hidden');
          document.getElementById('signups-table').classList.add('hidden');
          return;
        }

        document.getElementById('empty').classList.add('hidden');
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('signups-table').classList.remove('hidden');

        data.signups.forEach(s => {
          const row = document.createElement('tr');
          row.innerHTML = '<td>' + s.username + '</td>' +
                          '<td>' + s.socialPlatform + '</td>' +
                          '<td>' + s.timestamp + '</td>' +
                          '<td>' + s.email + '</td>';
          body.appendChild(row);
        });
      } catch (err) {
        console.error(err);
        document.getElementById('loading').textContent = 'Error loading BLINKs...';
      }
    }

    loadSignups();
    setInterval(loadSignups, 10000);
  </script>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.end(html);
  }

  // GET /api/signups-json – data for the table
  if (pathname === '/api/signups-json' && req.method === 'GET') {
    try {
      const signups = await loadSignups();
      const censored = signups.map(s => ({
        ...s,
        email: censorEmail(s.email)
      }));
      return res.status(200).json({
        total: signups.length,
        signups: censored
      });
    } catch (err) {
      return res.status(200).json({ total: 0, signups: [] });
    }
  }

  // POST /api/clear-signups
  if (pathname === '/api/clear-signups' && req.method === 'POST') {
    try {
      await redisClient.del(SIGNUPS_KEY);
      return res.status(200).json({ message: 'Signups cleared' });
    } catch (err) {
      return res.status(500).json({ message: 'Error clearing' });
    }
  }

  return res.status(404).json({ error: 'Not found' });
};

// Local dev server
if (require.main === module) {
  const http = require('http');
  const PORT = process.env.PORT || 3000;
  http.createServer((req, res) => module.exports(req, res))
    .listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
}