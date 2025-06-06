import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'src/app/testing-stats/dispaarity-testing.json');
    const fileContent = readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    
    return new Response(JSON.stringify(jsonData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return new Response('Error reading disparity data', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
} 