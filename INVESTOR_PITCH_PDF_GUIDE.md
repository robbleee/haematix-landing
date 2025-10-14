# Converting Your Investor Pitch to PDF - Complete Guide

This guide explains all the best methods for converting your `/investors` pitch page into professional PDF documents.

## 🚀 Quick Start (Recommended)

### Method 1: Browser Print to PDF (Already Set Up!)
**Best for:** Quick, high-quality PDFs with no additional setup

Your pitch already has comprehensive print styles built-in. Simply:

1. Navigate to **http://localhost:3000/investors**
2. Press **`Ctrl+P`** (Windows/Linux) or **`Cmd+P`** (Mac)
3. In the print dialog:
   - **Destination:** Save as PDF
   - **Layout:** Landscape (recommended)
   - **Paper size:** A4 or Letter
   - **Margins:** Default
   - **Background graphics:** ✅ **Enable** (to preserve colors and gradients)
   - **Headers and footers:** ❌ Disable
4. Click **Save**

**✨ What's Included:**
- All 14 slides automatically formatted as separate pages
- Navigation buttons hidden
- Professional page breaks
- Preserved branding, colors, and gradients
- Optimized typography and spacing

---

### Method 2: Download PDF Button (Just Added!)
**Best for:** One-click PDF generation for users

I've just added a **"📄 Download PDF"** button to your pitch page. 

**How to use:**
1. Start your dev server: `npm run dev`
2. Navigate to `/investors`
3. Click the **"📄 Download PDF"** button in the top-right corner
4. Wait for the PDF to generate (takes 5-10 seconds)
5. PDF automatically downloads as `Haemio-Investor-Pitch.pdf`

**Features:**
- Landscape A4 format optimized for pitch decks
- High-quality images (98% quality, 2x scale)
- Automatic page breaks
- No browser dialog - direct download
- Generated filename: `Haemio-Investor-Pitch.pdf`

---

## 🎯 Advanced Options

### Method 3: Puppeteer (Automated PDF Generation)
**Best for:** Automated generation, CI/CD pipelines, batch processing

**Installation:**
```bash
npm install puppeteer
```

**Create a PDF generation script** (`scripts/generate-pitch-pdf.js`):

```javascript
const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Navigate to your local development server
  await page.goto('http://localhost:3000/investors', {
    waitUntil: 'networkidle0',
    timeout: 60000
  });
  
  // Wait for content to load
  await page.waitForSelector('.pitchDeck', { timeout: 10000 });
  
  // Generate PDF
  const pdfPath = path.join(__dirname, '../output/Haemio-Investor-Pitch.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
    preferCSSPageSize: true
  });
  
  console.log(`✅ PDF generated: ${pdfPath}`);
  await browser.close();
}

generatePDF().catch(console.error);
```

**Usage:**
```bash
# 1. Start your dev server
npm run dev

# 2. In another terminal, run the script
node scripts/generate-pitch-pdf.js
```

**Add to package.json:**
```json
{
  "scripts": {
    "generate:pdf": "node scripts/generate-pitch-pdf.js"
  }
}
```

---

### Method 4: Playwright (Cross-Browser Testing)
**Best for:** Testing PDF output across different browsers

**Installation:**
```bash
npm install -D @playwright/test
```

**Create script** (`scripts/generate-pitch-pdf-playwright.js`):

```javascript
const { chromium } = require('playwright');
const path = require('path');

async function generatePDF(browser = 'chromium') {
  const browserInstance = await chromium.launch();
  const page = await browserInstance.newPage();
  
  await page.goto('http://localhost:3000/investors', {
    waitUntil: 'networkidle'
  });
  
  const pdfPath = path.join(__dirname, '../output/Haemio-Pitch-Playwright.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  });
  
  console.log(`✅ PDF generated: ${pdfPath}`);
  await browserInstance.close();
}

generatePDF();
```

---

### Method 5: Professional PDF Services
**Best for:** Highest quality, consistent output, production use

#### Option A: PDFShift API
```javascript
const fetch = require('node-fetch');

async function generateWithPDFShift() {
  const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source: 'https://your-deployed-site.com/investors',
      landscape: true,
      format: 'A4',
      margin: '0.5in',
      print_background: true
    })
  });
  
  const pdf = await response.buffer();
  require('fs').writeFileSync('pitch.pdf', pdf);
}
```

#### Option B: DocRaptor
```javascript
const DocRaptor = require('docraptor');

const docraptor = new DocRaptor.DocApi();
docraptor.apiClient.authentications['basicAuth'].username = 'YOUR_API_KEY';

const doc = {
  test: true,
  document_url: 'https://your-site.com/investors',
  name: 'haemio-pitch.pdf',
  document_type: 'pdf',
  javascript: true,
  prince_options: {
    media: 'print'
  }
};

docraptor.createDoc(doc).then(response => {
  require('fs').writeFileSync('pitch.pdf', response);
});
```

---

## 📊 Comparison Table

| Method | Quality | Setup | Speed | Cost | Best For |
|--------|---------|-------|-------|------|----------|
| Browser Print | ⭐⭐⭐⭐⭐ | None | Instant | Free | Quick personal use |
| Download Button | ⭐⭐⭐⭐ | ✅ Done | 5-10s | Free | Sharing with others |
| Puppeteer | ⭐⭐⭐⭐⭐ | Medium | 10-15s | Free | Automation |
| Playwright | ⭐⭐⭐⭐⭐ | Medium | 10-15s | Free | Cross-browser testing |
| PDF Services | ⭐⭐⭐⭐⭐ | Low | 5-30s | $$ | Production, high volume |

---

## 🎨 Customizing PDF Output

### Adjust Page Breaks
Edit `/Users/robertlee/Desktop/ws/haem.io/haemio-landing-page/src/app/investors/investors.module.css`:

```css
/* Force page break before specific slide */
.slide[data-slide-id="7"] {
  page-break-before: always;
}

/* Prevent page break inside an element */
.teamGrid {
  page-break-inside: avoid;
}
```

### Change PDF Margins
For the Download PDF button, edit the `generatePDF` function in `page.jsx`:

```javascript
const opt = {
  margin: [0.75, 0.75], // [top/bottom, left/right] in inches
  // ... rest of config
};
```

### Change Page Orientation
```javascript
jsPDF: { 
  orientation: 'portrait', // or 'landscape'
  // ... rest of config
}
```

---

## 🐛 Troubleshooting

### Issue: Colors/Backgrounds Don't Appear
**Solution:** Enable "Background graphics" in print settings

### Issue: PDF is Too Long/Short
**Solution:** 
1. Check your browser zoom level (should be 100%)
2. Adjust margins in print settings
3. Use landscape orientation for pitch decks

### Issue: Download PDF Button Doesn't Work
**Solution:**
```bash
# Reinstall the dependency
npm install html2pdf.js

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Text is Cut Off
**Solution:** Adjust margins in the `generatePDF` function:
```javascript
margin: [0.25, 0.25], // Smaller margins
```

---

## 📝 Tips for Best Results

1. **Use Browser Print for presentations** - Highest quality, most control
2. **Use Download Button for sharing** - Easy for non-technical users
3. **Use Puppeteer for automated builds** - Generate PDFs on deploy
4. **Test before important meetings** - Always generate a test PDF
5. **Check all slides** - Scroll through the generated PDF to verify layout
6. **Optimize images** - Large images increase PDF file size
7. **Use vector graphics** - SVGs scale better than raster images

---

## 🚀 Next Steps

### For Investors/Sharing
1. Generate PDF using Browser Print or Download Button
2. Upload to Google Drive, Dropbox, or your preferred service
3. Share link with investors

### For Production/Deployment
1. Deploy your Next.js app (Vercel, Netlify, etc.)
2. Use Puppeteer script to generate PDF on deploy
3. Host PDF on CDN or static file server
4. Update investor materials with direct PDF link

### Creating Multiple Versions
You might want different PDFs for different audiences:

```javascript
// Create separate pitch decks
const pitchVersions = {
  full: pitchSlides, // All 14 slides
  executive: pitchSlides.filter(s => [1, 2, 5, 7, 13].includes(s.id)), // 5 slides
  technical: pitchSlides.filter(s => [1, 3, 4, 10, 11].includes(s.id)) // Technical focus
};
```

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Verify your dev server is running (`npm run dev`)
3. Try the Browser Print method as a fallback
4. Check this guide's troubleshooting section

---

**Your pitch is now PDF-ready! 🎉**

The Download PDF button is live at `/investors` - just click and go!


