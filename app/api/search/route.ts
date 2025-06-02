import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/services/aiService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, userId } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    console.log(`🔍 Search request: "${query}" from user: ${userId}`);

    // Use the new simplified search-only approach
    const products = await aiService.searchProducts(query);

    // Generate a searchId for the frontend
    const searchId = `search_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    return NextResponse.json({
      success: true,
      products,
      query,
      timestamp: new Date().toISOString(),
      count: products.length,
      searchId
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Search failed. Please try again.',
        products: [],
        count: 0
      }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  // Redirect GET requests to POST for consistency
  return NextResponse.json({
    message: 'Use POST method for search requests',
    example: {
      method: 'POST',
      body: { query: query }
    }
  }, { status: 405 });
} 