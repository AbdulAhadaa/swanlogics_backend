// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

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
    let transporter = nodemailer.createTransport({
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
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-top: 4px solid #667eea;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2c3e50; margin: 0; font-size: 28px; font-weight: 600;">📧 New Contact Message</h1>
              <p style="color: #7f8c8d; margin: 8px 0 0 0; font-size: 14px;">SwanLogics Contact Form</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 25px 0;">
              <h2 style="margin: 0 0 8px 0; font-size: 22px;">Message from ${name} 
            </div>
            
            <div style="background: #f8f9fa; border-left: 4px solid #27ae60; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h3 style="color: #27ae60; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">💬 Message Content</h3>
              <div style="background: white; padding: 20px; border-radius: 8px; line-height: 1.6; color: #2c3e50; font-size: 15px; border: 1px solid #e9ecef;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="background: #e8f4fd; border-left: 4px solid #3498db; padding: 20px; margin: 25px 0; border-radius: 8px;">
              <h3 style="color: #2980b9; margin: 0 0 15px 0; font-size: 18px;">📋 Contact Details</h3>
              <div style="display: grid; gap: 8px;">
                <p style="margin: 0; color: #2c3e50;"><strong>👤 Name:</strong> ${name}</p>
                <p style="margin: 0; color: #2c3e50;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a></p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ecf0f1;">
              <div style="background: #27ae60; color: white; padding: 12px 24px; border-radius: 25px; display: inline-block; margin-bottom: 15px;">
                <p style="margin: 0; font-size: 14px; font-weight: 500;">⏰ ${new Date().toLocaleString()}</p>
              </div>
              <p style="color: #7f8c8d; font-size: 12px; margin: 0;">This message was sent via SwanLogics contact form</p>
            </div>
          </div>
        </div>
      `
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

    let transporter = nodemailer.createTransport({
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
      from: `"Quotation Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📌 New Quotation Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">📋 New Quotation Request</h1>
              <p style="color: #7f8c8d; margin: 5px 0 0 0;">SwanLogics Portfolio</p>
            </div>
            
            <div style="background: #e8f4fd; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #2980b9; margin: 0 0 10px 0;">🚀 Project Details</h3>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>
              <p style="margin: 5px 0;"><strong>Title:</strong> ${projectTitle}</p>
              <p style="margin: 5px 0;"><strong>Description:</strong> ${projectDescription}</p>
            </div>
            
            <div style="background: #f0f8e8; border-left: 4px solid #27ae60; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #27ae60; margin: 0 0 10px 0;">💰 Budget & Timeline</h3>
              <p style="margin: 5px 0;"><strong>Budget:</strong> ${budgetRange}</p>
              <p style="margin: 5px 0;"><strong>Timeline:</strong> ${preferredTimeline}</p>
            </div>
            
            <div style="background: #fef9e7; border-left: 4px solid #f39c12; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #e67e22; margin: 0 0 10px 0;">👤 Contact Information</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Company:</strong> ${companyName || 'Not specified'}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3498db;">${email}</a></p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phoneNumber}</p>
            </div>
            
            <div style="background: #f4e6ff; border-left: 4px solid #9b59b6; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <h3 style="color: #8e44ad; margin: 0 0 10px 0;">⚙️ Preferences</h3>
              <p style="margin: 5px 0;">📄 <strong>NDA Required:</strong> ${ndaRequired ? '✅ Yes' : '❌ No'}</p>
              <p style="margin: 5px 0;">📞 <strong>Proposal Call:</strong> ${scheduleProposalCall ? '✅ Yes' : '❌ No'}</p>
              <p style="margin: 5px 0;">🔧 <strong>Ongoing Support:</strong> ${ongoingSupport ? '✅ Yes' : '❌ No'}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
              <p style="color: #7f8c8d; font-size: 12px; margin: 0;">Received on ${new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      `
    });

    // User confirmation email
    await transporter.sendMail({
      from: `"SwanLogics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✅ We received your quotation request!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #27ae60; margin: 0; font-size: 24px;">✅ Request Received!</h1>
              <p style="color: #7f8c8d; margin: 5px 0 0 0;">SwanLogics</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
              <h2 style="margin: 0 0 10px 0;">Hello ${name}! 👋</h2>
              <p style="margin: 0; opacity: 0.9;">Thank you for reaching out to us</p>
            </div>
            
            <div style="padding: 20px 0;">
              <p style="color: #2c3e50; line-height: 1.6; margin: 15px 0;">We've successfully received your project details for <strong>${service}</strong> and our team is already reviewing your requirements.</p>
              
              <div style="background: #e8f4fd; border-radius: 8px; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #2980b9;">📋 <strong>Project:</strong> ${projectTitle}</p>
                <p style="margin: 5px 0 0 0; color: #2980b9;">💰 <strong>Budget:</strong> ${budgetRange}</p>
              </div>
              
              <p style="color: #2c3e50; line-height: 1.6; margin: 15px 0;">Our team will get back to you within <strong>24-48 hours</strong> with a detailed proposal tailored to your needs.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: #27ae60; color: white; padding: 15px; border-radius: 8px; display: inline-block;">
                <p style="margin: 0; font-size: 14px;">⏰ Expected Response Time</p>
                <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">24-48 Hours</p>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ecf0f1;">
              <p style="color: #7f8c8d; margin: 0;">Best regards,</p>
              <p style="color: #2c3e50; font-weight: bold; margin: 5px 0 0 0;">SwanLogics Team 🚀</p>
            </div>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: "Quotation submitted and emails sent!" });

  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ error: "Failed to send emails" });
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