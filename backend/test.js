console.log('Testing nodemailer...');
try {
  const nodemailer = require('nodemailer');
  console.log('✅ Nodemailer loaded successfully!');
  console.log('Type:', typeof nodemailer);
  console.log('Has createTransporter?', typeof nodemailer.createTransporter);
} catch (error) {
  console.log('❌ Error:', error.message);
  console.log('Full error:', error);
}