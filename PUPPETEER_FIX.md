# Fixing Puppeteer/Chrome Issue in Production

## Problem
The financial projections PDF generation is failing in production with:
```
Could not find Chrome (ver. 141.0.7390.78)
```

This happens because Chrome isn't installed in the production serverless environment.

## Solution 1: Install Chrome During Build (Recommended for Vercel)

### Step 1: Update package.json
I've already added a `postinstall` script that will attempt to install Chrome. However, for Vercel specifically, we need to ensure Chrome is available.

### Step 2: Add Environment Variable in Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false`
3. This ensures Puppeteer downloads Chrome during build

### Step 3: Update Build Command (if needed)
If the postinstall script doesn't work, you can add a custom build command in Vercel:
1. Go to Settings → General → Build & Development Settings
2. Override Build Command: `npm run postinstall && npm run build`

## Solution 2: Use Alternative PDF Generation (Fallback)

If Puppeteer continues to have issues in production, we can convert the financials PDF to use `jsPDF` (like the team PDF). This would be more reliable in serverless environments but requires rewriting the HTML/CSS to jsPDF format.

## Solution 3: Use External PDF Service (Alternative)

Consider using a service like:
- **PDFShift** (API-based PDF generation)
- **Browserless.io** (Managed Puppeteer service)
- **Playwright Cloud** (Managed browser automation)

## Immediate Fix Applied

I've updated the code to:
1. ✅ Add production-friendly Puppeteer launch arguments
2. ✅ Improve error handling with helpful messages
3. ✅ Add postinstall script to install Chrome
4. ✅ Create vercel.json with proper function timeout

## Testing the Fix

After deploying:

1. **Test locally first:**
   ```bash
   npm install  # This should install Chrome
   npm run dev
   # Visit http://localhost:3000/api/generate-financials-pdf
   ```

2. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Fix Puppeteer Chrome installation for production"
   git push
   ```

3. **Test in production:**
   - Visit: `https://your-domain.vercel.app/api/generate-financials-pdf`
   - Should return PDF or helpful error message

## If Still Not Working

### Option A: Check Vercel Logs
1. Go to Vercel Dashboard → Deployments → Latest deployment
2. Click "Runtime Logs"
3. Look for Chrome installation errors

### Option B: Manual Chrome Installation
Add this to your `vercel.json`:
```json
{
  "buildCommand": "npx puppeteer browsers install chrome && npm run build"
}
```

### Option C: Use Docker (if not on Vercel)
If deploying to Railway/Docker, add to Dockerfile:
```dockerfile
RUN apt-get update && apt-get install -y \
    chromium \
    && rm -rf /var/lib/apt/lists/*
```

## Current Status

✅ Code updated with better error handling
✅ Postinstall script added
✅ Vercel configuration added
⏳ **Next step:** Deploy and test

## Monitoring

After deployment, check:
- Vercel build logs for Chrome installation
- Runtime logs for PDF generation errors
- Test the `/api/generate-financials-pdf` endpoint

If errors persist, we can implement Solution 2 (jsPDF conversion) as a fallback.

