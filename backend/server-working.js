const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'signups.json');

// ===========================================
// EMAIL CONFIGURATION
// ===========================================
let transporter = null;
let emailEnabled = false;

// Dynamic import of nodemailer with multiple fallback methods
async function setupEmail() {
  try {
    // Method 1: Standard require
    let nodemailer;
    try {
      nodemailer = require('nodemailer');
    } catch (e1) {
      // Method 2: Direct path require
      try {
        nodemailer = require('./node_modules/nodemailer');
      } catch (e2) {
        // Method 3: Import from parent
        try {
          nodemailer = require('../node_modules/nodemailer');
        } catch (e3) {
          throw new Error('Cannot find nodemailer module');
        }
      }
    }

    // Check if createTransporter exists
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      console.log('⚠️ Nodemailer loaded but createTransport not found');
      console.log('Available methods:', Object.keys(nodemailer || {}).join(', '));
      emailEnabled = false;
      return;
    }

    // GMAIL CONFIGURATION - UPDATE THESE!
    const EMAIL_CONFIG = {
      service: 'gmail',
      auth: {
        user: 'blinkhourcity@gmail.com',
        pass: 'qdyvlwwryilfpoyh'
      }
    };

    // Create email transporter (note: it's createTransport, not createTransporter!)
    transporter = nodemailer.createTransport(EMAIL_CONFIG);

    // Verify email configuration
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.log('⚠️  Email configuration error:', error.message);
          console.log('💡 Check your Gmail credentials in server.js');
          emailEnabled = false;
          reject(error);
        } else {
          console.log('✅ Email server ready!');
          emailEnabled = true;
          resolve(success);
        }
      });
    }).catch(() => {
      emailEnabled = false;
    });

  } catch (error) {
    console.log('⚠️  Email features disabled:', error.message);
    console.log('💡 To enable emails: npm install nodemailer');
    emailEnabled = false;
  }
}

// ===========================================
// HELPER FUNCTIONS
// ===========================================

// Censor email for security (e.g., j***@gmail.com)
function censorEmail(email) {
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const visibleChars = Math.min(2, localPart.length - 1);
  const censored = localPart.substring(0, visibleChars) + '***';
  return `${censored}@${domain}`;
}

// Initialize data file if it doesn't exist
async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ signups: [] }, null, 2));
  }
}

// Read signups
async function getSignups() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { signups: [] };
  }
}

// Write signups
async function saveSignups(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Send welcome email to new subscriber
async function sendWelcomeEmail(email, username, socialPlatform) {
  if (!emailEnabled || !transporter) {
    console.log('⚠️  Email not sent - email service not configured');
    return false;
  }

  try {
    const mailOptions = {
      from: '"BLACKPINK 💖" <blinkhourcity@gmail.com>',
      to: email,
      subject: '💖 Welcome to the BLINK Family!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background: linear-gradient(135deg, #1a1a1a 0%, #2d1b2e 100%);
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #000;
              border: 3px solid #ec4899;
              border-radius: 20px;
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #ec4899, #a855f7);
              padding: 40px 20px;
              text-align: center;
            }
            .header h1 {
              color: white;
              font-size: 32px;
              margin: 0;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .content {
              padding: 40px 30px;
              color: #fff;
            }
            .content h2 {
              color: #ec4899;
              font-size: 24px;
            }
            .content p {
              line-height: 1.6;
              color: #ddd;
              font-size: 16px;
            }
            .highlight {
              background: linear-gradient(to right, #ec4899, #a855f7);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-weight: bold;
            }
            .button {
              display: inline-block;
              margin: 20px 0;
              padding: 15px 40px;
              background: linear-gradient(135deg, #ec4899, #a855f7);
              color: white;
              text-decoration: none;
              border-radius: 30px;
              font-weight: bold;
              font-size: 16px;
            }
            .footer {
              background: #111;
              padding: 20px;
              text-align: center;
              color: #888;
              font-size: 14px;
            }
            .social-icons {
              margin: 20px 0;
            }
            .social-icons a {
              color: #ec4899;
              text-decoration: none;
              margin: 0 10px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💖 WELCOME TO THE BLINK FAMILY! 💖</h1>
            </div>
            <div class="content">
              <h2>Hey ${username}! 👋</h2>
              <p>
                We're so excited to have you join the <span class="highlight">BLACKPINK</span> community! 
                You're now part of millions of BLINKs worldwide who share the love for JISOO, JENNIE, ROSÉ, and LISA!
              </p>
              <p>
                <strong>Here's what you'll get:</strong>
              </p>
              <p>
                ✨ Exclusive updates and announcements<br>
                🎵 Behind-the-scenes content<br>
                🎤 Early access to comeback news<br>
                💌 Special fan events and giveaways<br>
                🌟 Connect with fellow BLINKs on <strong>${socialPlatform}</strong>
              </p>
              <center>
                <a href="https://www.youtube.com/c/BLACKPINKOFFICIAL" class="button">
                  🎬 VISIT BLACKPINK'S YOUTUBE
                </a>
              </center>
              <p style="margin-top: 30px;">
                Thank you for being part of our journey! Let's continue to support BLACKPINK together! 💪💖
              </p>
              <div class="social-icons">
                <a href="https://www.instagram.com/blackpinkofficial/">Instagram</a> |
                <a href="https://x.com/BLACKPINK">Twitter</a> |
                <a href="https://www.tiktok.com/@bp_tiktok">TikTok</a> |
                <a href="https://www.youtube.com/c/BLACKPINKOFFICIAL">YouTube</a>
              </div>
            </div>
            <div class="footer">
              <p>Made with 💖 for BLINKs worldwide 🌎</p>
              <p style="font-size: 12px; color: #666;">
                You received this email because you signed up at the BLACKPINK fan website.
              </p>
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
    console.error('❌ Failed to send email:', error.message);
    return false;
  }
}

// ===========================================
// API ROUTES
// ===========================================

// Get stats (including signup count)
app.get('/api/stats', async (req, res) => {
  try {
    const data = await getSignups();
    res.json({
      streams: 5300000,
      blinks: data.signups.length,
      views: 40900000000,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Newsletter signup
app.post('/api/signup', async (req, res) => {
  try {
    const { email, username, socialPlatform } = req.body;

    // Validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    if (!username || !username.trim()) {
      return res.status(400).json({ message: 'Username is required' });
    }

    if (!socialPlatform) {
      return res.status(400).json({ message: 'Please select a social platform' });
    }

    const data = await getSignups();

    // Check if email already exists
    const emailExists = data.signups.some(signup => signup.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return res.status(400).json({ message: 'Email already registered!' });
    }

    // Add new signup
    const newSignup = {
      email,
      username: username.trim(),
      socialPlatform,
      timestamp: new Date().toISOString(),
    };

    data.signups.push(newSignup);
    await saveSignups(data);

    // Send welcome email (don't wait for it, send async)
    sendWelcomeEmail(email, username, socialPlatform).catch(err => {
      console.error('Email send failed but signup successful:', err);
    });

    console.log(`🎉 New signup: ${censorEmail(email)} (@${username} on ${socialPlatform})`);

    res.json({ 
      message: 'Successfully joined the BLINK family!',
      count: data.signups.length 
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// Get all signups (Admin view - API)
app.get('/api/signups', async (req, res) => {
  try {
    const data = await getSignups();
    
    // Return censored emails for security
    const censoredSignups = data.signups.map(signup => ({
      ...signup,
      email: censorEmail(signup.email)
    }));
    
    res.json({
      total: data.signups.length,
      signups: censoredSignups
    });
  } catch (error) {
    console.error('Error fetching signups:', error);
    res.status(500).json({ error: 'Failed to fetch signups' });
  }
});

// Admin panel HTML (with censored emails)
app.get('/admin', async (req, res) => {
  try {
    const data = await getSignups();
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BLACKPINK Newsletter Signups</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d1b2e 100%);
      color: #fff;
      padding: 2rem;
      min-height: 100vh;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      font-size: 3rem;
      background: linear-gradient(to right, #ec4899, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    .stats {
      text-align: center;
      font-size: 1.5rem;
      color: #ec4899;
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(236, 72, 153, 0.1);
      border-radius: 1rem;
      border: 2px solid rgba(236, 72, 153, 0.3);
    }
    .security-notice {
      text-align: center;
      color: #a855f7;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      padding: 0.75rem;
      background: rgba(168, 85, 247, 0.1);
      border-radius: 0.5rem;
      border: 1px solid rgba(168, 85, 247, 0.3);
    }
    .refresh-btn {
      display: block;
      margin: 0 auto 2rem;
      padding: 1rem 2rem;
      background: linear-gradient(to right, #ec4899, #a855f7);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .refresh-btn:hover {
      transform: scale(1.05);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(236, 72, 153, 0.2);
    }
    th {
      background: linear-gradient(to right, #ec4899, #a855f7);
      padding: 1rem;
      text-align: left;
      font-weight: bold;
    }
    td {
      padding: 1rem;
      border-bottom: 1px solid rgba(236, 72, 153, 0.2);
    }
    tr:hover {
      background: rgba(236, 72, 153, 0.1);
    }
    .no-data {
      text-align: center;
      padding: 3rem;
      font-size: 1.2rem;
      color: #888;
    }
    .email {
      color: #ec4899;
      font-weight: 500;
      font-family: monospace;
    }
    .username {
      color: #a855f7;
      font-weight: 600;
    }
    .platform {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: rgba(236, 72, 153, 0.2);
      border-radius: 1rem;
      font-size: 0.85rem;
      color: #ec4899;
      border: 1px solid rgba(236, 72, 153, 0.4);
    }
    .timestamp {
      color: #888;
      font-size: 0.85rem;
    }
    .email-status {
      text-align: center;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
    }
    .email-enabled {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #22c55e;
    }
    .email-disabled {
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.3);
      color: #fbbf24;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>💖 BLACKPINK Newsletter Signups</h1>
    <div class="stats">
      Total BLINKs: <strong>${data.signups.length}</strong>
    </div>
    <div class="email-status ${emailEnabled ? 'email-enabled' : 'email-disabled'}">
      📧 Email Service: ${emailEnabled ? '✅ Active - Welcome emails being sent!' : '⚠️ Not configured - Signups work but no emails sent'}
    </div>
    <div class="security-notice">
      🔒 Email addresses are censored for privacy protection
    </div>
    <button class="refresh-btn" onclick="location.reload()">🔄 Refresh</button>
    
    ${data.signups.length === 0 ? `
      <div class="no-data">
        No signups yet. Be the first to join the BLINK family! 🌟
      </div>
    ` : `
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Email (Censored)</th>
            <th>Username</th>
            <th>Platform</th>
            <th>Joined At</th>
          </tr>
        </thead>
        <tbody>
          ${data.signups.map((signup, index) => `
            <tr>
              <td>${index + 1}</td>
              <td class="email">${censorEmail(signup.email)}</td>
              <td class="username">@${signup.username}</td>
              <td><span class="platform">${signup.socialPlatform}</span></td>
              <td class="timestamp">${new Date(signup.timestamp).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `}
  </div>
</body>
</html>
    `;
    res.send(html);
  } catch (error) {
    console.error('Error rendering admin page:', error);
    res.status(500).send('Error loading admin page');
  }
});

// Start server
async function startServer() {
  await initDataFile();
  await setupEmail(); // Setup email asynchronously
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
    if (emailEnabled) {
      console.log(`📧 Email status: Configured ✅`);
    } else {
      console.log(`📧 Email status: Not configured (signups still work!) ⚠️`);
      console.log(`💡 To enable emails: Check Gmail credentials in server.js`);
    }
  });
}

startServer().catch(console.error);