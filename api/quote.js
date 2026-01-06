import * as nodemailer from "nodemailer";
import emailTemplates from "../templates/emailTemplates.js";

/**
 * @swagger
 * /quote:
 *   post:
 *     summary: Submit a quotation request
 *     description: Submit a project quotation request with all necessary details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service
 *               - projectTitle
 *               - projectDescription
 *               - budgetRange
 *               - preferredTimeline
 *               - name
 *               - email
 *               - phoneNumber
 *             properties:
 *               service:
 *                 type: string
 *                 description: Type of service requested
 *                 example: Web Development
 *               projectTitle:
 *                 type: string
 *                 description: Title of the project
 *                 example: E-commerce Website
 *               projectDescription:
 *                 type: string
 *                 description: Detailed description of the project
 *                 example: Need a modern e-commerce website with payment integration
 *               budgetRange:
 *                 type: string
 *                 description: Budget range for the project
 *                 example: $5,000 - $10,000
 *               preferredTimeline:
 *                 type: string
 *                 description: Preferred project timeline
 *                 example: 2-3 months
 *               name:
 *                 type: string
 *                 description: Client's full name
 *                 example: John Doe
 *               companyName:
 *                 type: string
 *                 description: Company name (optional)
 *                 example: Tech Solutions
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Client's email address
 *                 example: john@example.com
 *               phoneNumber:
 *                 type: string
 *                 description: Client's phone number
 *                 example: +123456789
 *               ndaRequired:
 *                 type: boolean
 *                 description: Whether NDA is required
 *                 example: true
 *               scheduleProposalCall:
 *                 type: boolean
 *                 description: Whether to schedule a proposal call
 *                 example: false
 *               ongoingSupport:
 *                 type: boolean
 *                 description: Whether ongoing support is needed
 *                 example: true
 *     responses:
 *       200:
 *         description: Quotation request submitted successfully
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
 *                   example: Quote submitted successfully!
 *       405:
 *         description: Method not allowed
 *       500:
 *         description: Internal server error
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    service, projectTitle, projectDescription, budgetRange, preferredTimeline,
    name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
  } = req.body;

  try {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
      console.error("Missing environment variables:", {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS,
        ADMIN_EMAIL: !!process.env.ADMIN_EMAIL
      });
      return res.status(500).json({ error: "Server configuration error" });
    }

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

    // Send admin email
    console.log("Sending admin email to:", process.env.ADMIN_EMAIL);
    await transporter.sendMail({
      from: `"SwanLogics Quotations" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Quotation Request from ${name}`,
      html: emailTemplates.quoteAdmin({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });
    console.log("Admin email sent successfully");

    // Send client confirmation email
    console.log("Sending confirmation email to:", email);
    await transporter.sendMail({
      from: `"SwanLogics" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We've Received Your Quotation Request",
      html: emailTemplates.quoteClient({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
    });
    console.log("Client email sent successfully");

    res.json({ success: true, message: "Quote submitted successfully!" });
  } catch (error) {
    console.error("❌ Quote submission error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ 
      error: "Failed to submit quote",
      details: error.message 
    });
  }
}