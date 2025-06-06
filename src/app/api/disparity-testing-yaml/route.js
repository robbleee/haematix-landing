import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'testing-stats', 'dispaarity-testing.json');
    
    // Check if file exists, if not return empty structure
    if (!fs.existsSync(filePath)) {
      const emptyStructure = {
        test_run_metadata: {
          timestamp: new Date().toISOString(),
          total_disparity_cases: 0,
          description: 'Comparative testing between WHO 2022 and ICC 2022 classifications'
        },
        disparity_test_cases: []
      };
      return NextResponse.json(emptyStructure);
    }

    const jsonContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading disparity testing JSON:', error);
    return NextResponse.json({ error: 'Failed to load disparity testing data' }, { status: 500 });
  }
} 