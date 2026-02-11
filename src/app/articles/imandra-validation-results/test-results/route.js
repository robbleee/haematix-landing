import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const base = path.resolve(process.cwd(), '../haem.io-Imandra/parallel_tests');
    const [resultsRaw, vectorsRaw] = await Promise.all([
      readFile(path.join(base, 'test_results.json'), 'utf8'),
      readFile(path.join(base, 'test_vectors.json'), 'utf8'),
    ]);

    const results = JSON.parse(resultsRaw);
    const vectors = JSON.parse(vectorsRaw);

    /* Build lookup: vector id -> input fields */
    const vectorMap = {};
    for (const v of vectors) {
      vectorMap[v.id] = {
        input: v.input,
        python_input: v.python_input,
      };
    }

    /* Attach input to each result row */
    const enriched = (results.all_results || []).map((r) => {
      const vec = vectorMap[r.test_id];
      return {
        ...r,
        vector_input: vec?.input ?? null,
      };
    });

    const payload = { ...results, all_results: enriched };

    return new Response(JSON.stringify(payload), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      status: 200,
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Unable to load test data',
        detail: String(error),
      },
      { status: 500 }
    );
  }
}
