const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const emailTemplates = require("../templates/emailTemplates");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Submit a contact form message
 *     description: Send a contact message to SwanLogics team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sender's full name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Sender's email address
 *                 example: john@example.com
 *               message:
 *                 type: string
 *                 description: Contact message content
 *                 example: I'm interested in your web development services
 *     responses:
 *       200:
 *         description: Message sent successfully
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
 *       500:
 *         description: Internal server error
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
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

    // Send email to admin
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

module.exports = (req, res) => {
  return app(req, res);
};