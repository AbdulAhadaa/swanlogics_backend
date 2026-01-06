const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const emailTemplates = require("../templates/emailTemplates");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection for Vercel
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.log('❌ MongoDB connection failed:', err.message);
    throw err;
  }
};

// Quotation Schema
const quotationSchema = new mongoose.Schema({
  service: String,
  projectTitle: String,
  projectDescription: String,
  budgetRange: String,
  preferredTimeline: String,
  name: String,
  companyName: String,
  email: String,
  phoneNumber: String,
  ndaRequired: Boolean,
  scheduleProposalCall: Boolean,
  ongoingSupport: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

// 🔑 Gemini API Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔹 Step 1: Define FAQs
const faq = {
  pricing: "💰 Our projects usually start from $5k. Exact cost depends on your requirements.",
  timeline: "⏳ We can deliver projects as fast as ASAP rush, or within 1, 3, or 6 months depending on scope.",
  contact: "📞 You can reach us through the quotation form or schedule a proposal call.",
  services: "🚀 We offer UI/UX Design, Website Development, Mobile App Development, E-Commerce, No-Code, and JavaScript projects.",
};

function checkFAQ(userMessage) {
  const lower = userMessage.toLowerCase();
  for (const key in faq) {
    if (lower.includes(key)) return faq[key];
  }
  return null;
}

// 🔹 API Route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const faqAnswer = checkFAQ(message);
    if (faqAnswer) return res.json({ reply: faqAnswer });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);

    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("❌ SERVER ERROR:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
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

    await transporter.sendMail({
      from: `"SwanLogics Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: emailTemplates.contactAdmin(name, email, message)
    });

    res.json({ success: true, message: "Message sent successfully!" });

  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.post("/quote", async (req, res) => {
  console.log('Quote request received:', req.body);
  
  const {
    service, projectTitle, projectDescription, budgetRange, preferredTimeline,
    name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
  } = req.body;

  try {
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

    // Admin email
    await transporter.sendMail({
      from: `"SwanLogics Quotations" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Quotation Request from ${name}`,
      html: emailTemplates.quoteAdmin({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });

    // User confirmation email
    await transporter.sendMail({
      from: `"SwanLogics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We've Received Your Quotation Request",
      html: emailTemplates.quoteClient({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });

    res.json({ success: true, message: "Quotation submitted and emails sent!" });

  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
});
    await transporter.sendMail({
      from: `"SwanLogics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We've Received Your Quotation Request",
      html: emailTemplates.quoteClient({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });

    res.json({ success: true, message: "Quotation submitted and emails sent!" });

  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
});

// For Vercel serverless
module.exports = (req, res) => {
  return app(req, res);
};