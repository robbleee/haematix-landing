import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const { filename } = params;
    
    // Security check: only allow .md files and prevent directory traversal
    if (!filename.endsWith('.md') || filename.includes('..')) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }

    // Construct the path to the markdown file
    const docsPath = path.join(process.cwd(), 'src', 'app', 'docs', filename);
    
    // Check if file exists
    try {
      await fs.access(docsPath);
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read the file content
    const content = await fs.readFile(docsPath, 'utf8');
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error serving documentation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 