const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('Starting PDF generation...');
  
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage();
  
  const htmlPath = path.join(__dirname, 'use-of-funds-template.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });
  
  await page.pdf({
    path: path.join(__dirname, 'public', 'use-of-funds.pdf'),
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  });
  
  console.log('PDF generated successfully: public/use-of-funds.pdf');
  
  await browser.close();
}

generatePDF().catch(error => {
  console.error('Error generating PDF:', error);
  process.exit(1);
});

