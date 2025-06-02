import { NextResponse } from 'next/server';

export async function GET() {
  const envStatus = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Set (starts with: ' + process.env.OPENAI_API_KEY.substring(0, 10) + '...)' : 'Not set',
    GOOGLE_CUSTOM_SEARCH_API_KEY: process.env.GOOGLE_CUSTOM_SEARCH_API_KEY ? 'Set (starts with: ' + process.env.GOOGLE_CUSTOM_SEARCH_API_KEY.substring(0, 10) + '...)' : 'Not set',
    GOOGLE_CUSTOM_SEARCH_ENGINE_ID: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID ? 'Set: ' + process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID : 'Not set',
    SERPAPI_KEY: process.env.SERPAPI_KEY ? 'Set (starts with: ' + process.env.SERPAPI_KEY.substring(0, 10) + '...)' : 'Not set',
    FIRECRAWL_API_KEY: process.env.FIRECRAWL_API_KEY ? 'Set (starts with: ' + process.env.FIRECRAWL_API_KEY.substring(0, 10) + '...)' : 'Not set',
    JINA_API_KEY: process.env.JINA_API_KEY ? 'Set (starts with: ' + process.env.JINA_API_KEY.substring(0, 10) + '...)' : 'Not set',
  };

  return NextResponse.json({
    message: 'Environment Variables Status',
    env: envStatus
  });
} 