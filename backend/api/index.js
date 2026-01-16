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
  if (!emailEnabled || !transporter) {
    console.log('⚠️ Email not configured, skipping send');
    return false;
  }

  try {
    const mailOptions = {
      from: `"BLINKHOURCITY 💖" <${EMAIL_USER}>`,
      to: email,
      subject: '💖 WELCOME TO THE BLINK FAMILY! 💖',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>WELCOME TO THE BLINK FAMILY!</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #000;
              color: #ffffff;
              line-height: 1.6;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #000;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(236, 72, 153, 0.4);
            }
            .header {
              background: linear-gradient(135deg, #ec4899, #c026d3, #a855f7);
              padding: 60px 30px 40px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 42px;
              font-weight: 900;
              color: #fff;
              text-transform: uppercase;
              letter-spacing: 2px;
              text-shadow: 0 4px 20px rgba(0,0,0,0.6);
            }
            .emoji {
              font-size: 48px;
              margin: 0 8px;
            }
            .content {
              padding: 40px 30px;
              text-align: center;
            }
            .greeting {
              font-size: 32px;
              font-weight: 800;
              color: #ec4899;
              margin-bottom: 20px;
            }
            .intro {
              font-size: 18px;
              color: #e5e5e5;
              margin-bottom: 30px;
            }
            .highlight {
              color: #ec4899;
              font-weight: bold;
            }
            .perks {
              background: rgba(236, 72, 153, 0.08);
              border-radius: 16px;
              padding: 30px;
              margin: 30px 0;
              text-align: left;
            }
            .perks h3 {
              font-size: 22px;
              color: #fff;
              margin-bottom: 20px;
              text-align: center;
            }
            .perk-item {
              display: flex;
              align-items: center;
              margin-bottom: 16px;
              font-size: 16px;
              color: #e5e5e5;
            }
            .perk-icon {
              font-size: 24px;
              margin-right: 16px;
              min-width: 30px;
              text-align: center;
            }
            .buttons {
              margin: 40px 0;
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              justify-content: center;
            }
            .button {
              display: inline-block;
              padding: 16px 32px;
              background: linear-gradient(135deg, #ec4899, #a855f7);
              color: white !important;
              font-weight: 800;
              font-size: 16px;
              border-radius: 50px;
              text-decoration: none;
              box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
              transition: all 0.3s;
            }
            .button:hover {
              transform: translateY(-3px);
              box-shadow: 0 12px 35px rgba(236, 72, 153, 0.6);
            }
            .footer {
              background: #000;
              padding: 30px;
              text-align: center;
              font-size: 14px;
              color: #888;
              border-top: 1px solid #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                <span class="emoji">💖</span>
                WELCOME TO THE BLINK FAMILY!
                <span class="emoji">💖</span>
              </h1>
            </div>

            <div class="content">
              <div class="greeting">Hey blink! 👋</div>

              <div class="intro">
                We're so excited to have you join the <span class="highlight">BLACKPINK</span> 
                <span class="highlight">'BLINKHOURCITY'</span> fan community!<br>
                You're now part of millions of BLINKs worldwide who share the love for 
                <span class="highlight">JISOO, JENNIE, ROSÉ, and LISA!</span>
              </div>

              <div class="perks">
                <h3>Here's what you'll get:</h3>
                <div class="perk-item">
                  <span class="perk-icon">✨</span> Exclusive updates and announcements
                </div>
                <div class="perk-item">
                  <span class="perk-icon">🎵</span> Behind-the-scenes content
                </div>
                <div class="perk-item">
                  <span class="perk-icon">🎤</span> Early access to comeback news
                </div>
                <div class="perk-item">
                  <span class="perk-icon">💌</span> Special fan events and giveaways
                </div>
                <div class="perk-item">
                  <span class="perk-icon">🌟</span> Connect with fellow BLINKs on <strong>${socialPlatform}</strong>
                </div>
              </div>

              <div class="buttons">
                <a href="https://www.youtube.com/c/BLACKPINKOFFICIAL" class="button">
                  🎬 VISIT BLACKPINK'S YOUTUBE
                </a>
                <a href="https://forms.sonymusicfans.com/campaign/blackpink-deadline/" class="button">
                  📦 PRE-ORDER BLACKPINK's 3RD MINI ALBUM [DEADLINE]
                </a>
              </div>
            </div>

            <div class="footer">
              Made with 💖 for BLINKs worldwide 🌎
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${censorEmail(email)}`);
    return true;
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
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