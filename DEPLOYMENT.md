# 🚀 Vercel Deployment Guide for Snapi

## Current Issue
Getting 404 errors on Vercel deployment - this guide will fix them!

## Step-by-Step Fix

### 1. Environment Variables Setup (CRITICAL)
Your app requires API keys to function. In Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** tab
3. Click **Environment Variables** in the sidebar
4. Add these variables:

```
OPENAI_API_KEY=your_actual_openai_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_CX_ID=your_google_custom_search_id_here
SERPAPI_KEY=your_serpapi_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
JINA_API_KEY=your_jina_api_key_here
BING_SUBSCRIPTION_KEY=your_bing_search_key_here
```

**Note**: At minimum, you MUST set `OPENAI_API_KEY` for the app to work.

### 2. Redeploy After Environment Variables
1. After adding environment variables, click **Deployments** tab
2. Find your latest deployment
3. Click the **3 dots menu** → **Redeploy**
4. Check "Use existing Build Cache" and click **Redeploy**

### 3. Check Build Logs
If still getting 404s:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **View Build Logs**
4. Look for any errors in the build process

### 4. Common Fixes

#### A. If getting "OPENAI_API_KEY is required" error:
- Make sure you added the environment variable correctly
- The key should start with `sk-` for OpenAI
- No extra spaces or quotes

#### B. If getting build errors:
The `vercel.json` file should handle most issues, but if needed:
1. Make sure all dependencies are in `package.json`
2. Check that TypeScript errors are ignored (already configured)

#### C. If routing issues:
- The app uses Next.js App Router
- Routes should work automatically: `/`, `/search`, `/results`, etc.

### 5. Test URLs After Deployment
Once deployed successfully, test these URLs:
- `https://your-app.vercel.app/` - Landing page
- `https://your-app.vercel.app/search` - Search page  
- `https://your-app.vercel.app/api/search` - Should return method not allowed (POST only)

### 6. Debug Mode
If still having issues, temporarily add this environment variable in Vercel:
```
DEBUG=1
```

This will provide more detailed error logs.

## Expected Behavior After Fix
- Landing page loads correctly
- Search functionality works
- Real product results from JBL, Adidas, Amazon, etc.
- Response times under 15 seconds

## Need Help?
If you're still getting 404s after following these steps:
1. Check the Vercel build logs for specific error messages
2. Ensure your GitHub repo is up to date
3. Verify the OpenAI API key is valid and has credits
4. Try a fresh deployment from the GitHub repo 