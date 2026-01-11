const emailTemplates = {
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
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Contact Message</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase;">Contact Information</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 0; color: #2c3e50; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
                  </div>
                  <div style="margin-bottom: 20px;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase;">Message</p>
                    <p style="margin: 0; color: #495057; font-size: 16px; line-height: 1.6;">${message}</p>
                  </div>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; text-align: center;">
                    <p style="margin: 0; color: #6c757d; font-size: 14px;"><em>Received on ${new Date().toLocaleString()}</em></p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

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
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Quotation Request</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <!-- Project Details -->
                  <div style="background-color: #f8f9fa; border-left: 4px solid #9c27b0; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase;">Project Details</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Service:</strong> ${data.service}</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Project Title:</strong> ${data.projectTitle}</p>
                    <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.6;"><strong>Description:</strong><br>${data.projectDescription}</p>
                  </div>
                  <!-- Budget & Timeline -->
                  <div style="background-color: #f8f9fa; border-left: 4px solid #4caf50; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase;">Budget & Timeline</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Budget Range:</strong> ${data.budgetRange}</p>
                    <p style="margin: 0; color: #2c3e50; font-size: 16px;"><strong>Timeline:</strong> ${data.preferredTimeline}</p>
                  </div>
                  <!-- Contact Information -->
                  <div style="background-color: #f8f9fa; border-left: 4px solid #2196f3; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase;">Contact Information</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Name:</strong> ${data.name}</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Company:</strong> ${data.companyName || 'N/A'}</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></p>
                    <p style="margin: 0; color: #2c3e50; font-size: 16px;"><strong>Phone:</strong> ${data.phoneNumber || 'N/A'}</p>
                  </div>
                  <!-- Additional Preferences -->
                  <div style="background-color: #f8f9fa; border-left: 4px solid #ff9800; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase;">Additional Preferences</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">✓ NDA Required: ${data.ndaRequired ? 'Yes' : 'No'}</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;">✓ Schedule Proposal Call: ${data.scheduleProposalCall ? 'Yes' : 'No'}</p>
                    <p style="margin: 0; color: #2c3e50; font-size: 16px;">✓ Ongoing Support: ${data.ongoingSupport ? 'Yes' : 'No'}</p>
                  </div>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; text-align: center;">
                    <p style="margin: 0; color: #6c757d; font-size: 14px;"><em>Received on ${new Date().toLocaleString()}</em></p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,

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
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Thank You for Your Request!</h1>
                </td>
              </tr>
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="margin: 0 0 20px 0; color: #2c3e50; font-size: 18px;">Hi ${data.name},</p>
                  <p style="margin: 0 0 20px 0; color: #495057; font-size: 16px; line-height: 1.6;">Thank you for reaching out to SwanLogics! We've received your quotation request and are excited to learn more about your project.</p>
                  
                  <!-- Project Summary -->
                  <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 25px; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 14px; font-weight: 600; text-transform: uppercase;">Your Project Summary</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Service:</strong> ${data.service}</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Project:</strong> ${data.projectTitle}</p>
                    <p style="margin: 0 0 8px 0; color: #2c3e50; font-size: 16px;"><strong>Budget:</strong> ${data.budgetRange}</p>
                    <p style="margin: 0; color: #2c3e50; font-size: 16px;"><strong>Timeline:</strong> ${data.preferredTimeline}</p>
                  </div>

                  <!-- What Happens Next -->
                  <div style="background-color: #f8f9fa; padding: 25px; margin-bottom: 25px; border-radius: 4px;">
                    <p style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px; font-weight: 600;">What Happens Next?</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 10px 0;">
                          <p style="margin: 0; color: #667eea; font-size: 24px; font-weight: 700; float: left; margin-right: 15px;">1</p>
                          <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.6;">Our team will review your requirements carefully</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <p style="margin: 0; color: #667eea; font-size: 24px; font-weight: 700; float: left; margin-right: 15px;">2</p>
                          <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.6;">We'll prepare a detailed proposal tailored to your needs</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0;">
                          <p style="margin: 0; color: #667eea; font-size: 24px; font-weight: 700; float: left; margin-right: 15px;">3</p>
                          <p style="margin: 0; color: #495057; font-size: 15px; line-height: 1.6;">You'll receive our response within 24-48 hours</p>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div style="background-color: #667eea; padding: 20px; border-radius: 4px; text-align: center; margin-bottom: 20px;">
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">Expected Response Time: 24-48 Hours</p>
                  </div>

                  <p style="margin: 0 0 10px 0; color: #495057; font-size: 16px; line-height: 1.6;">If you have any urgent questions, feel free to reply to this email.</p>
                  <p style="margin: 0; color: #495057; font-size: 16px; line-height: 1.6;">Best regards,<br><strong>The SwanLogics Team</strong></p>
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

module.exports = emailTemplates;