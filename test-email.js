const nodemailer = require("nodemailer");
require("dotenv").config();

async function testEmail() {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email",
      text: "This is a test email"
    });

    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Email failed:", error.message);
  }
}

testEmail();