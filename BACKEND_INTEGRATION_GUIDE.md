# Snapi MVP Backend Integration Guide

## Overview

This document provides comprehensive guidance for backend developers to integrate with the Snapi MVP frontend and eliminate all mock data to create a fully functional AI-powered shopping assistant.

## Table of Contents

1. [Frontend Architecture Overview](#frontend-architecture-overview)
2. [Current Mock Data Points](#current-mock-data-points)
3. [Required Backend APIs](#required-backend-apis)
4. [Database Schema](#database-schema)
5. [AI/ML Integration](#aiml-integration)
6. [External API Integrations](#external-api-integrations)
7. [Authentication & User Management](#authentication--user-management)
8. [Real-time Features](#real-time-features)
9. [Implementation Roadmap](#implementation-roadmap)
10. [Environment Variables](#environment-variables)
11. [API Documentation](#api-documentation)

---

## Frontend Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **UI Library**: ShadCN UI + Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Next.js App Router file-based routing

### Page Structure
\`\`\`
app/
├── page.tsx                    # Landing page (marketing)
├── welcome/page.tsx           # Authentication entry point
├── onboarding/
│   ├── categories/page.tsx    # Category selection
│   └── style/page.tsx         # Style preference selection
├── search/page.tsx            # Main search interface
├── results/page.tsx           # Search results display
├── product/[id]/page.tsx      # Product detail view
├── compare/page.tsx           # Product comparison
├── wishlist/page.tsx          # User wishlist
└── profile/page.tsx           # User profile & settings
\`\`\`

### Key Components
- **Animated search interface** with glassmorphism design
- **Auto-resizing textarea** for natural language queries
- **Product cards** with comparison selection
- **Price alert modals** for wishlist items
- **Bottom navigation** for mobile-first experience

---

## Current Mock Data Points

### 1. User Data
**Location**: `app/profile/page.tsx`
\`\`\`typescript
// MOCK DATA TO REPLACE
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "JD",
  membershipType: "Premium Member",
  preferences: {
    categories: ["Fashion", "Home & Garden", "Electronics"],
    styles: ["Minimalist", "Modern", "Scandinavian"]
  }
}
\`\`\`

### 2. Product Data
**Location**: `app/results/page.tsx`, `app/product/[id]/page.tsx`
\`\`\`typescript
// MOCK DATA TO REPLACE
const mockProducts = [
  {
    id: 1,
    name: "Modern Minimalist Reading Chair",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/...",
    store: "Amazon",
    rating: 4.5,
    reviews: 127,
    tags: ["Best Deal", "Popular"],
    description: "A beautifully crafted reading chair...",
    specs: {
      Material: "Premium Fabric",
      Dimensions: '32" W x 30" D x 36" H',
      "Weight Capacity": "300 lbs",
      Assembly: "Required"
    },
    features: [
      "Ergonomic design for extended comfort",
      "High-quality foam cushioning",
      // ...
    ]
  }
  // ...
]
\`\`\`

### 3. Wishlist Data
**Location**: `app/wishlist/page.tsx`
\`\`\`typescript
// MOCK DATA TO REPLACE
const mockWishlistItems = [
  {
    id: 1,
    name: "Modern Minimalist Reading Chair",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/...",
    store: "Amazon",
    priceAlert: 220,
    inStock: true
  }
  // ...
]
\`\`\`

### 4. Search Suggestions
**Location**: `app/search/page.tsx`
\`\`\`typescript
// MOCK DATA TO REPLACE
const quickExamples = [
  "Minimalist desk lamp under $60",
  "Cozy throw blanket for winter",
  "Wireless headphones for gym",
  "Modern coffee table"
]
\`\`\`

### 5. Onboarding Options
**Location**: `app/onboarding/categories/page.tsx`, `app/onboarding/style/page.tsx`
\`\`\`typescript
// MOCK DATA TO REPLACE
const categories = [
  { name: "Fashion & Apparel", icon: <Heart />, color: "from-pink-500 to-rose-500" },
  // ...
]

const styles = [
  { name: "Minimalist", icon: <Sparkles />, color: "from-gray-400 to-slate-500" },
  // ...
]
\`\`\`

---

## Required Backend APIs

### 1. Authentication APIs

#### POST `/api/auth/google`
\`\`\`typescript
// Request
{
  "idToken": "google_id_token"
}

// Response
{
  "user": {
    "id": "user_uuid",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "avatar_url",
    "isNewUser": boolean
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
\`\`\`

#### POST `/api/auth/apple`
\`\`\`typescript
// Similar structure to Google auth
\`\`\`

### 2. User Management APIs

#### GET `/api/user/profile`
\`\`\`typescript
// Response
{
  "id": "user_uuid",
  "email": "user@example.com",
  "name": "User Name",
  "avatar": "avatar_url",
  "membershipType": "free" | "premium",
  "preferences": {
    "categories": string[],
    "styles": string[],
    "priceRange": { min: number, max: number },
    "preferredStores": string[]
  },
  "createdAt": "ISO_date",
  "lastActive": "ISO_date"
}
\`\`\`

#### PUT `/api/user/preferences`
\`\`\`typescript
// Request
{
  "categories": string[],
  "styles": string[],
  "priceRange": { min: number, max: number }
}

// Response
{
  "success": boolean,
  "preferences": UpdatedPreferences
}
\`\`\`

### 3. Search & Product APIs

#### POST `/api/search`
\`\`\`typescript
// Request
{
  "query": "Find me a comfy reading chair under $300",
  "userId": "user_uuid",
  "filters": {
    "priceRange": { min: number, max: number },
    "categories": string[],
    "stores": string[],
    "rating": number
  },
  "page": number,
  "limit": number
}

// Response
{
  "products": Product[],
  "totalCount": number,
  "page": number,
  "hasMore": boolean,
  "searchId": "search_uuid", // For analytics
  "aiSummary": "AI-generated search summary",
  "suggestedFilters": Filter[]
}
\`\`\`

#### GET `/api/products/:id`
\`\`\`typescript
// Response
{
  "id": "product_uuid",
  "name": string,
  "description": string,
  "price": number,
  "originalPrice": number,
  "images": string[],
  "store": {
    "name": string,
    "logo": string,
    "affiliateUrl": string
  },
  "rating": number,
  "reviewCount": number,
  "specifications": Record<string, string>,
  "features": string[],
  "tags": string[],
  "inStock": boolean,
  "lastUpdated": "ISO_date",
  "similarProducts": Product[]
}
\`\`\`

#### POST `/api/products/compare`
\`\`\`typescript
// Request
{
  "productIds": string[],
  "userId": "user_uuid"
}

// Response
{
  "products": Product[],
  "comparison": {
    "aiSummary": string,
    "pros": Record<string, string[]>,
    "cons": Record<string, string[]>,
    "bestFor": Record<string, string>
  },
  "comparisonMatrix": ComparisonAttribute[]
}
\`\`\`

### 4. Wishlist APIs

#### GET `/api/wishlist`
\`\`\`typescript
// Response
{
  "items": WishlistItem[],
  "totalCount": number
}

interface WishlistItem {
  id: string,
  product: Product,
  addedAt: string,
  priceAlert: number | null,
  notes: string
}
\`\`\`

#### POST `/api/wishlist`
\`\`\`typescript
// Request
{
  "productId": string,
  "priceAlert": number | null
}

// Response
{
  "success": boolean,
  "item": WishlistItem
}
\`\`\`

#### PUT `/api/wishlist/:id/price-alert`
\`\`\`typescript
// Request
{
  "priceAlert": number
}

// Response
{
  "success": boolean,
  "alert": PriceAlert
}
\`\`\`

### 5. Price Tracking APIs

#### POST `/api/price-alerts`
\`\`\`typescript
// Request
{
  "productId": string,
  "targetPrice": number,
  "userId": "user_uuid"
}

// Response
{
  "alertId": "alert_uuid",
  "isActive": boolean
}
\`\`\`

#### GET `/api/price-alerts/notifications`
\`\`\`typescript
// Response
{
  "notifications": PriceAlertNotification[]
}

interface PriceAlertNotification {
  id: string,
  product: Product,
  oldPrice: number,
  newPrice: number,
  triggeredAt: string,
  isRead: boolean
}
\`\`\`

---

## Database Schema

### Users Table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  google_id VARCHAR(255) UNIQUE,
  apple_id VARCHAR(255) UNIQUE,
  membership_type VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP DEFAULT NOW()
);
\`\`\`

### User Preferences Table
\`\`\`sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  categories TEXT[] DEFAULT '{}',
  styles TEXT[] DEFAULT '{}',
  price_range_min INTEGER DEFAULT 0,
  price_range_max INTEGER DEFAULT 10000,
  preferred_stores TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Products Table
\`\`\`sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id VARCHAR(255) NOT NULL, -- Store's product ID
  name VARCHAR(500) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  store_name VARCHAR(100) NOT NULL,
  store_logo_url TEXT,
  affiliate_url TEXT NOT NULL,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  specifications JSONB DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  category VARCHAR(100),
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_price_check TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(external_id, store_name)
);
\`\`\`

### Searches Table
\`\`\`sql
CREATE TABLE searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  query TEXT NOT NULL,
  filters JSONB DEFAULT '{}',
  result_count INTEGER,
  ai_summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Wishlist Table
\`\`\`sql
CREATE TABLE wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  notes TEXT,
  added_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, product_id)
);
\`\`\`

### Price Alerts Table
\`\`\`sql
CREATE TABLE price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  target_price DECIMAL(10,2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  triggered_at TIMESTAMP,
  
  UNIQUE(user_id, product_id)
);
\`\`\`

### Price History Table
\`\`\`sql
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  price DECIMAL(10,2) NOT NULL,
  recorded_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

---

## AI/ML Integration

### 1. Natural Language Processing
**Service**: OpenAI GPT-4 or similar
**Purpose**: Parse user search queries and extract:
- Product type/category
- Price range
- Style preferences
- Specific features
- Use case scenarios

\`\`\`typescript
// Example AI prompt structure
const searchPrompt = `
Parse this shopping query and extract structured data:
Query: "${userQuery}"

Extract:
- product_type: string
- price_range: {min: number, max: number}
- style_keywords: string[]
- features: string[]
- use_case: string
- urgency: "low" | "medium" | "high"

Return as JSON.
`;
\`\`\`

### 2. Product Matching Algorithm
**Components**:
- **Semantic search** using embeddings
- **Price filtering** based on extracted range
- **Style matching** using preference weights
- **Availability filtering**
- **Rating/review scoring**

### 3. Recommendation Engine
**Features**:
- **Collaborative filtering** based on user behavior
- **Content-based filtering** using product attributes
- **Hybrid approach** combining both methods
- **Real-time personalization** based on current session

### 4. Comparison AI
**Purpose**: Generate intelligent product comparisons
\`\`\`typescript
const comparisonPrompt = `
Compare these products for a user looking for: "${originalQuery}"

Products: ${JSON.stringify(products)}

Provide:
- summary: Brief comparison overview
- pros: Key advantages of each product
- cons: Potential drawbacks
- best_for: Which product is best for specific use cases
- recommendation: Top choice with reasoning

Return as JSON.
`;
\`\`\`

---

## External API Integrations

### 1. Amazon Product Advertising API
\`\`\`typescript
// Required for product data
const amazonConfig = {
  accessKey: process.env.AMAZON_ACCESS_KEY,
  secretKey: process.env.AMAZON_SECRET_KEY,
  partnerTag: process.env.AMAZON_PARTNER_TAG,
  region: 'us-east-1'
};
\`\`\`

### 2. Walmart Open API
\`\`\`typescript
const walmartConfig = {
  apiKey: process.env.WALMART_API_KEY,
  affiliateId: process.env.WALMART_AFFILIATE_ID
};
\`\`\`

### 3. Target Affiliate API
\`\`\`typescript
const targetConfig = {
  apiKey: process.env.TARGET_API_KEY,
  affiliateId: process.env.TARGET_AFFILIATE_ID
};
\`\`\`

### 4. Price Tracking Service
**Options**:
- **Keepa API** for Amazon price history
- **Custom scraping service** with rate limiting
- **Third-party price tracking APIs**

---

## Authentication & User Management

### 1. OAuth Integration
**Google OAuth 2.0**:
\`\`\`typescript
// Frontend integration point
// File: app/welcome/page.tsx
// Replace mock navigation with actual OAuth flow

const handleGoogleSignIn = async () => {
  try {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: googleIdToken })
    });
    
    const { user, accessToken } = await response.json();
    
    // Store token and redirect
    localStorage.setItem('accessToken', accessToken);
    
    if (user.isNewUser) {
      router.push('/onboarding/categories');
    } else {
      router.push('/search');
    }
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};
\`\`\`

### 2. Session Management
**JWT Implementation**:
- **Access tokens**: 15-minute expiry
- **Refresh tokens**: 7-day expiry
- **Automatic refresh** on API calls

---

## Real-time Features

### 1. Price Alert Notifications
**Implementation**: WebSocket or Server-Sent Events
\`\`\`typescript
// Frontend integration point
// File: app/layout.tsx
// Add global notification listener

useEffect(() => {
  const eventSource = new EventSource('/api/notifications/stream');
  
  eventSource.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    
    if (notification.type === 'price_alert') {
      showToast(`Price drop alert: ${notification.product.name} is now $${notification.newPrice}!`);
    }
  };
  
  return () => eventSource.close();
}, []);
\`\`\`

### 2. Real-time Search Suggestions
**Implementation**: Debounced API calls with caching
\`\`\`typescript
// Frontend integration point
// File: app/search/page.tsx
// Replace static examples with dynamic suggestions

const [suggestions, setSuggestions] = useState([]);

useEffect(() => {
  const fetchSuggestions = debounce(async (query) => {
    if (query.length > 2) {
      const response = await fetch(`/api/search/suggestions?q=${query}`);
      const data = await response.json();
      setSuggestions(data.suggestions);
    }
  }, 300);
  
  fetchSuggestions(query);
}, [query]);
\`\`\`

---

## Implementation Roadmap

### Phase 1: Core Backend Setup (Week 1-2)
1. **Database setup** with PostgreSQL
2. **Authentication system** with Google/Apple OAuth
3. **Basic user management** APIs
4. **Product data models** and initial seeding

### Phase 2: Search & AI Integration (Week 3-4)
1. **OpenAI integration** for query parsing
2. **Basic search API** with filtering
3. **Product detail APIs**
4. **Affiliate link tracking**

### Phase 3: Advanced Features (Week 5-6)
1. **Wishlist functionality**
2. **Price tracking system**
3. **Comparison engine**
4. **Recommendation algorithm**

### Phase 4: Real-time & Optimization (Week 7-8)
1. **Price alert notifications**
2. **Real-time search suggestions**
3. **Performance optimization**
4. **Analytics integration**

---

## Environment Variables

\`\`\`bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/snapi_db
REDIS_URL=redis://localhost:6379

# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
APPLE_CLIENT_ID=your_apple_client_id
APPLE_CLIENT_SECRET=your_apple_client_secret
JWT_SECRET=your_jwt_secret

# AI Services
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORG_ID=your_openai_org_id

# Affiliate APIs
AMAZON_ACCESS_KEY=your_amazon_access_key
AMAZON_SECRET_KEY=your_amazon_secret_key
AMAZON_PARTNER_TAG=your_amazon_partner_tag

WALMART_API_KEY=your_walmart_api_key
WALMART_AFFILIATE_ID=your_walmart_affiliate_id

TARGET_API_KEY=your_target_api_key
TARGET_AFFILIATE_ID=your_target_affiliate_id

# External Services
MIXPANEL_TOKEN=your_mixpanel_token
SENTRY_DSN=your_sentry_dsn

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

---

## API Documentation

### Frontend Integration Points

#### 1. Search Page (`app/search/page.tsx`)
**Replace this function**:
\`\`\`typescript
// CURRENT: Mock search
const handleSearch = () => {
  if (query.trim()) {
    setIsSearching(true);
    setTimeout(() => {
      window.location.href = `/results?q=${encodeURIComponent(query)}`;
    }, 1500);
  }
};

// REPLACE WITH: Real API call
const handleSearch = async () => {
  if (query.trim()) {
    setIsSearching(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify({
          query: query.trim(),
          userId: getCurrentUserId(),
          filters: getActiveFilters()
        })
      });
      
      const searchResults = await response.json();
      
      // Store results in state management or pass via URL
      router.push(`/results?searchId=${searchResults.searchId}`);
    } catch (error) {
      console.error('Search failed:', error);
      setIsSearching(false);
    }
  }
};
\`\`\`

#### 2. Results Page (`app/results/page.tsx`)
**Replace mock data loading**:
\`\`\`typescript
// CURRENT: Mock products
const mockProducts = [...];

// REPLACE WITH: Real data fetching
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchResults = async () => {
    const searchId = searchParams.get('searchId');
    const query = searchParams.get('q');
    
    try {
      const response = await fetch(`/api/search/results?searchId=${searchId}&q=${query}`);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch results:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchResults();
}, [searchParams]);
\`\`\`

#### 3. Wishlist Integration
**Add to all product cards**:
\`\`\`typescript
const toggleWishlist = async (productId: string) => {
  try {
    const response = await fetch('/api/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify({ productId })
    });
    
    if (response.ok) {
      setWishlist(prev => 
        prev.includes(productId) 
          ? prev.filter(id => id !== productId)
          : [...prev, productId]
      );
      showToast('Added to wishlist!');
    }
  } catch (error) {
    console.error('Wishlist update failed:', error);
  }
};
\`\`\`

### Error Handling
\`\`\`typescript
// Global error handler for API calls
const apiCall = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`,
        ...options.headers
      }
    });
    
    if (response.status === 401) {
      // Token expired, refresh or redirect to login
      await refreshToken();
      return apiCall(url, options); // Retry
    }
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
\`\`\`

---

## Testing Strategy

### 1. API Testing
- **Unit tests** for all API endpoints
- **Integration tests** for AI services
- **Load testing** for search performance
- **Mock external APIs** for development

### 2. Frontend Integration Testing
- **E2E tests** for complete user flows
- **API integration tests** with real backend
- **Error handling tests** for network failures
- **Performance testing** for search responsiveness

### 3. Data Quality Testing
- **Product data validation**
- **Price accuracy verification**
- **Image URL validation**
- **Affiliate link testing**

---

## Monitoring & Analytics

### 1. Application Monitoring
- **Error tracking** with Sentry
- **Performance monitoring** with custom metrics
- **API response times** and success rates
- **Database query performance**

### 2. Business Analytics
- **User behavior tracking** with Mixpanel
- **Search query analysis**
- **Conversion tracking** (search → click → purchase)
- **Price alert effectiveness**

### 3. AI Model Monitoring
- **Query parsing accuracy**
- **Search result relevance**
- **Recommendation click-through rates**
- **User satisfaction scores**

---

This guide provides the complete roadmap for transforming the Snapi MVP from a frontend prototype to a fully functional AI-powered shopping assistant. The backend implementation should follow this structure to ensure seamless integration with the existing frontend codebase.
