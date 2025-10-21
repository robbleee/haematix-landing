# 🚀 Deployment Guide - Haem.io Data Room

Your data room code has been committed and pushed to GitHub! Follow these steps to deploy:

## Quick Deploy with Vercel (Recommended - 5 minutes)

### Step 1: Sign in to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login"
3. Use "Continue with GitHub" for easiest integration

### Step 2: Import Your Project
1. Click "Add New..." → "Project"
2. Find your `haemio-landing-page` repository
3. Click "Import"

### Step 3: Configure Environment Variables
**IMPORTANT:** Before deploying, add these environment variables:

1. In the "Configure Project" screen, expand "Environment Variables"
2. Add these two variables:

   **Variable 1:**
   - Name: `RESEND_API_KEY`
   - Value: `re_UPigjgyE_DnAmvVFaRq3iFrV9KTF4gkB9`
   
   **Variable 2:**
   - Name: `BETA_NOTIFICATION_EMAIL`
   - Value: `robert.lee@lseg.com` (or your preferred email)

3. Make sure both are checked for "Production", "Preview", and "Development"

### Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://haemio-landing-page.vercel.app`

### Step 5: Test Your Deployment
1. Visit your new URL
2. Go to `/data-room`
3. Test the password: `Haemio!2025$DataRoom`
4. Test the access request form
5. Check your email for notifications

## 🔐 Data Room URLs

Once deployed, your data room will be at:
- **Production:** `https://your-domain.vercel.app/data-room`
- **Test Email:** `https://your-domain.vercel.app/api/test-email`

## 📧 Email Configuration

Your email notifications are configured with:
- **Service:** Resend
- **Sender:** onboarding@resend.dev (test sender)
- **Recipient:** Value from `BETA_NOTIFICATION_EMAIL`

### To Use Custom Domain Email (Optional)
To send from `dataroom@haem.io`:
1. Go to [resend.com/domains](https://resend.com/domains)
2. Click "Add Domain"
3. Add your DNS records as instructed
4. Wait for verification
5. Update line 64 in `src/app/api/request-access/route.js`:
   - Change: `from: 'onboarding@resend.dev'`
   - To: `from: 'dataroom@haem.io'`
6. Commit and push changes

## 🔄 Future Updates

To deploy updates:
1. Make changes locally
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push origin main`
4. Vercel automatically deploys! (30 seconds)

## 🌐 Custom Domain (Optional)

To use `dataroom.haem.io`:
1. In Vercel, go to Project Settings → Domains
2. Add `dataroom.haem.io`
3. Add the DNS records shown (CNAME or A record)
4. Wait for DNS propagation (5-60 minutes)

## ⚙️ Environment Variables in Production

If you need to update environment variables after deployment:
1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Environment Variables"
3. Edit or add variables
4. Click "Save"
5. Go to "Deployments" → Click "..." on latest → "Redeploy"

## 🐛 Troubleshooting

### Emails Not Working in Production
1. Check Vercel logs: Project → Deployments → Click deployment → "Runtime Logs"
2. Verify environment variables are set correctly
3. Check Resend dashboard for delivery status
4. Make sure you're not hitting rate limits (100 emails/day on free tier)

### Build Fails
1. Check the build logs in Vercel
2. Make sure `package.json` is up to date
3. Try running `npm run build` locally first

### Data Room Not Found
1. Make sure you pushed all commits to GitHub
2. Check Vercel redeployed after the push
3. Visit `/data-room` (not `/data-room/`)

## 📊 Monitoring

- **Vercel Analytics:** Automatically enabled
- **Email Logs:** Check [resend.com/emails](https://resend.com/emails)
- **Runtime Logs:** Vercel Dashboard → Deployments → Runtime Logs

## 🎉 You're Done!

Your secure investor data room is now live with:
- ✅ Password protection
- ✅ NDA acceptance flow
- ✅ Email notifications for access requests
- ✅ Two-tier access system (Basic & Full)
- ✅ Professional design
- ✅ Mobile responsive

Share your data room URL with investors and start receiving access requests!

