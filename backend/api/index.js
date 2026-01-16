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
    console.error('❌ REDIS_URL is missing in environment variables');
    return;
  }

  try {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on('error', (err) => console.error('Redis Client Error:', err));

    await redisClient.connect();
    console.log('✅ Redis connected successfully via REDIS_URL');
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error.message);
  }
}

// Initialize email transporter
async function initEmail() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('⚠️ Email credentials missing');
    emailEnabled = false;
    return;
  }

  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });

    await transporter.verify();
    emailEnabled = true;
    console.log('✅ Email configured successfully');
  } catch (error) {
    console.error('❌ Email configuration failed:', error.message);
    emailEnabled = false;
  }
}

// Load signups from Redis
async function loadSignups() {
  try {
    const data = await redisClient.get(SIGNUPS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('❌ Redis load error:', error.message);
    return [];
  }
}

// Save signups to Redis
async function saveSignups(signups) {
  try {
    await redisClient.set(SIGNUPS_KEY, JSON.stringify(signups));
    console.log(`💾 Saved ${signups.length} signups to Redis storage`);
    return true;
  } catch (error) {
    console.error('❌ Redis save error:', error.message);
    return false;
  }
}

function censorEmail(email) {
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const visibleChars = Math.min(2, localPart.length - 1);
  const censored = localPart.substring(0, visibleChars) + '***';
  return `${censored}@${domain}`;
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
      subject: '💖 Welcome to BLINKHOURCITY - You\'re In The Area! ✨',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
              background: #000; margin: 0; padding: 0; line-height: 1.6;
            }
            .email-wrapper { background: #000; padding: 20px 10px; }
            .container {
              max-width: 600px; margin: 0 auto; background: #000;
              border-radius: 24px; overflow: hidden;
              box-shadow: 0 30px 80px rgba(236, 72, 153, 0.6);
            }
            .header {
              background: linear-gradient(135deg, #ec4899 0%, #c026d3 50%, #a855f7 100%);
              padding: 50px 30px; text-align: center; border-radius: 24px 24px 0 0;
            }
            .header h1 {
              color: #fff; font-size: 32px; font-weight: 900;
              letter-spacing: 2px; line-height: 1.3; margin: 0;
              text-transform: uppercase;
              text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            }
            .emoji-large { font-size: 36px; display: inline-block; }
            .content { padding: 50px 35px; background: #000; }
            .greeting { font-size: 28px; font-weight: 800; color: #fff; margin-bottom: 25px; }
            .intro-text { font-size: 16px; color: #e5e5e5; line-height: 1.7; margin-bottom: 30px; }
            .highlight { color: #ec4899; font-weight: 700; }
            .perks-section { background: transparent; border: none; padding: 0; margin: 35px 0; }
            .perks-title { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 20px; }
            .perk-item {
              display: flex; align-items: center; margin-bottom: 12px;
              color: #e5e5e5; font-size: 15px;
            }
            .perk-item:last-child { margin-bottom: 0; }
            .perk-icon { margin-right: 10px; font-size: 18px; }
            .button-container { text-align: center; margin: 45px 0; }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%);
              color: #fff !important; text-decoration: none;
              padding: 16px 28px; border-radius: 50px;
              font-weight: 800; font-size: 14px;
              letter-spacing: 0.5px; margin: 8px 6px;
              box-shadow: 0 8px 25px rgba(236, 72, 153, 0.4);
              text-transform: uppercase;
            }
            .divider {
              height: 1px;
              background: linear-gradient(90deg, transparent 0%, rgba(236, 72, 153, 0.4) 50%, transparent 100%);
              margin: 40px 0;
            }
            .closing-text {
              text-align: left; font-size: 16px; color: #e5e5e5;
              font-weight: 400; margin: 35px 0 20px; line-height: 1.7;
            }
            .social-links {
              text-align: left; padding: 0; background: transparent;
              border-radius: 0; margin-top: 25px;
            }
            .social-links a {
              color: #ec4899; text-decoration: none; font-weight: 600;
              font-size: 14px; margin-right: 8px;
            }
            .footer {
              background: #000; padding: 30px; text-align: center;
              border-top: none;
            }
            .footer-text { color: #666; font-size: 13px; line-height: 1.8; margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="container">
              <div class="header">
                <h1><span class="emoji-large">💖</span> WELCOME TO THE BLINK FAMILY! <span class="emoji-large">💖</span></h1>
              </div>
              
              <div class="content">
                <div class="greeting">Hey ${username}! 👋</div>
                
                <div class="intro-text">
                  We're so excited to have you join the <span class="highlight">BLACKPINK</span> 
                  <span class="highlight">'BLINKHOURCITY'</span> fan community! 
                  You're now part of millions of BLINKs worldwide who share the love for JISOO, JENNIE, ROSÉ, and LISA!
                </div>
                
                <div class="perks-section">
                  <div class="perks-title">Here's what you'll get:</div>
                  <div class="perk-item"><span class="perk-icon">✨</span><div>Exclusive updates and announcements</div></div>
                  <div class="perk-item"><span class="perk-icon">🎵</span><div>Behind-the-scenes content</div></div>
                  <div class="perk-item"><span class="perk-icon">🎤</span><div>Early access to comeback news</div></div>
                  <div class="perk-item"><span class="perk-icon">💌</span><div>Special fan events and giveaways</div></div>
                  <div class="perk-item"><span class="perk-icon">🌟</span><div>Connect with fellow BLINKs on <strong>${socialPlatform}</strong></div></div>
                </div>
                
                <div class="button-container">
                  <a href="https://www.youtube.com/c/BLACKPINKOFFICIAL" class="button">
                    🎬 VISIT BLACKPINK'S YOUTUBE
                  </a>
                  <a href="https://forms.sonymusicfans.com/campaign/blackpink-deadline/" class="button">
                    📦 PRE-ORDER BLACKPINK's 3RD MINI ALBUM [DEADLINE]
                  </a>
                </div>
                
                <div class="divider"></div>
                
                <div class="closing-text">
                  Thank you for being part of our journey! Let's continue to support BLACKPINK together! 💪💖
                </div>
                
                <div class="social-links">
                  <a href="https://www.instagram.com/blackpinkofficial/">Instagram</a> |
                  <a href="https://x.com/BLACKPINK">Twitter</a> |
                  <a href="https://www.tiktok.com/@bp_tiktok">TikTok</a> |
                  <a href="https://www.youtube.com/c/BLACKPINKOFFICIAL">YouTube</a>
                </div>
              </div>
              
              <div class="footer">
                <div class="footer-text">Made with 💖 for BLINKs worldwide 🌎</div>
              </div>
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

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!transporter) {
    console.log('🔧 Initializing email...');
    await initEmail();
  }

  await initRedis();

  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  // GET /api/stats
  if (pathname === '/api/stats' && req.method === 'GET') {
    try {
      const signups = await loadSignups();
      const count = signups.length;
      return res.status(200).json({
        streams: 5300000,
        blinks: count,
        views: 40900000000,
      });
    } catch (error) {
      return res.status(200).json({
        streams: 5300000,
        blinks: 0,
        views: 40900000000,
      });
    }
  }

  // POST /api/signup with daily limit
  if (pathname === '/api/signup' && req.method === 'POST') {
    try {
      const { email, username, socialPlatform } = req.body || {};

      if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email address' });
      }
      if (!username || !username.trim()) {
        return res.status(400).json({ message: 'Username is required' });
      }
      if (!socialPlatform) {
        return res.status(400).json({ message: 'Please select a social platform' });
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
        timestamp: new Date().toISOString(),
      };

      signups.push(newSignup);
      await saveSignups(signups);

      await redisClient.incr(dailyKey);
      await redisClient.expire(dailyKey, 86400);

      sendWelcomeEmail(email, username, socialPlatform).catch(console.error);

      return res.status(200).json({ 
        message: 'Welcome to BLINKHOURCITY! Check your email! 💖',
        count: signups.length,
      });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // GET /api/signups → serves the styled HTML page
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
    .card {
      background: rgba(30, 30, 50, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(236, 72, 153, 0.3);
      transition: all 0.3s ease;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: #ec4899;
      box-shadow: 0 15px 30px rgba(236, 72, 153, 0.25);
    }
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

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="signups-list"></div>

    <div id="loading" class="text-center py-20 text-pink-400 text-2xl animate-pulse">
      Loading BLINK family members...
    </div>
    <div id="empty" class="hidden text-center py-20 text-gray-400 text-xl">
      No BLINKs have joined yet. Be the first! 💖
    </div>
  </div>

  <script>
    async function loadSignups() {
      try {
        const res = await fetch('/api/signups-json');
        const data = await res.json();

        document.getElementById('total-count').textContent = data.total.toLocaleString();

        const list = document.getElementById('signups-list');
        list.innerHTML = '';

        if (data.total === 0) {
          document.getElementById('empty').classList.remove('hidden');
          document.getElementById('loading').classList.add('hidden');
          return;
        }

        document.getElementById('empty').classList.add('hidden');
        document.getElementById('loading').classList.add('hidden');

        data.signups.forEach(s => {
          const card = document.createElement('div');
          card.className = 'card rounded-2xl p-6';
          card.innerHTML = \`
            <div class="flex items-center gap-4 mb-4">
              <div class="w-14 h-14 rounded-full bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                \${s.username[0].toUpperCase()}
              </div>
              <div>
                <h3 class="text-xl font-bold text-pink-300">\${s.username}</h3>
                <p class="text-sm text-gray-400">via \${s.socialPlatform}</p>
              </div>
            </div>
            <p class="text-sm text-gray-300 mb-2">
              <i class="fas fa-clock mr-2 text-purple-400"></i> \${s.timestamp}
            </p>
            <p class="text-sm text-gray-500 italic">\${s.email}</p>
          \`;
          list.appendChild(card);
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

// GET /api/signups-json → JSON data for the page
if (pathname === '/api/signups-json' && req.method === 'GET') {
  try {
    const signups = await loadSignups();
    const censoredSignups = signups.map(s => ({
      ...s,
      email: censorEmail(s.email)
    }));
    return res.status(200).json({
      total: signups.length,
      signups: censoredSignups
    });
  } catch (error) {
    return res.status(200).json({ total: 0, signups: [] });
  }
}

// POST /api/clear-signups
if (pathname === '/api/clear-signups' && req.method === 'POST') {
  try {
    await redisClient.del(SIGNUPS_KEY);
    console.log('🧹 Signups cleared');
    return res.status(200).json({ message: 'Signups cleared' });
  } catch (error) {
    console.error('Clear error:', error);
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