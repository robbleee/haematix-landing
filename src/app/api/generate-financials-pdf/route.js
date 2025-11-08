import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    // Serve the static PDF file instead of generating dynamically
    const publicDir = path.join(process.cwd(), 'public');
    const pdfPath = path.join(publicDir, 'Haemio-Financial-Projections.pdf');
    
    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json(
        { 
          error: 'PDF not found', 
          message: 'Financial projections PDF has not been generated. Please run: node scripts/generate-financials-pdf.js'
        },
        { status: 404 }
      );
    }
    
    const pdfBuffer = fs.readFileSync(pdfPath);
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Haemio-Financial-Projections.pdf"',
      },
    });
    
  } catch (error) {
    console.error('Error serving financial projections PDF:', error);
    return NextResponse.json(
      { 
        error: 'Failed to serve PDF', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
