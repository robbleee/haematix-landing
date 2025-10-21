# Email Not Working? Debug Steps

## Issue: Email not received at robert.lee@lseg.com

### Step 1: Check Environment Variables

Make sure your `.env.local` file has:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
BETA_NOTIFICATION_EMAIL=robert.lee@lseg.com
```

**Important:** After changing `.env.local`, you MUST restart your dev server:
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 2: Check Console Logs

When someone submits a request, check your terminal for:

```
Environment check: {
  hasApiKey: true,
  apiKeyPrefix: 're_xxxx',
  recipientEmail: 'robert.lee@lseg.com'
}
Attempting to send email to: robert.lee@lseg.com
Data room access request email sent successfully: { id: '...' }
```

### Step 3: Common Issues

1. **API Key Not Loading**
   - Console shows: `hasApiKey: false`
   - Solution: Restart dev server after creating `.env.local`

2. **Wrong Email Address**
   - Check the `recipientEmail` in console logs
   - Make sure it's `robert.lee@lseg.com` not `robert.lee@haem.io`

3. **Email in Spam**
   - Check your spam/junk folder
   - Sender will be: `onboarding@resend.dev`

4. **Resend API Key Invalid**
   - Log into https://resend.com/api-keys
   - Check if your API key is active
   - Generate a new one if needed

5. **Resend Account Limits**
   - Free tier: 100 emails/day, 1 email/second
   - Check your Resend dashboard for any errors

### Step 4: Test the Email System

Try submitting a test request:
1. Go to data room
2. Click "Request Access"
3. Fill in the form
4. Check terminal for logs

### Step 5: Verify Resend Setup

1. Log into https://resend.com
2. Go to "Emails" section
3. You should see recent email attempts
4. Check for delivery status or errors

### Quick Fix Checklist

- [ ] `.env.local` file exists in project root
- [ ] File contains `RESEND_API_KEY=re_...`
- [ ] File contains `BETA_NOTIFICATION_EMAIL=robert.lee@lseg.com`
- [ ] Dev server restarted after creating/editing `.env.local`
- [ ] Console shows "email sent successfully"
- [ ] Checked spam folder for emails from `onboarding@resend.dev`
- [ ] Checked Resend dashboard for email delivery logs

### Current Email Setup

- **From:** `onboarding@resend.dev` (Resend's test sender)
- **To:** Value from `BETA_NOTIFICATION_EMAIL` 
- **Reply-To:** Requester's email address
- **Subject:** "New Data Room Access Request from [Name]"

### Need to Change Sender Email?

To use `dataroom@haem.io` instead of `onboarding@resend.dev`:

1. Verify your domain at https://resend.com/domains
2. Add DNS records (provided by Resend)
3. Wait for verification
4. Update `route.js` line 60: change `from:` to `dataroom@haem.io`

