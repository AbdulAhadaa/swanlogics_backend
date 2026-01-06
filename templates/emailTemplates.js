// Professional Email Templates for SwanLogics

const emailTemplates = {
  // Contact Form - Admin Notification
  contactAdmin: (name, email, message) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fa;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Contact Message</h1>
                  <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">SwanLogics Contact Form</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  
                  <!-- Sender Info -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; border-radius: 4px;">
                        <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px; font-weight: 600;">Contact Information</h2>
                        <p style="margin: 0 0 8px 0; color: #495057; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #2c3e50;">Name:</strong> ${name}
                        </p>
                        <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #2c3e50;">Email:</strong> 
                          <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Message Content -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px; font-weight: 600;">Message</h2>
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 4px; border: 1px solid #e9ecef;">
                          <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="margin: 0; color: #6c757d; font-size: 13px;">
                    Received on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  // Quotation Request - Admin Notification
  quoteAdmin: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fa;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Quotation Request</h1>
                  <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">SwanLogics Portfolio</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  
                  <!-- Project Details -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                    <tr>
                      <td style="background-color: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; border-radius: 4px;">
                        <h2 style="margin: 0 0 15px 0; color: #1976d2; font-size: 18px; font-weight: 600;">Project Details</h2>
                        <p style="margin: 0 0 10px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #1976d2;">Service:</strong> ${data.service}
                        </p>
                        <p style="margin: 0 0 10px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #1976d2;">Project Title:</strong> ${data.projectTitle}
                        </p>
                        <p style="margin: 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #1976d2;">Description:</strong><br/>
                          ${data.projectDescription}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Budget & Timeline -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                    <tr>
                      <td style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 20px; border-radius: 4px;">
                        <h2 style="margin: 0 0 15px 0; color: #388e3c; font-size: 18px; font-weight: 600;">Budget & Timeline</h2>
                        <p style="margin: 0 0 10px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #388e3c;">Budget Range:</strong> ${data.budgetRange}
                        </p>
                        <p style="margin: 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #388e3c;">Timeline:</strong> ${data.preferredTimeline}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Contact Information -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                    <tr>
                      <td style="background-color: #fff3e0; border-left: 4px solid #ff9800; padding: 20px; border-radius: 4px;">
                        <h2 style="margin: 0 0 15px 0; color: #f57c00; font-size: 18px; font-weight: 600;">Contact Information</h2>
                        <p style="margin: 0 0 10px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #f57c00;">Name:</strong> ${data.name}
                        </p>
                        ${data.companyName ? `<p style="margin: 0 0 10px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #f57c00;">Company:</strong> ${data.companyName}
                        </p>` : ''}
                        <p style="margin: 0 0 10px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #f57c00;">Email:</strong> 
                          <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a>
                        </p>
                        <p style="margin: 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #f57c00;">Phone:</strong> ${data.phoneNumber}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Preferences -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color: #f3e5f5; border-left: 4px solid #9c27b0; padding: 20px; border-radius: 4px;">
                        <h2 style="margin: 0 0 15px 0; color: #7b1fa2; font-size: 18px; font-weight: 600;">Additional Preferences</h2>
                        <p style="margin: 0 0 8px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #7b1fa2;">NDA Required:</strong> ${data.ndaRequired ? '✓ Yes' : '✗ No'}
                        </p>
                        <p style="margin: 0 0 8px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #7b1fa2;">Schedule Proposal Call:</strong> ${data.scheduleProposalCall ? '✓ Yes' : '✗ No'}
                        </p>
                        <p style="margin: 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #7b1fa2;">Ongoing Support:</strong> ${data.ongoingSupport ? '✓ Yes' : '✗ No'}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="margin: 0; color: #6c757d; font-size: 13px;">
                    Received on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

  // Quotation Request - Client Confirmation
  quoteClient: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f7fa;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7fa; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600; letter-spacing: -0.5px;">Thank You!</h1>
                  <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">We've received your request</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  
                  <!-- Greeting -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td>
                        <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 24px; font-weight: 600;">Hello ${data.name},</h2>
                        <p style="margin: 0; color: #495057; font-size: 16px; line-height: 1.8;">
                          Thank you for reaching out to SwanLogics. We've successfully received your project quotation request and our team is excited to review your requirements.
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Project Summary -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="background-color: #e3f2fd; padding: 25px; border-radius: 6px; border-left: 4px solid #2196f3;">
                        <h3 style="margin: 0 0 15px 0; color: #1976d2; font-size: 18px; font-weight: 600;">Your Project Details</h3>
                        <p style="margin: 0 0 10px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #1976d2;">Service:</strong> ${data.service}
                        </p>
                        <p style="margin: 0 0 10px 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #1976d2;">Project:</strong> ${data.projectTitle}
                        </p>
                        <p style="margin: 0; color: #37474f; font-size: 15px; line-height: 1.6;">
                          <strong style="color: #1976d2;">Budget Range:</strong> ${data.budgetRange}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Next Steps -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td>
                        <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: top;">
                                    <div style="width: 32px; height: 32px; background-color: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 600; font-size: 14px;">1</div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0; color: #2c3e50; font-size: 15px; line-height: 1.6;">
                                      <strong>Review</strong><br/>
                                      <span style="color: #6c757d;">Our team will carefully review your project requirements</span>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 0; border-bottom: 1px solid #e9ecef;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: top;">
                                    <div style="width: 32px; height: 32px; background-color: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 600; font-size: 14px;">2</div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0; color: #2c3e50; font-size: 15px; line-height: 1.6;">
                                      <strong>Proposal</strong><br/>
                                      <span style="color: #6c757d;">We'll prepare a detailed proposal tailored to your needs</span>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 15px 0;">
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="width: 40px; vertical-align: top;">
                                    <div style="width: 32px; height: 32px; background-color: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 600; font-size: 14px;">3</div>
                                  </td>
                                  <td style="vertical-align: top;">
                                    <p style="margin: 0; color: #2c3e50; font-size: 15px; line-height: 1.6;">
                                      <strong>Response</strong><br/>
                                      <span style="color: #6c757d;">You'll hear from us within 24-48 hours</span>
                                    </p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Response Time -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td align="center" style="background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); padding: 25px; border-radius: 6px;">
                        <p style="margin: 0 0 5px 0; color: rgba(255,255,255,0.9); font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Expected Response Time</p>
                        <p style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">24-48 Hours</p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Closing -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin: 0 0 20px 0; color: #495057; font-size: 15px; line-height: 1.8;">
                          If you have any urgent questions or need to provide additional information, feel free to reply to this email.
                        </p>
                        <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.8;">
                          Best regards,<br/>
                          <strong style="color: #2c3e50;">The SwanLogics Team</strong>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
                  <p style="margin: 0 0 10px 0; color: #2c3e50; font-size: 14px; font-weight: 600;">SwanLogics</p>
                  <p style="margin: 0; color: #6c757d; font-size: 13px; line-height: 1.6;">
                    Professional Web & Mobile Development Services
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
};

export default emailTemplates;
