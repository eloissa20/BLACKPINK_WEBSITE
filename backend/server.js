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

// Dynamic import of nodemailer
async function setupEmail() {
  try {
    const nodemailer = require('nodemailer');

    // Check if createTransport exists (correct method name!)
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      console.log('⚠️ Nodemailer loaded but createTransport not found');
      emailEnabled = false;
      return;
    }

    // GMAIL CONFIGURATION - YOUR CREDENTIALS
    const EMAIL_CONFIG = {
      service: 'gmail',
      auth: {
        user: 'blinkhourcity@gmail.com',
        pass: 'qdyvlwwryilfpoyh'
      }
    };

    // Create email transporter (note: createTransport, not createTransporter!)
    transporter = nodemailer.createTransport(EMAIL_CONFIG);

    // Verify email configuration
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

async function initDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ signups: [] }, null, 2));
  }
}

async function getSignups() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { signups: [] };
  }
}

async function saveSignups(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

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
            body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #1a1a1a 0%, #2d1b2e 100%); margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #000; border: 3px solid #ec4899; border-radius: 20px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #ec4899, #a855f7); padding: 40px 20px; text-align: center; }
            .header h1 { color: white; font-size: 32px; margin: 0; }
            .content { padding: 40px 30px; color: #fff; }
            .content h2 { color: #ec4899; }
            .button { display: inline-block; margin: 20px 0; padding: 15px 40px; background: linear-gradient(135deg, #ec4899, #a855f7); color: white; text-decoration: none; border-radius: 30px; font-weight: bold; }
            .footer { background: #111; padding: 20px; text-align: center; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h1>💖 WELCOME TO THE BLINK FAMILY! 💖</h1></div>
            <div class="content">
              <h2>Hey ${username}! 👋</h2>
              <p>We're so excited to have you join the BLACKPINK community!</p>
              <p><strong>You'll get:</strong><br>✨ Exclusive updates<br>🎵 Behind-the-scenes content<br>🎤 Early access to news<br>🌟 Connect on ${socialPlatform}</p>
              <center><a href="https://www.youtube.com/c/BLACKPINKOFFICIAL" class="button">🎬 VISIT YOUTUBE</a></center>
            </div>
            <div class="footer"><p>Made with 💖 for BLINKs worldwide 🌎</p></div>
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
    const emailExists = data.signups.some(signup => signup.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      return res.status(400).json({ message: 'Email already registered!' });
    }

    const newSignup = {
      email,
      username: username.trim(),
      socialPlatform,
      timestamp: new Date().toISOString(),
    };

    data.signups.push(newSignup);
    await saveSignups(data);

    sendWelcomeEmail(email, username, socialPlatform).catch(console.error);

    console.log(`🎉 New signup: ${censorEmail(email)} (@${username} on ${socialPlatform})`);

    res.json({ 
      message: 'Successfully joined the BLINK family!',
      count: data.signups.length 
    });
  } catch (error) {
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
    res.json({
      total: data.signups.length,
      signups: censoredSignups
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch signups' });
  }
});

app.get('/admin', async (req, res) => {
  try {
    const data = await getSignups();
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>BLACKPINK Signups</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#1a1a1a 0%,#2d1b2e 100%);color:#fff;padding:2rem}h1{text-align:center;font-size:3rem;background:linear-gradient(to right,#ec4899,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:1rem}.stats{text-align:center;font-size:1.5rem;color:#ec4899;margin-bottom:2rem;padding:1rem;background:rgba(236,72,153,0.1);border-radius:1rem;border:2px solid rgba(236,72,153,0.3)}table{width:100%;border-collapse:collapse;background:rgba(0,0,0,0.3);border-radius:1rem;overflow:hidden}th{background:linear-gradient(to right,#ec4899,#a855f7);padding:1rem;text-align:left}td{padding:1rem;border-bottom:1px solid rgba(236,72,153,0.2)}.email{color:#ec4899;font-family:monospace}.username{color:#a855f7;font-weight:600}.platform{display:inline-block;padding:0.25rem 0.75rem;background:rgba(236,72,153,0.2);border-radius:1rem;font-size:0.85rem;color:#ec4899;border:1px solid rgba(236,72,153,0.4)}.email-status{text-align:center;padding:0.75rem;margin-bottom:1rem;border-radius:0.5rem}.email-enabled{background:rgba(34,197,94,0.1);color:#22c55e}.email-disabled{background:rgba(251,191,36,0.1);color:#fbbf24}</style></head><body><div class="container"><h1>💖 BLACKPINK Newsletter Signups</h1><div class="stats">Total BLINKs: <strong>${data.signups.length}</strong></div><div class="email-status ${emailEnabled?'email-enabled':'email-disabled'}">📧 ${emailEnabled?'✅ Active - Emails being sent!':'⚠️ Not configured'}</div>${data.signups.length===0?'<p style="text-align:center;padding:3rem">No signups yet 🌟</p>':`<table><thead><tr><th>#</th><th>Email</th><th>Username</th><th>Platform</th><th>Joined</th></tr></thead><tbody>${data.signups.map((s,i)=>`<tr><td>${i+1}</td><td class="email">${censorEmail(s.email)}</td><td class="username">@${s.username}</td><td><span class="platform">${s.socialPlatform}</span></td><td>${new Date(s.timestamp).toLocaleString()}</td></tr>`).join('')}</tbody></table>`}</div></body></html>`;
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

startServer().catch(console.error);