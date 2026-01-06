const nodemailer = require("nodemailer");
const emailTemplates = require("../templates/emailTemplates");

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
    let transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: `"SwanLogics Quotations" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Quotation Request from ${name}`,
      html: emailTemplates.quoteAdmin({
        service, projectTitle, projectDescription, budgetRange, preferredTimeline,
        name, companyName, email, phoneNumber, ndaRequired, scheduleProposalCall, ongoingSupport
      })
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

    res.json({ success: true, message: "Quote submitted successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to submit quote" });
  }
}