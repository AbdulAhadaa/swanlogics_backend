# Email Templates

Professional email templates for SwanLogics backend services.

## Templates

### 1. Contact Form - Admin Notification
**Function:** `emailTemplates.contactAdmin(name, email, message)`

Sent to admin when a user submits the contact form.

**Features:**
- Clean, modern design with gradient header
- Contact information highlighted
- Message content in readable format
- Timestamp included

---

### 2. Quotation Request - Admin Notification
**Function:** `emailTemplates.quoteAdmin(data)`

Sent to admin when a client requests a project quotation.

**Features:**
- Organized sections with color-coded borders
- Project details (service, title, description)
- Budget and timeline information
- Contact information with clickable email
- Additional preferences (NDA, proposal call, ongoing support)

**Data Object:**
```javascript
{
  service,
  projectTitle,
  projectDescription,
  budgetRange,
  preferredTimeline,
  name,
  companyName,
  email,
  phoneNumber,
  ndaRequired,
  scheduleProposalCall,
  ongoingSupport
}
```

---

### 3. Quotation Request - Client Confirmation
**Function:** `emailTemplates.quoteClient(data)`

Sent to client confirming receipt of their quotation request.

**Features:**
- Welcoming gradient header
- Personalized greeting
- Project summary
- Clear "What Happens Next?" section with numbered steps
- Expected response time (24-48 hours) prominently displayed
- Professional closing

**Data Object:** Same as `quoteAdmin`

---

## Design Principles

- **Responsive:** Uses table-based layout for maximum email client compatibility
- **Professional:** Clean typography with system fonts
- **Branded:** Consistent purple gradient (#667eea to #764ba2)
- **Accessible:** High contrast text, clear hierarchy
- **Mobile-friendly:** Optimized for 600px width

## Usage

Import the templates module:

```javascript
const emailTemplates = require('./templates/emailTemplates');
```

Use in nodemailer:

```javascript
await transporter.sendMail({
  from: '"SwanLogics" <your@email.com>',
  to: recipient@email.com,
  subject: 'Your Subject',
  html: emailTemplates.contactAdmin(name, email, message)
});
```

## Color Palette

- **Primary Gradient:** #667eea → #764ba2
- **Success:** #4caf50, #388e3c
- **Info:** #2196f3, #1976d2
- **Warning:** #ff9800, #f57c00
- **Purple:** #9c27b0, #7b1fa2
- **Text:** #2c3e50 (dark), #495057 (medium), #6c757d (light)
- **Background:** #f4f7fa, #f8f9fa

## Testing

Test emails locally by running the server and submitting forms through your frontend or API testing tool (Postman, Thunder Client, etc.).
