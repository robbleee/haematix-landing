import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { Readable } from 'stream';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    
    // List of PDFs to include in the ZIP
    const pdfFiles = [
      { path: 'Haem.io-pitch.pdf', name: 'Haemio-Investor-Pitch.pdf' },
      { path: 'investment-summary.pdf', name: 'Investment-Summary.pdf' },
      { path: 'Charles-craddock-LOI.pdf', name: 'Letter-Prof-Charles-Craddock.pdf' },
      { path: 'John-chadwick-LOS-christie.pdf', name: 'Letter-Dr-John-Chadwick.pdf' },
      { path: 'Tom-coates-LOS-royal-devon.pdf', name: 'Letter-Dr-Tom-Coats.pdf' },
      { path: 'cahalin-LOS-blackpool.pdf', name: 'Letter-Dr-Cahalin.pdf' },
    ];

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

