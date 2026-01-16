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

// Redis key
const SIGNUPS_KEY = 'blinkhourcity:signups';

// Initialize Redis
async function initRedis() {
  if (redisClient) return;

  if (!process.env.REDIS_URL) {
    console.error('❌ REDIS_URL missing');
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
        <h1>Hey ${username}!</h1>
        <p>Welcome to the BLINK family! 💖</p>
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

  // GET /api/stats ── used by homepage
  if (pathname === '/api/stats' && req.method === 'GET') {
    const signups = await loadSignups();
    return res.status(200).json({
      streams: 5300000,
      blinks: signups.length,
      views: 40900000000
    });
  }

  // POST /api/signup ── called from footer form
  if (pathname === '/api/signup' && req.method === 'POST') {
    try {
      const body = req.body || {};
      const { email, username, socialPlatform } = body;

      if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email' });
      }
      if (!username?.trim()) {
        return res.status(400).json({ message: 'Username required' });
      }
      if (!socialPlatform) {
        return res.status(400).json({ message: 'Select a platform' });
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

  // GET /api/signups ── show all signups (censored emails)
  if (pathname === '/api/signups' && req.method === 'GET') {
    const signups = await loadSignups();
    const censored = signups.map(s => ({
      ...s,
      email: censorEmail(s.email)
    }));
    return res.status(200).json({
      total: signups.length,
      signups: censored
    });
  }

  // Optional: clear everything (POST /api/clear-signups)
  if (pathname === '/api/clear-signups' && req.method === 'POST') {
    await redisClient.del(SIGNUPS_KEY);
    console.log('🧹 Signups cleared');
    return res.status(200).json({ message: 'Signups cleared' });
  }

  return res.status(404).json({ error: 'Not found' });
};

// Local development server
if (require.main === module) {
  const http = require('http');
  const PORT = process.env.PORT || 3000;
  http.createServer((req, res) => module.exports(req, res))
    .listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log('Test: http://localhost:3000/api/stats');
    });
}