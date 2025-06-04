import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'src/app/testing-stats/testing.yaml');
    const fileContent = readFileSync(filePath, 'utf8');
    
    return new Response(fileContent, {
      headers: {
        'Content-Type': 'text/yaml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error reading YAML file:', error);
    return new Response('Error reading test data', { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
} 