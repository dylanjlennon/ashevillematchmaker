import { NextRequest, NextResponse } from 'next/server';
import { D1Database } from '@cloudflare/workers-types';
import { getNeighborhoods } from '../../lib/db';

interface Env {
  DB: D1Database;
}

export async function GET(
  request: NextRequest,
  { env }: { env: Env }
) {
  try {
    // Get all neighborhoods for comparison
    const neighborhoods = await getNeighborhoods(env.DB);
    
    // Get neighborhood IDs from query params
    const ids = request.nextUrl.searchParams.get('ids')?.split(',').map(id => parseInt(id)) || [];
    
    if (ids.length === 0) {
      return NextResponse.json({ error: 'No neighborhood IDs provided' }, { status: 400 });
    }
    
    // Filter neighborhoods by IDs
    const selectedNeighborhoods = neighborhoods.filter(n => ids.includes(n.id));
    
    return NextResponse.json({ neighborhoods: selectedNeighborhoods });
  } catch (error) {
    console.error('Error comparing neighborhoods:', error);
    return NextResponse.json({ error: 'Failed to compare neighborhoods' }, { status: 500 });
  }
}
