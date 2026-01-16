require('dotenv').config();
const nodemailer = require('nodemailer');

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

let transporter = null;
let emailEnabled = false;

// Initialize email transporter
async function initEmail() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('⚠️ Email credentials missing');
    console.log('EMAIL_USER:', EMAIL_USER ? 'SET' : 'NOT SET');
    console.log('EMAIL_PASS:', EMAIL_PASS ? 'SET' : 'NOT SET');
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

    // Verify connection
    await transporter.verify();
    emailEnabled = true;
    console.log('✅ Email configured successfully');
  } catch (error) {
    console.error('❌ Email configuration failed:', error.message);
    emailEnabled = false;
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

// In-memory storage for signups (Vercel serverless)
let signupsMemory = { signups: [] };

// Vercel serverless handler
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Initialize email on first request
  if (!transporter) {
    console.log('🔧 Initializing email on first request...');
    await initEmail();
  }

  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  // GET /api/stats
  if (pathname === '/api/stats' && req.method === 'GET') {
    return res.status(200).json({
      streams: 5300000,
      blinks: signupsMemory.signups.length,
      views: 40900000000,
    });
  }

  // POST /api/signup
  if (pathname === '/api/signup' && req.method === 'POST') {
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

      // Check if email already exists
      const emailExists = signupsMemory.signups.some(
        signup => signup.email.toLowerCase() === email.toLowerCase()
      );
      if (emailExists) {
        return res.status(400).json({ 
          message: 'This email is already part of the BLINK family! 💖' 
        });
      }

      // Add new signup
      const newSignup = {
        email,
        username: username.trim(),
        socialPlatform,
        timestamp: new Date().toISOString(),
      };

      signupsMemory.signups.push(newSignup);

      // Send welcome email
      console.log(`🎉 New signup: ${censorEmail(email)} (@${username} on ${socialPlatform})`);
      console.log(`📧 Attempting to send email to ${censorEmail(email)}...`);
      
      try {
        const emailSent = await sendWelcomeEmail(email, username, socialPlatform);
        if (emailSent) {
          console.log(`✅ Email successfully sent to ${censorEmail(email)}`);
        } else {
          console.log(`⚠️ Email failed to send to ${censorEmail(email)}`);
        }
      } catch (emailError) {
        console.error('❌ Email error:', emailError);
      }

      return res.status(200).json({ 
        message: 'Welcome to BLINKHOURCITY! Check your email for exclusive content! 💖',
        count: signupsMemory.signups.length,
      });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: 'Server error. Please try again.' });
    }
  }

  // GET /api/signups
  if (pathname === '/api/signups' && req.method === 'GET') {
    const censoredSignups = signupsMemory.signups.map(signup => ({
      ...signup,
      email: censorEmail(signup.email)
    }));
    
    return res.status(200).json({
      total: signupsMemory.signups.length,
      signups: censoredSignups
    });
  }

  return res.status(404).json({ error: 'Not found' });
};