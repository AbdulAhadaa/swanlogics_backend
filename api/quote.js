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
  console.log("=== Quote Request Started ===");
  console.log("Request body:", JSON.stringify(req.body));
  
  const {
    service, projectTitle, projectDescription, budgetRange, preferredTimeline,
    name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
  } = req.body;

  try {
    // Check environment variables
    console.log("Checking env vars...");
    console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
    console.log("ADMIN_EMAIL exists:", !!process.env.ADMIN_EMAIL);
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
      console.error("Missing environment variables!");
      return res.status(500).json({ error: "Server configuration error" });
    }

    console.log("Creating nodemailer transporter...");
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
    console.log("Transporter created successfully");

    // Send email to admin
    console.log("Preparing admin email...");
    const adminEmailHtml = emailTemplates.quoteAdmin({
      service, projectTitle, projectDescription, budgetRange, preferredTimeline,
      name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
    });
    console.log("Admin email HTML generated");
    
    console.log("Sending admin email to:", process.env.ADMIN_EMAIL);
    await transporter.sendMail({
      from: `"SwanLogics Quotations" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Quotation Request from ${name}`,
      html: adminEmailHtml
    });
    console.log("Admin email sent successfully");

    // Send confirmation email to client
    console.log("Preparing client email...");
    const clientEmailHtml = emailTemplates.quoteClient({
      service, projectTitle, projectDescription, budgetRange, preferredTimeline,
      name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
    });
    console.log("Client email HTML generated");
    
    console.log("Sending client email to:", email);
    await transporter.sendMail({
      from: `"SwanLogics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We've Received Your Quotation Request",
      html: clientEmailHtml
    });
    console.log("Client email sent successfully");

    console.log("=== Quote Request Completed Successfully ===");
    res.json({ success: true, message: "Quote submitted successfully!" });

  } catch (error) {
    console.error("=== Quote Request Failed ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
      error: "Failed to send emails",
      details: error.message 
    });
  }
});

module.exports = (req, res) => {
  return app(req, res);
};
