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

  const { name, email, message } = req.body;

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'abdulahadaa88345@gmail.com',
      from: 'abdulahadaa88345@gmail.com',
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await sgMail.send(msg);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
}