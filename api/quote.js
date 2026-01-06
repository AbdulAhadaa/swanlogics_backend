const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const emailTemplates = require("../templates/emailTemplates");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.post("/quote", async (req, res) => {
  console.log("Quote request received:", req.body);
  
  const {
    service, projectTitle, projectDescription, budgetRange, preferredTimeline,
    name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
  } = req.body;

  try {
    // Validate required fields
    if (!email || !name) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    console.log("Creating transporter...");
    let transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log("Sending admin email...");
    await transporter.sendMail({
      from: `"SwanLogics Quotations" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Quotation Request from ${name}`,
      html: emailTemplates.quoteAdmin({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });
    console.log("Admin email sent");

    console.log("Sending client email...");
    await transporter.sendMail({
      from: `"SwanLogics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We've Received Your Quotation Request",
      html: emailTemplates.quoteClient({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });
    console.log("Client email sent");

    res.json({ success: true, message: "Quote submitted successfully!" });

  } catch (error) {
    console.error("❌ Quote error:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({ 
      error: "Failed to submit quote",
      message: error.message 
    });
  }
});

module.exports = (req, res) => {
  return app(req, res);
};
