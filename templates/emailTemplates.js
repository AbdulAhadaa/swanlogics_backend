// Professional Email Templates for SwanLogics



const emailTemplates = {
  // Contact Form - Admin Notification
  contactAdmin: (name, email, message, metadata = {}) => {
    const requestId = `MSG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const submissionDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const submissionTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const timestamp = new Date().toISOString();

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0f2f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
              
              <!-- Logo & Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">New Contact Message</h1>
                  <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 500;">Contact Form Submission</p>
                </td>
              </tr>
              
              <!-- Message Metadata -->
              <tr>
                <td style="background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px 40px; border-bottom: 3px solid #667eea;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="50%" style="padding: 8px 10px 8px 0;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message ID</p>
                        <p style="margin: 4px 0 0 0; color: #212529; font-size: 15px; font-weight: 700; font-family: 'Courier New', monospace;">${requestId}</p>
                      </td>
                      <td width="50%" style="padding: 8px 0 8px 10px;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Priority</p>
                        <p style="margin: 4px 0 0 0; color: #ff9800; font-size: 15px; font-weight: 700;">🟠 MEDIUM</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 10px 8px 0;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Submission Date</p>
                        <p style="margin: 4px 0 0 0; color: #212529; font-size: 15px; font-weight: 600;">📅 ${submissionDate}</p>
                      </td>
                      <td style="padding: 12px 0 8px 10px;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Submission Time</p>
                        <p style="margin: 4px 0 0 0; color: #212529; font-size: 15px; font-weight: 600;">⏰ ${submissionTime}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 10px 0 0;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Department</p>
                        <p style="margin: 4px 0 0 0; color: #212529; font-size: 15px; font-weight: 600;">💬 Customer Support</p>
                      </td>
                      <td style="padding: 12px 0 0 10px;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Status</p>
                        <p style="margin: 4px 0 0 0; color: #28a745; font-size: 15px; font-weight: 700;">✅ NEW</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  
                  <!-- Sender Info -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-left: 5px solid #2196f3; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(33,150,243,0.1);">
                        <h2 style="margin: 0 0 20px 0; color: #1976d2; font-size: 20px; font-weight: 700; border-bottom: 2px solid #2196f3; padding-bottom: 10px;">👤 Contact Information</h2>
                        <p style="margin: 0 0 12px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #1565c0; display: inline-block; width: 100px;">Name:</strong> ${name}
                        </p>
                        <p style="margin: 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #1565c0; display: inline-block; width: 100px;">Email:</strong> 
                          <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 600;">${email}</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Message Content -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-left: 5px solid #4caf50; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(76,175,80,0.1);">
                        <h2 style="margin: 0 0 20px 0; color: #2e7d32; font-size: 20px; font-weight: 700; border-bottom: 2px solid #4caf50; padding-bottom: 10px;">💬 Message</h2>
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 6px; border: 1px solid #c8e6c9;">
                          <p style="margin: 0; color: #263238; font-size: 15px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- System & Technical Information -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-left: 5px solid #e91e63; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(233,30,99,0.1);">
                        <h2 style="margin: 0 0 20px 0; color: #880e4f; font-size: 20px; font-weight: 700; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">🖥️ System & Technical Information</h2>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Submission Method:</strong> Contact Form (API)
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Timestamp (ISO):</strong> <span style="font-family: 'Courier New', monospace; font-size: 13px;">${timestamp}</span>
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Client IP Address:</strong> ${metadata.ipAddress || 'Not captured'}
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">User Agent:</strong> <span style="font-size: 12px;">${metadata.userAgent || 'Not captured'}</span>
                        </ p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Device Type:</strong> ${metadata.deviceType || 'Unknown'}
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Browser:</strong> ${metadata.browser || 'Unknown'}
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Referrer URL:</strong> ${metadata.referrer || 'Direct'}
                        </p>
                        <p style="margin: 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Geographic Location:</strong> ${metadata.location || 'Not available'}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%); padding: 30px 40px; text-align: center; border-top: 4px solid #667eea;">
                  <p style="margin: 0 0 8px 0; color: #ecf0f1; font-size: 16px; font-weight: 700;">SwanLogics</p>
                  <p style="margin: 0 0 8px 0; color: #ecf0f1; font-size: 14px; font-weight: 600;">Professional Web & Mobile Development</p>
                  <p style="margin: 0 0 15px 0; color: #bdc3c7; font-size: 13px;">Turning Ideas into Digital Reality</p>
                  <p style="margin: 0; color: #95a5a6; font-size: 12px; line-height: 1.6;">
                    This email was automatically generated on ${submissionDate} at ${submissionTime}<br/>
                    Message ID: ${requestId} | Priority: MEDIUM | Status: NEW
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  },


  // Quotation Request - Admin Notification
  quoteAdmin: (data) => {
    const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const submissionDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const submissionTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const timestamp = new Date().toISOString();

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0f2f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
              
              <!-- Logo & Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">New Quotation Request</h1>
                  <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 500;">Project Inquiry Received</p>
                </td>
              </tr>
              
              <!-- Request Metadata -->
              <tr>
                <td style="background: linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%); padding: 25px 40px; border-bottom: 3px solid #667eea;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="50%" style="padding: 8px 10px 8px 0;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Request ID</p>
                        <p style="margin: 4px 0 0 0; color: #212529; font-size: 15px; font-weight: 700; font-family: 'Courier New', monospace;">${requestId}</p>
                      </td>
                      <td width="50%" style="padding: 8px 0 8px 10px;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Priority</p>
                        <p style="margin: 4px 0 0 0; color: #dc3545; font-size: 15px; font-weight: 700;">🔴 HIGH</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 10px 8px 0;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Submission Date</p>
                        <p style="margin: 4px 0 0 0; color: #212529; font-size: 15px; font-weight: 600;">📅 ${submissionDate}</p>
                      </td>
                      <td style="padding: 12px 0 8px 10px;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Submission Time</p>
                        <p style="margin: 4px 0 0 0; color: #212529; font-size: 15px; font-weight: 600;">⏰ ${submissionTime}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 10px 0 0;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Department</p>
                        <p style="margin: 4px 0 0 0; color: #212529; font-size: 15px; font-weight: 600;">💼 Sales & Business Development</p>
                      </td>
                      <td style="padding: 12px 0 0 10px;">
                        <p style="margin: 0; color: #495057; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Status</p>
                        <p style="margin: 4px 0 0 0; color: #28a745; font-size: 15px; font-weight: 700;">✅ NEW</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  
                  <!-- Project Details -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-left: 5px solid #2196f3; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);">
                        <h2 style="margin: 0 0 20px 0; color: #1976d2; font-size: 20px; font-weight: 700; border-bottom: 2px solid #2196f3; padding-bottom: 10px;">📋 Project Details</h2>
                        <p style="margin: 0 0 12px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #1565c0; display: inline-block; width: 140px;">Service:</strong> 
                          <span style="background-color: #ffffff; padding: 4px 12px; border-radius: 4px; font-weight: 600;">${data.service}</span>
                        </p>
                        <p style="margin: 0 0 12px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #1565c0; display: inline-block; width: 140px;">Project Title:</strong> ${data.projectTitle}
                        </p>
                        <p style="margin: 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #1565c0;">Description:</strong><br/>
                          <span style="display: block; margin-top: 8px; padding: 15px; background-color: #ffffff; border-radius: 6px; line-height: 1.8;">${data.projectDescription}</span>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Budget & Timeline -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-left: 5px solid #4caf50; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);">
                        <h2 style="margin: 0 0 20px 0; color: #2e7d32; font-size: 20px; font-weight: 700; border-bottom: 2px solid #4caf50; padding-bottom: 10px;">💰 Budget & Timeline</h2>
                        <p style="margin: 0 0 12px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #1b5e20; display: inline-block; width: 140px;">Budget Range:</strong> 
                          <span style="background-color: #ffffff; padding: 4px 12px; border-radius: 4px; font-weight: 600; color: #2e7d32;">${data.budgetRange}</span>
                        </p>
                        <p style="margin: 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #1b5e20; display: inline-block; width: 140px;">Timeline:</strong> 
                          <span style="background-color: #ffffff; padding: 4px 12px; border-radius: 4px; font-weight: 600; color: #2e7d32;">${data.preferredTimeline}</span>
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Contact Information -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-left: 5px solid #ff9800; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(255, 152, 0, 0.1);">
                        <h2 style="margin: 0 0 20px 0; color: #e65100; font-size: 20px; font-weight: 700; border-bottom: 2px solid #ff9800; padding-bottom: 10px;">👤 Contact Information</h2>
                        <p style="margin: 0 0 12px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #e65100; display: inline-block; width: 140px;">Name:</strong> ${data.name}
                        </p>
                        ${data.companyName ? `<p style="margin: 0 0 12px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #e65100; display: inline-block; width: 140px;">Company:</strong> ${data.companyName}
                        </p>` : ''}
                        <p style="margin: 0 0 12px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #e65100; display: inline-block; width: 140px;">Email:</strong> 
                          <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none; font-weight: 600;">${data.email}</a>
                        </p>
                        <p style="margin: 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #e65100; display: inline-block; width: 140px;">Phone:</strong> ${data.phoneNumber}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Preferences -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                    <tr>
                      <td style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-left: 5px solid #9c27b0; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(156, 39, 176, 0.1);">
                        <h2 style="margin: 0 0 20px 0; color: #6a1b9a; font-size: 20px; font-weight: 700; border-bottom: 2px solid #9c27b0; padding-bottom: 10px;">⚙️ Additional Preferences</h2>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #6a1b9a; display: inline-block; width: 200px;">NDA Required:</strong> ${data.ndaRequired ? '<span style="color: #2e7d32; font-weight: 700;">✓ Yes</span>' : '<span style="color: #c62828; font-weight: 700;">✗ No</span>'}
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #6a1b9a; display: inline-block; width: 200px;">Schedule Proposal Call:</strong> ${data.scheduleProposalCall ? '<span style="color: #2e7d32; font-weight: 700;">✓ Yes</span>' : '<span style="color: #c62828; font-weight: 700;">✗ No</span>'}
                        </p>
                        <p style="margin: 0; color: #263238; font-size: 15px; line-height: 1.7;">
                          <strong style="color: #6a1b9a; display: inline-block; width: 200px;">Ongoing Support Needed:</strong> ${data.ongoingSupport ? '<span style="color: #2e7d32; font-weight: 700;">✓ Yes</span>' : '<span style="color: #c62828; font-weight: 700;">✗ No</span>'}
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- System & Technical Information -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%); border-left: 5px solid #e91e63; padding: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(233, 30, 99, 0.1);">
                        <h2 style="margin: 0 0 20px 0; color: #880e4f; font-size: 20px; font-weight: 700; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">🖥️ System & Technical Information</h2>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Submission Method:</strong> Web Form (API)
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Timestamp (ISO):</strong> <span style="font-family: 'Courier New', monospace; font-size: 13px;">${timestamp}</span>
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Client IP Address:</strong> ${data.ipAddress || 'Not captured'}
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">User Agent:</strong> <span style="font-size: 12px;">${data.userAgent || 'Not captured'}</span>
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Device Type:</strong> ${data.deviceType || 'Unknown'}
                        </p>
                        <p style="margin: 0 0 10px 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Browser:</strong> ${data.browser || 'Unknown'}
                        </p>
                        <p style="margin: 0; color: #263238; font-size: 14px; line-height: 1.7;">
                          <strong style="color: #880e4f; display: inline-block; width: 160px;">Geographic Location:</strong> ${data.location || 'Not available'}
                        </p>
                      </td>
                    </tr>
                  </table>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background: linear-gradient(90deg, #2c3e50 0%, #34495e 100%); padding: 30px 40px; text-align: center; border-top: 4px solid #667eea;">
                  <p style="margin: 0 0 8px 0; color: #ecf0f1; font-size: 16px; font-weight: 700;">SwanLogics</p>
                  <p style="margin: 0 0 8px 0; color: #ecf0f1; font-size: 14px; font-weight: 600;">Professional Web & Mobile Development</p>
                  <p style="margin: 0 0 15px 0; color: #bdc3c7; font-size: 13px;">Turning Ideas into Digital Reality</p>
                  <p style="margin: 0; color: #95a5a6; font-size: 12px; line-height: 1.6;">
                    This email was automatically generated on ${submissionDate} at ${submissionTime}<br/>
                    Request ID: ${requestId} | Priority: HIGH | Status: NEW
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  },

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

module.exports = emailTemplates;
