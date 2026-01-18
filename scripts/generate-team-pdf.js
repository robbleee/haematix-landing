const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Helper function to convert image to base64
function imageToBase64(imagePath) {
  try {
    const fullPath = path.join(__dirname, '../public', imagePath);
    if (fs.existsSync(fullPath)) {
      const imageBuffer = fs.readFileSync(fullPath);
      const ext = path.extname(fullPath).toLowerCase();
      let mimeType = 'image/png';
      if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
      return `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
    }
    return null;
  } catch (error) {
    console.warn(`Warning: Could not load image ${imagePath}:`, error.message);
    return null;
  }
}

const teamMembers = [
  {
    name: 'Robert Lee',
    title: 'Project Lead',
    image: '/profile-pics/robbie.png',
    bio: [
      "Robert leads software development, regulatory strategy, and research coordination. After being diagnosed with Burkitt's Lymphoma at 19, he graduated from the University of Manchester with a BSc in Computer Science and built his career in FinTech at the London Stock Exchange Group and FlexTrade, where he specialised in building and testing high-frequency algorithmic trading platforms.",
      "Drawing on this technical background, Robert developed the initial concept for Haem.io's novel hybrid AI framework that combines AI-driven data extraction with a deterministic logic engine. He brought this concept to Dr. John Burthem, and together with Dr. Luke Carter-Brzezinski and the technical team, they developed the platform into the production-grade system it is today. Robert manages the project's intellectual property portfolio and oversees the regulatory pathway to UKCA/CE marking as a Class IIa medical device."
    ]
  },
  {
    name: 'Dr. Daniel Clarke',
    title: 'Technical Lead',
    image: '/profile-pics/danny.png',
    bio: [
      "Dr. Clarke leads the technical architecture and data science strategy for Haem.io. He holds both a Master's degree and a PhD in Physics from the University of Manchester, where his research at CERN focused on analysing complex data from large-scale international experiments.",
      "Following his PhD, Dr. Clarke joined the UK Civil Service as a statistician, where he applied AI and data science to support high-frequency government decision-making. He has extensive experience in building scalable, production-ready solutions on cloud platforms to extract actionable insights from complex datasets. A long-time friend of Robert, he was a key early contributor to the development of Haem.io's LLM and data extraction strategy, bringing a first-principles approach to building secure and robust systems."
    ]
  },
  {
    name: 'Dr. John Burthem',
    title: 'Principal Clinical Investigator',
    image: '/profile-pics/john.png',
    bio: [
      "Dr. Burthem is a Fellow of the Royal College of Pathologists (UK) and a Fellow of the Royal College of Physicians (UK), bringing decades of clinical leadership as a senior NHS consultant at Manchester Foundation Trust (MFT). He leads the Regional Diagnostic Service for Haematological Malignancies in Manchester, one of the UK's foremost specialist centres.",
      "With over 50 peer-reviewed publications, he is a nationally recognised expert in the field. Dr. Burthem has extensive experience in managing large research projects and IT-based partnerships, including work with UK NEQAS, where he leads the digital Special Advisory Group. As a co-inventor of Haem.io's clinical logic, his deep domain expertise and extensive national network are foundational to the project's clinical validation and dissemination strategy."
    ]
  },
  {
    name: 'Dr. Luke Carter-Brzezinski',
    title: 'Clinical Co-Investigator',
    image: '/profile-pics/luke.png',
    bio: [
      "Dr. Carter-Brzezinski is a Consultant Haematologist at MFT's Regional Diagnostic Service and a Fellow of the Royal College of Pathologists. His experience spans a Diagnostic Fellowship in Haematology at Manchester and clinical roles across the UK, giving him a deep, practical understanding of the day-to-day challenges of patient care and diagnostics.",
      "Dr. Carter-Brzezinski provides the critical link between Haem.io's technology and the end-user clinician. His active clinical practice ensures the platform is built to solve real-world workflow problems. He has leveraged his national and international roles within the British Society of Haematology to lead the initial presentations of Haem.io to the UK's key opinion leaders, establishing strong relationships with collaborators and research partners."
    ]
  }
];

// Convert images to base64 before generating HTML
const teamMembersWithImages = teamMembers.map(member => ({
  ...member,
  imageBase64: imageToBase64(member.image)
}));

// Get the HTML content
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Georgia, 'Times New Roman', serif;
      line-height: 1.7;
      color: #000000;
      background: white;
      padding: 50px 60px;
    }
    
    .header {
      margin-bottom: 50px;
      padding-bottom: 20px;
      border-bottom: 3px solid #009688;
    }
    
    .header h1 {
      font-size: 42px;
      color: #009688;
      margin-bottom: 8px;
      font-weight: 700;
    }
    
    .header p {
      font-size: 16px;
      color: #666666;
      font-style: italic;
    }
    
    .team-member {
      margin-bottom: 60px;
      page-break-inside: avoid;
      padding-bottom: 40px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .team-member:last-child {
      border-bottom: none;
    }
    
    .member-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 25px;
      gap: 30px;
    }
    
    .member-photo {
      width: 150px;
      height: 150px;
      border-radius: 8px;
      object-fit: cover;
      border: 3px solid #009688;
      flex-shrink: 0;
    }
    
    .member-info {
      flex: 1;
    }
    
    .member-name {
      font-size: 28px;
      color: #009688;
      margin-bottom: 6px;
      font-weight: 700;
    }
    
    .member-title {
      font-size: 18px;
      color: #666666;
      font-style: italic;
      margin-bottom: 20px;
    }
    
    .member-bio {
      font-size: 14px;
      color: #000000;
      line-height: 1.8;
      text-align: justify;
    }
    
    .member-bio p {
      margin-bottom: 16px;
    }
    
    .member-bio p:last-child {
      margin-bottom: 0;
    }
    
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #009688;
      text-align: center;
      font-size: 11px;
      color: #666666;
      line-height: 1.6;
    }
    
    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Haem.io</h1>
    <p>The Research Team</p>
    <p style="font-size: 14px; margin-top: 8px; color: #999999;">Expertise in AI, clinical haematology, and healthcare technology</p>
  </div>

  ${teamMembersWithImages.map((member, index) => {
    const imageSrc = member.imageBase64 || '';
    return `
    <div class="team-member">
      <div class="member-header">
        ${imageSrc ? `<img src="${imageSrc}" alt="${member.name}" class="member-photo" />` : '<div class="member-photo" style="background: #e0e0e0; display: flex; align-items: center; justify-content: center; color: #999;">Photo</div>'}
        <div class="member-info">
          <h2 class="member-name">${member.name}</h2>
          <p class="member-title">${member.title}</p>
        </div>
      </div>
      <div class="member-bio">
        ${member.bio.map(paragraph => `<p>${paragraph}</p>`).join('')}
      </div>
    </div>
  `;
  }).join('')}

  <div class="footer">
    <p><strong style="color: #009688;">Haem.io Ltd</strong></p>
    <p>Company Number 16528517</p>
    <p>73 Meliden Road, Prestatyn, LL19 8RH, United Kingdom</p>
    <p style="margin-top: 12px;">www.haem.io</p>
  </div>
</body>
</html>
`;

async function generatePDF() {
  let browser = null;
  
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2,
    });

    console.log('Setting content...');
    await page.setContent(htmlContent, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait a bit for images to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });

    const outputPath = path.join(__dirname, '../public/Haemio-Team-Profiles.pdf');
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`✅ PDF generated successfully: ${outputPath}`);
    console.log(`   File size: ${(pdfBuffer.length / 1024).toFixed(2)} KB`);
    
    await browser.close();
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    if (browser) {
      await browser.close();
    }
    process.exit(1);
  }
}

generatePDF();

