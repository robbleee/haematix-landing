import { NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

const teamMembers = [
  {
    name: "Robert Lee",
    title: "CEO & Co-Founder",
    bio: [
      "Robert leads company strategy, IP, and regulatory affairs. After being diagnosed with Burkitt's Lymphoma at 19, he graduated from the University of Manchester with a BSc in Computer Science and built his career in FinTech at the London Stock Exchange Group and FlexTrade, where he specialised in building and testing high-frequency algorithmic trading platforms.",
      "Drawing on this technical background, Robert developed the initial concept for Haem.io's novel hybrid AI framework that combines AI-driven data extraction with a deterministic logic engine. He brought this concept to Dr. John Burthem, and together with Dr. Luke Carter-Brzezinski and the technical team, they developed the platform into the production-grade system it is today. Robert manages the company's intellectual property portfolio and oversees the regulatory pathway to UKCA/CE marking as a Class IIa medical device."
    ]
  },
  {
    name: "Dr. Daniel Clarke",
    title: "CTO & Co-Founder",
    bio: [
      "Dr. Clarke leads the technical architecture and data science strategy for Haem.io. He holds both a Master's degree and a PhD in Physics from the University of Manchester, where his research at CERN focused on analysing complex data from large-scale international experiments.",
      "Following his PhD, Dr. Clarke joined the UK Civil Service as a statistician, where he applied AI and data science to support high-frequency government decision-making. He has extensive experience in building scalable, production-ready solutions on cloud platforms to extract actionable insights from complex datasets.",
      "A long-time friend of Robert, he was a key early contributor to the development of Haem.io's LLM and data extraction strategy, bringing a first-principles approach to building secure and robust systems."
    ]
  },
  {
    name: "Dr. John Burthem",
    title: "Co-CMO & Co-Founder",
    bio: [
      "Dr. Burthem is a Fellow of the Royal College of Pathologists (UK) and a Fellow of the Royal College of Physicians (UK), bringing decades of clinical leadership as a senior NHS consultant at Manchester Foundation Trust (MFT).",
      "He leads the Regional Diagnostic Service for Haematological Malignancies in Manchester, one of the UK's foremost specialist centres. With over 50 peer-reviewed publications, he is a nationally recognised expert in the field.",
      "Dr. Burthem has extensive experience in managing large research projects and IT-based commercial partnerships, including work with UK NEQAS, where he leads the digital Special Advisory Group. As a co-inventor of Haem.io's clinical logic, his deep domain expertise and extensive national network are foundational to the company's credibility and go-to-market strategy."
    ]
  },
  {
    name: "Dr. Luke Carter-Brzezinski",
    title: "Co-CMO & Co-Founder",
    bio: [
      "Dr. Carter-Brzezinski is a Consultant Haematologist at MFT's Regional Diagnostic Service and a Fellow of the Royal College of Pathologists. His experience spans a Diagnostic Fellowship in Haematology at Manchester and clinical roles across the UK, giving him a deep, practical understanding of the day-to-day challenges of patient care and diagnostics.",
      "Dr. Carter-Brzezinski provides the critical link between Haem.io's technology and the end-user clinician. His active clinical practice ensures the platform is built to solve real-world workflow problems.",
      "He has leveraged his national and international roles within the British Society of Haematology to lead the initial presentations of Haem.io to the UK's key opinion leaders, successfully establishing strong relationships with collaborators, industry partners, and funding bodies."
    ]
  }
];

export async function GET() {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Header
    doc.setFillColor(0, 150, 136);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('Haem.io', margin, 15);
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.text('The Founding Team', margin, 25);

    yPosition = 50;

    // Team members
    teamMembers.forEach((member, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = margin;
      }

      // Name
      doc.setTextColor(0, 150, 136);
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text(member.name, margin, yPosition);
      yPosition += 7;

      // Title
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(12);
      doc.setFont(undefined, 'italic');
      doc.text(member.title, margin, yPosition);
      yPosition += 10;

      // Bio paragraphs
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');

      member.bio.forEach(paragraph => {
        const lines = doc.splitTextToSize(paragraph, maxWidth);
        
        // Check if paragraph fits on current page
        if (yPosition + (lines.length * 5) > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }

        doc.text(lines, margin, yPosition);
        yPosition += (lines.length * 5) + 5;
      });

      yPosition += 10; // Space between team members
    });

    // Footer on last page
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Haem.io - AI-Powered Haematological Diagnostics', pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('www.haem.io', pageWidth / 2, pageHeight - 5, { align: 'center' });

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Haemio-Founding-Team.pdf"',
      },
    });

  } catch (error) {
    console.error('Error generating team PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate team PDF' },
      { status: 500 }
    );
  }
}

