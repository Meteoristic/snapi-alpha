# 🛍️ Snapi - AI-Powered Shopping Assistant

**The future of smart shopping is here!** Snapi is an intelligent shopping assistant that uses AI to help you discover the perfect products across multiple e-commerce platforms in seconds.

## ✨ Features

### 🧠 AI-Powered Search
- **OpenAI GPT-4** integration for intelligent product discovery
- Natural language processing for search queries
- Smart filtering and recommendations based on user preferences

### 🛒 Real E-commerce Integration
- **Live product data** from trusted retailers (Amazon, JBL, Adidas, Best Buy, Costco, etc.)
- **Real-time pricing** and availability
- **Search-only approach** for blazing fast results (<15 seconds)

### 🎨 Modern User Experience
- **Beautiful dark theme** with responsive design
- **Smooth onboarding flow** for personalized recommendations
- **Interactive product cards** with ratings and comparisons
- **Wishlist and profile** management

### ⚡ Performance Optimized
- **Fast search results** using intelligent caching
- **No mock data** - all real product information
- **Optimized for mobile and desktop**

## 🚀 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT-4 for intelligent search
- **Search**: Google Custom Search, SerpAPI integration
- **UI Components**: Shadcn/ui, Lucide React icons
- **Animations**: Framer Motion
- **Styling**: Dark theme with modern gradients

## 📱 Pages & Features

- **🏠 Landing Page**: Pricing tiers and feature showcase
- **👋 Welcome**: User authentication and onboarding
- **🎯 Categories**: Personalized shopping preferences
- **🎨 Style Preferences**: AI learning for better recommendations
- **🔍 Search**: AI-powered product discovery
- **📊 Results**: Beautiful product display with filtering
- **👤 Profile**: User dashboard and settings
- **❤️ Wishlist**: Save favorite products
- **⚖️ Compare**: Side-by-side product comparison

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- OpenAI API key
- Google Custom Search API key (optional)
- SerpAPI key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Meteoristic/snapi-alpha.git
   cd snapi-alpha
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your API keys to `.env`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   GOOGLE_API_KEY=your_google_api_key_here
   GOOGLE_CX_ID=your_google_custom_search_id_here
   SERPAPI_KEY=your_serpapi_key_here
   FIRECRAWL_API_KEY=your_firecrawl_api_key_here
   JINA_API_KEY=your_jina_api_key_here
   BING_SUBSCRIPTION_KEY=your_bing_search_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How It Works

### Search Flow
1. **User Query**: Natural language search (e.g., "wireless headphones under $100")
2. **AI Processing**: GPT-4 analyzes and optimizes the search query
3. **Multi-source Search**: Searches across multiple e-commerce platforms
4. **Smart Filtering**: Filters results to trusted retailers only
5. **AI Enhancement**: Generates ratings, categories, and descriptions
6. **Fast Results**: Returns real products in under 15 seconds

### Key Features in Action
- **🔍 Search**: "comfortable running shoes under $50"
- **⚡ Fast Results**: Real products from Adidas, Under Armour, Amazon
- **📊 Smart Ratings**: AI-generated quality, value, and overall ratings
- **💰 Real Pricing**: Live pricing from actual retailers
- **🏪 Trusted Sources**: Only established e-commerce platforms

## 🌟 What Makes Snapi Special

### 🚫 No Mock Data
Unlike other demos, Snapi returns **100% real product data** from actual e-commerce sites.

### ⚡ Lightning Fast
Our search-only approach delivers results in seconds, not minutes.

### 🧠 Actually Intelligent
GPT-4 integration provides genuinely helpful product recommendations and insights.

### 🎨 Production Ready
Modern UI/UX with enterprise-grade architecture and error handling.

## 📝 API Endpoints

- `POST /api/search` - AI-powered product search
- `GET /api/test-env` - Environment variable testing

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | ✅ Yes |
| `GOOGLE_API_KEY` | Google Custom Search API key | ⚠️ Optional |
| `GOOGLE_CX_ID` | Google Custom Search Engine ID | ⚠️ Optional |
| `SERPAPI_KEY` | SerpAPI key for search results | ⚠️ Optional |
| `FIRECRAWL_API_KEY` | Firecrawl API for web scraping | ⚠️ Optional |
| `JINA_API_KEY` | Jina API for content extraction | ⚠️ Optional |
| `BING_SUBSCRIPTION_KEY` | Bing Search API key | ⚠️ Optional |

## 🚀 Deployment

This project is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting platform**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 API
- **Shadcn/ui** for beautiful UI components
- **Next.js** team for the amazing framework
- **Tailwind CSS** for utility-first styling

---

**Made with ❤️ by [Meteoristic](https://github.com/Meteoristic)**

⭐ If you like this project, please give it a star on GitHub! 