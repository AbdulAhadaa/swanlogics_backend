// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");
const emailTemplates = require("./templates/emailTemplates");

dotenv.config();

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

const app = express();
app.use(cors());
app.use(express.json());

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
       console.error("❌ SERVER ERROR:", error.message); // <-- See this in terminal
       console.error("Full error:", error); // <-- Full error details
       res.status(500).json({ error: error.message });
     }
   });

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit contact form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               message:
 *                 type: string
 *                 example: I would like to discuss a project with you.
 *     responses:
 *       200:
 *         description: Contact message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Message sent successfully!
 */
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: process.env.ADMIN_EMAIL,
      from: { email: process.env.ADMIN_EMAIL, name: 'SwanLogics Contact' },
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      html: emailTemplates.contactAdmin(name, email, message)
    });

    res.json({ success: true, message: "Message sent successfully!" });

  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

/**
 * @swagger
 * /quote:
 *   post:
 *     summary: Submit project quotation form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 example: UI/UX Design
 *               projectTitle:
 *                 type: string
 *                 example: New company website
 *               projectDescription:
 *                 type: string
 *                 example: We need an e-commerce website with payment integration.
 *               budgetRange:
 *                 type: string
 *                 example: $5k - $10k
 *               preferredTimeline:
 *                 type: string
 *                 example: Within 1 Month
 *               name:
 *                 type: string
 *                 example: John Doe
 *               companyName:
 *                 type: string
 *                 example: Tech Solutions
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: +123456789
 *               ndaRequired:
 *                 type: boolean
 *                 example: true
 *               scheduleProposalCall:
 *                 type: boolean
 *                 example: false
 *               ongoingSupport:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Quotation request sent successfully
 */
app.post("/quote", async (req, res) => {
  const {
    service, projectTitle, projectDescription, budgetRange, preferredTimeline,
    name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
  } = req.body;

  try {
    // Connect to MongoDB and save
    await connectDB();
    try {
      const quotation = new Quotation({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      });
      await quotation.save();
      console.log('✅ Quotation saved to database');
    } catch (dbError) {
      console.log('⚠️ Database save failed, continuing with email:', dbError.message);
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Admin email
    await sgMail.send({
      to: process.env.ADMIN_EMAIL,
      from: { email: process.env.ADMIN_EMAIL, name: 'SwanLogics Quotations' },
      replyTo: email,
      subject: `New Quotation Request from ${name}`,
      html: emailTemplates.quoteAdmin({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });

    // User confirmation email
    await sgMail.send({
      to: email,
      from: { email: process.env.ADMIN_EMAIL, name: 'SwanLogics' },
      subject: "We've Received Your Quotation Request",
      html: emailTemplates.quoteClient({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });

    res.json({ success: true, message: "Quotation submitted and emails sent!" });

  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ error: "Failed to send emails", details: error.message });
  }
});

// 🔹 Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swanlogics Portfolio  API",
      version: "1.0.0",
      description: "API for chatting with portfolio AI assistant",
    },
  },
  apis: ["./server.js"], // where API docs live
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.html", (req, res) => res.redirect("/api-docs"));

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Chat with the AI assistant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: What services do you offer?
 *     responses:
 *       200:
 *         description: AI reply
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reply:
 *                   type: string
 *                   example: 🚀 We offer UI/UX Design, Website Development, Mobile App Development...
 */

app.listen(5000, () =>
  console.log("✅ Gemini chatbot running at http://localhost:5000\n📖 Swagger Docs at http://localhost:5000/api-docs")
);