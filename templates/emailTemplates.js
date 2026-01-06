const emailTemplates = {
  contactAdmin: (name, email, message) => `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <p><em>Received on ${new Date().toLocaleString()}</em></p>
  `
};

module.exports = emailTemplates;