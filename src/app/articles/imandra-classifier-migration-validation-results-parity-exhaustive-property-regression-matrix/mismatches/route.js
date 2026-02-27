import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const mismatchPath = path.resolve(
      process.cwd(),
      '../haem.io-Imandra/parallel_tests/artifacts/latest_mismatches.json'
    );
    const contents = await readFile(mismatchPath, 'utf8');
    return new Response(contents, {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      status: 200,
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Unable to load latest_mismatches.json',
        detail: String(error),
      },
      { status: 500 }
    );
  }
}
