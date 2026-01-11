const sgMail = require('@sendgrid/mail');

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
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'abdulahadaa88345@gmail.com',
      from: { email: 'abdulahadaa88345@gmail.com', name: 'SwanLogics Quote Request' },
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      text: `Service: ${service}\nName: ${name}\nEmail: ${email}\nBudget: ${budgetRange}\nProject: ${projectTitle}\nDescription: ${projectDescription}`,
      html: `<h3>New Quote Request</h3><p><strong>Service:</strong> ${service}</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Budget:</strong> ${budgetRange}</p><p><strong>Project:</strong> ${projectTitle}</p><p><strong>Description:</strong> ${projectDescription}</p>`
    };

    await sgMail.send(msg);

    res.json({ success: true, message: "Quote submitted successfully!" });
  } catch (error) {
    console.error("Quote error:", error);
    res.status(500).json({ error: "Failed to submit quote" });
  }
}