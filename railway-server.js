const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Gemini AI Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// FAQ System
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

// Chat API
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const faqAnswer = checkFAQ(message);
    if (faqAnswer) return res.json({ reply: faqAnswer });

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Contact API
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // For now, just log the contact request and return success
    console.log('Contact request:', { name, email, message });
    
    // You can add email service later (SendGrid, etc.)
    // For now, this will work without email
    
    res.json({ success: true, message: "Message received successfully!" });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ error: "Failed to process message" });
  }
});

// Quote API
app.post("/quote", async (req, res) => {
  const {
    service, projectTitle, projectDescription, budgetRange, preferredTimeline,
    name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
  } = req.body;

  try {
    // For now, just log the quote request and return success
    console.log('Quote request:', {
      service, projectTitle, name, email, budgetRange
    });
    
    // You can add email service later (SendGrid, etc.)
    // For now, this will work without email
    
    res.json({ success: true, message: "Quote submitted successfully!" });
  } catch (error) {
    console.error("Quote error:", error);
    res.status(500).json({ error: "Failed to submit quote" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});