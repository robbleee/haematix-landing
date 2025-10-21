# Email Setup Guide for Data Room Access Requests

The data room currently logs access requests to the console. To receive emails in production, follow these steps:

## Option 1: Resend (Recommended - Easy Setup)

### 1. Install Resend
```bash
npm install resend
```

### 2. Get API Key
- Sign up at [resend.com](https://resend.com)
- Get your API key from the dashboard
- Add to `.env.local`:
```
RESEND_API_KEY=re_your_api_key_here
```

### 3. Update the API Route
In `src/app/api/request-access/route.js`, uncomment and use:

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'dataroom@haem.io', // Must be verified domain
  to: 'robert.lee@haem.io',
  subject: 'New Data Room Access Request',
  html: `
    <h2>New Data Room Access Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message || 'No message provided'}</p>
    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
  `,
});
```

### 4. Verify Domain
- Add your domain (haem.io) in Resend dashboard
- Add the required DNS records
- Wait for verification

## Option 2: SendGrid

### 1. Install SendGrid
```bash
npm install @sendgrid/mail
```

### 2. Get API Key
- Sign up at [sendgrid.com](https://sendgrid.com)
- Create API key with Mail Send permissions
- Add to `.env.local`:
```
SENDGRID_API_KEY=SG.your_api_key_here
```

### 3. Update API Route
```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'robert.lee@haem.io',
  from: 'dataroom@haem.io', // Must be verified
  subject: 'New Data Room Access Request',
  html: `
    <h2>New Data Room Access Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message || 'No message provided'}</p>
  `,
};

await sgMail.send(msg);
```

## Option 3: Gmail SMTP (Quick Development Setup)

For development/testing, you can use Gmail SMTP with Nodemailer:

### 1. Install Nodemailer
```bash
npm install nodemailer
```

### 2. Setup Gmail App Password
- Go to Google Account settings
- Enable 2-factor authentication
- Generate App Password for Mail
- Add to `.env.local`:
```
GMAIL_USER=robert.lee@haem.io
GMAIL_APP_PASSWORD=your_app_password
```

### 3. Update API Route
```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: 'robert.lee@haem.io',
  subject: 'New Data Room Access Request',
  html: `
    <h2>New Data Room Access Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message || 'No message provided'}</p>
  `,
});
```

## Current Setup (Console Logging)

Currently, access requests are logged to the console. You can view them by:
1. Running `npm run dev`
2. Checking the terminal/console output when someone submits a request

The logs include:
- Name
- Email
- Message
- Timestamp

## Recommended Setup for Production

**Use Resend** - It's the easiest to set up and has great Next.js integration.

1. Install Resend
2. Add API key to environment variables
3. Verify your domain
4. Update the API route to send emails

That's it! Your data room will email you whenever someone requests access.

