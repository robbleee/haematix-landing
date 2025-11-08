import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { Readable } from 'stream';

export async function GET(request) {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    
    // List of PDFs to include in the ZIP (organized by location)
    const pdfFiles = [
      { path: 'Haem.io-pitch.pdf', name: 'Haemio-Investor-Pitch.pdf' },
      { path: 'investment-summary.pdf', name: 'Investment-Summary.pdf' },
      { path: 'traction-and-market-opportunity.pdf', name: 'Traction-and-Market-Opportunity.pdf' },
      { path: 'use-of-funds.pdf', name: 'Use-of-Funds.pdf' },
      { path: 'regulatory-strategy-and-pathway.pdf', name: 'Regulatory-Strategy-and-Pathway.pdf' },
      { path: 'Haemio-Financial-Projections.pdf', name: 'Haemio-Financial-Projections.pdf' },
      { path: 'Charles-craddock-LOI.pdf', name: 'Letters-of-Support/Letter-Prof-Charles-Craddock.pdf' },
      { path: 'John-chadwick-LOS-christie.pdf', name: 'Letters-of-Support/Letter-Dr-John-Chadwick.pdf' },
      { path: 'Tom-coates-LOS-royal-devon.pdf', name: 'Letters-of-Support/Letter-Dr-Tom-Coats.pdf' },
      { path: 'cahalin-LOS-blackpool.pdf', name: 'Letters-of-Support/Letter-Dr-Cahalin.pdf' },
    ];
    
    // Generate team PDF dynamically
    let teamPdfBuffer = null;
    try {
      const baseUrl = request.headers.get('host') || 'localhost:3000';
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      const teamPdfResponse = await fetch(`${protocol}://${baseUrl}/api/generate-team-pdf`);
      if (teamPdfResponse.ok) {
        teamPdfBuffer = Buffer.from(await teamPdfResponse.arrayBuffer());
      }
    } catch (error) {
      console.error('Error fetching team PDF:', error);
    }

    // Create a new archiver instance
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    // Create a readable stream from the archive
    const stream = new ReadableStream({
      start(controller) {
        archive.on('data', (chunk) => controller.enqueue(chunk));
        archive.on('end', () => controller.close());
        archive.on('error', (err) => controller.error(err));

        // Add each PDF to the archive
        pdfFiles.forEach(({ path: filePath, name }) => {
          const fullPath = path.join(publicDir, filePath);
          if (fs.existsSync(fullPath)) {
            archive.file(fullPath, { name });
          } else {
            console.warn(`File not found: ${fullPath}`);
          }
        });

        // Add team PDF if generated successfully
        if (teamPdfBuffer) {
          archive.append(teamPdfBuffer, { name: 'Haemio-Founding-Team.pdf' });
        }

        // Finalize the archive
        archive.finalize();
      }
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="Haemio-DataRoom-Documents.zip"',
      },
    });

  } catch (error) {
    console.error('Error creating ZIP:', error);
    return NextResponse.json(
      { error: 'Failed to create ZIP file' },
      { status: 500 }
    );
  }
}

