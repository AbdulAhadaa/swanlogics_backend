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
      from: { email: 'abdulahadaa88345@gmail.com', name: 'SwanLogics Contact Form' },
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h3>New Contact Message</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
    };

    const result = await sgMail.send(msg);
    console.log('SendGrid response:', result);

    res.json({ success: true, message: "Message sent successfully!", debug: result[0].statusCode });
  } catch (error) {
    console.error("Contact error:", error.response ? error.response.body : error);
    res.status(500).json({ error: "Failed to send message", debug: error.message });
  }
}