const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'https://blinkhourcity.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'signups.json');

// ===========================================
// EMAIL CONFIGURATION
// ===========================================
let transporter = null;
let emailEnabled = false;

// Dynamic import of nodemailer
async function setupEmail() {
  try {
    const nodemailer = require('nodemailer');

    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      console.log('⚠️ Nodemailer loaded but createTransport not found');
      emailEnabled = false;
      return;
    }

    const EMAIL_CONFIG = {
      service: 'gmail',
      auth: {
        user: 'blinkhourcity@gmail.com',
        pass: 'qdyvlwwryilfpoyh'
      }
    };

    transporter = nodemailer.createTransport(EMAIL_CONFIG);

    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.log('⚠️  Email configuration error:', error.message);
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
    emailEnabled = false;
  }
}

// ===========================================
// HELPER FUNCTIONS
// ===========================================

function censorEmail(email) {
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  const visibleChars = Math.min(2, localPart.length - 1);
  const censored = localPart.substring(0, visibleChars) + '***';
  return `${censored}@${domain}`;
}

// In-memory storage for Vercel (serverless)
let signupsMemory = { signups: [] };

async function initDataFile() {
  // No file needed - using memory
  console.log('Using in-memory storage');
}

async function getSignups() {
  return signupsMemory;
}

async function saveSignups(data) {
  signupsMemory = data;
}

// Check if daily limit reached
function getTodaySignupCount(signups) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return signups.filter(signup => {
    const signupDate = new Date(signup.timestamp);
    signupDate.setHours(0, 0, 0, 0);
    return signupDate.getTime() === today.getTime();
  }).length;
}

async function sendWelcomeEmail(email, username, socialPlatform) {
  if (!emailEnabled || !transporter) {
    console.log('⚠️  Email not sent - email service not configured');
    return false;
  }

  try {
    const mailOptions = {
      from: '"BLINKHOURCITY 💖" <blinkhourcity@gmail.com>',
      to: email,
      subject: '💖 Welcome to BLINKHOURCITY, ' + username + '! ✨',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: #000000;
              color: #ffffff;
              line-height: 1.6;
            }
            .email-wrapper {
              background: #000000;
              padding: 20px 10px;
            }
            .container {
              max-width: 620px;
              margin: 0 auto;
              background: #000000;
              border-radius: 28px;
              overflow: hidden;
              box-shadow: 0 40px 100px rgba(236, 72, 153, 0.25);
              border: 1px solid rgba(236, 72, 153, 0.15);
            }
            .header {
              background: linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%);
              padding: 70px 30px 60px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .header::after {
              content: '';
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 60%);
              pointer-events: none;
            }
            .header h1 {
              font-size: 38px;
              font-weight: 900;
              letter-spacing: 4px;
              text-transform: uppercase;
              background: linear-gradient(to right, #ffffff, #f3e8ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              text-shadow: 0 6px 30px rgba(0,0,0,0.6);
              margin: 0;
              line-height: 1.1;
            }
            .welcome-tag {
              font-size: 22px;
              font-weight: 700;
              color: #ec4899;
              margin: 20px 0 8px;
              letter-spacing: 1px;
            }
            .content {
              padding: 50px 40px;
            }
            .greeting {
              font-size: 32px;
              font-weight: 800;
              margin-bottom: 20px;
              color: #ffffff;
            }
            .intro-text {
              font-size: 17px;
              color: #e5e5e5;
              margin-bottom: 40px;
              line-height: 1.8;
            }
            .highlight {
              color: #ec4899;
              font-weight: 700;
            }
            .perks-box {
              background: rgba(236, 72, 153, 0.08);
              border: 1px solid rgba(236, 72, 153, 0.2);
              border-radius: 16px;
              padding: 28px;
              margin: 40px 0;
            }
            .perks-title {
              font-size: 20px;
              font-weight: 800;
              color: #ec4899;
              margin-bottom: 24px;
            }
            .perk {
              display: flex;
              align-items: center;
              margin-bottom: 16px;
              font-size: 16px;
              color: #f3f4f6;
            }
            .perk:last-child {
              margin-bottom: 0;
            }
            .perk-icon {
              font-size: 24px;
              margin-right: 16px;
              min-width: 30px;
              color: #ec4899;
            }
            .cta-container {
              text-align: center;
              margin: 50px 0 40px;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #ec4899, #db2777);
              color: white !important;
              text-decoration: none;
              padding: 18px 40px;
              border-radius: 50px;
              font-size: 15px;
              font-weight: 800;
              letter-spacing: 1.2px;
              text-transform: uppercase;
              margin: 12px 8px;
              box-shadow: 0 10px 30px rgba(236, 72, 153, 0.35);
              transition: all 0.3s ease;
            }
            .cta-button:hover {
              transform: translateY(-4px);
              box-shadow: 0 15px 40px rgba(236, 72, 153, 0.5);
              background: linear-gradient(135deg, #db2777, #be185d);
            }
            .closing {
              font-size: 17px;
              color: #d1d5db;
              margin: 40px 0 30px;
              text-align: center;
            }
            .social {
              text-align: center;
              margin-top: 30px;
            }
            .social a {
              color: #ec4899;
              text-decoration: none;
              font-weight: 600;
              margin: 0 12px;
              font-size: 15px;
              transition: color 0.3s;
            }
            .social a:hover {
              color: #f472b6;
            }
            .footer {
              background: #0a0a0a;
              padding: 35px 30px;
              text-align: center;
              font-size: 13px;
              color: #9ca3af;
              border-top: 1px solid rgba(236, 72, 153, 0.1);
            }
            @media (max-width: 600px) {
              .header h1 { font-size: 28px; }
              .greeting { font-size: 26px; }
              .content { padding: 40px 25px; }
              .cta-button { display: block; margin: 16px auto; }
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="container">
              <div class="header">
                <h1>BLINKHOURCITY</h1>
                <div class="welcome-tag">WELCOME, @${username} 💖</div>
              </div>

              <div class="content">
                <div class="greeting">Hey @${username}! 👑</div>

                <div class="intro-text">
                  You're officially part of the <span class="highlight">BLACKPINK</span> 
                  <span class="highlight">BLINKHOURCITY</span> fan family!<br><br>
                  Join millions of BLINKs worldwide who are crazy in love with 
                  JISOO, JENNIE, ROSÉ, and LISA 💞
                </div>

                <div class="perks-box">
                  <div class="perks-title">What you'll get as a BLINK:</div>
                  <div class="perk"><span class="perk-icon">✨</span>Exclusive updates & surprise drops</div>
                  <div class="perk"><span class="perk-icon">🎵</span>Behind-the-scenes & rare content</div>
                  <div class="perk"><span class="perk-icon">🎤</span>Early comeback & schedule news</div>
                  <div class="perk"><span class="perk-icon">💌</span>Special fan events & giveaways</div>
                  <div class="perk"><span class="perk-icon">🌟</span>Connect with BLINKs on <strong>${socialPlatform}</strong></div>
                </div>

                <div class="cta-container">
                  <a href="https://www.youtube.com/c/BLACKPINKOFFICIAL" class="cta-button">
                    🎬 BLACKPINK Official YouTube
                  </a>
                  <a href="https://forms.sonymusicfans.com/campaign/blackpink-deadline/" class="cta-button">
                    📦 Pre-order [DEADLINE]
                  </a>
                </div>

                <div class="closing">
                  Thank you for joining the journey.<br>
                  Let's keep streaming, voting, and loving BLACKPINK together! 💪💖
                </div>

                <div class="social">
                  <a href="https://www.instagram.com/blackpinkofficial/">Instagram</a> •
                  <a href="https://x.com/BLACKPINK">Twitter</a> •
                  <a href="https://www.tiktok.com/@bp_tiktok">TikTok</a> •
                  <a href="https://www.youtube.com/c/BLACKPINKOFFICIAL">YouTube</a>
                </div>
              </div>

              <div class="footer">
                Made with 💖 for every BLINK around the world 🌍
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
    console.error('❌ Failed to send email:', error.message);
    return false;
  }
}

// ===========================================
// API ROUTES
// ===========================================

app.get('/api/stats', async (req, res) => {
  try {
    const data = await getSignups();
    res.json({
      streams: 5300000,
      blinks: data.signups.length,
      views: 40900000000,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

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

    // Check daily limit (500 signups per day)
    const todayCount = getTodaySignupCount(data.signups);
    if (todayCount >= 500) {
      return res.status(429).json({ 
        message: '💖 We\'ve reached our daily limit of 500 BLINKs! Please come back tomorrow to join our family. See you soon! 🌸',
        limitReached: true
      });
    }

    // Check if email already exists
    const emailExists = data.signups.some(signup => signup.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return res.status(400).json({ message: 'This email is already part of the BLINK family! 💖' });
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

    // Send welcome email
    sendWelcomeEmail(email, username, socialPlatform).catch(console.error);

    console.log(`🎉 New signup: ${censorEmail(email)} (@${username} on ${socialPlatform}) [${todayCount + 1}/500 today]`);

    res.json({ 
      message: 'Welcome to BLINKHOURCITY! Check your email for exclusive content! 💖',
      count: data.signups.length,
      todayCount: todayCount + 1
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

app.get('/api/signups', async (req, res) => {
  try {
    const data = await getSignups();
    const censoredSignups = data.signups.map(signup => ({
      ...signup,
      email: censorEmail(signup.email)
    }));
    
    const todayCount = getTodaySignupCount(data.signups);
    
    res.json({
      total: data.signups.length,
      todayCount: todayCount,
      dailyLimit: 500,
      remainingToday: Math.max(0, 500 - todayCount),
      signups: censoredSignups
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch signups' });
  }
});

app.get('/admin', async (req, res) => {
  try {
    const data = await getSignups();
    const todayCount = getTodaySignupCount(data.signups);
    const remaining = Math.max(0, 500 - todayCount);
    
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>BLINKHOURCITY Signups</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#1a1a1a 0%,#2d1b2e 100%);color:#fff;padding:2rem}h1{text-align:center;font-size:3rem;background:linear-gradient(to right,#ec4899,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem}.stats{text-align:center;font-size:1.5rem;color:#ec4899;margin-bottom:2rem;padding:1rem;background:rgba(236,72,153,0.1);border-radius:1rem;border:2px solid rgba(236,72,153,0.3)}.daily-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem}.stat-box{padding:1.5rem;background:rgba(0,0,0,0.3);border-radius:1rem;border:2px solid rgba(236,72,153,0.3);text-align:center}.stat-box h3{color:#a855f7;font-size:1rem;margin-bottom:0.5rem}.stat-box .number{font-size:2.5rem;color:#ec4899;font-weight:900}.stat-box .label{color:#888;font-size:0.9rem}table{width:100%;border-collapse:collapse;background:rgba(0,0,0,0.3);border-radius:1rem;overflow:hidden}th{background:linear-gradient(to right,#ec4899,#a855f7);padding:1rem;text-align:left}td{padding:1rem;border-bottom:1px solid rgba(236,72,153,0.2)}.email{color:#ec4899;font-family:monospace}.username{color:#a855f7;font-weight:600}.platform{display:inline-block;padding:0.25rem 0.75rem;background:rgba(236,72,153,0.2);border-radius:1rem;font-size:0.85rem;color:#ec4899;border:1px solid rgba(236,72,153,0.4)}.email-status{text-align:center;padding:0.75rem;margin-bottom:1rem;border-radius:0.5rem}.email-enabled{background:rgba(34,197,94,0.1);color:#22c55e}.email-disabled{background:rgba(251,191,36,0.1);color:#fbbf24}</style></head><body><div class="container"><h1>💖 BLINKHOURCITY Signups</h1><div class="stats">Total BLINKs: <strong>${data.signups.length}</strong></div><div class="daily-stats"><div class="stat-box"><h3>Today's Signups</h3><div class="number">${todayCount}</div><div class="label">out of 500</div></div><div class="stat-box"><h3>Remaining Today</h3><div class="number">${remaining}</div><div class="label">spots left</div></div><div class="stat-box"><h3>Status</h3><div class="number">${remaining > 0 ? '✅' : '⛔'}</div><div class="label">${remaining > 0 ? 'Open' : 'Limit Reached'}</div></div></div><div class="email-status ${emailEnabled?'email-enabled':'email-disabled'}">📧 ${emailEnabled?'✅ Emails Active':'⚠️ Not Configured'}</div>${data.signups.length===0?'<p style="text-align:center;padding:3rem">No signups yet 🌟</p>':`<table><thead><tr><th>#</th><th>Email</th><th>Username</th><th>Platform</th><th>Joined</th></tr></thead><tbody>${data.signups.map((s,i)=>`<tr><td>${i+1}</td><td class="email">${censorEmail(s.email)}</td><td class="username">@${s.username}</td><td><span class="platform">${s.socialPlatform}</span></td><td>${new Date(s.timestamp).toLocaleString()}</td></tr>`).join('')}</tbody></table>`}</div></body></html>`;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error loading admin page');
  }
});

// Start server
async function startServer() {
  await initDataFile();
  await setupEmail();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
    console.log(`📧 Email status: ${emailEnabled ? 'Configured ✅' : 'Not configured ⚠️'}`);
  });
}

// Export for Vercel serverless
module.exports = app;

// For local development only
if (!process.env.VERCEL) {
  startServer().catch(console.error);
}