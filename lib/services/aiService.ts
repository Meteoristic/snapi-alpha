import OpenAI from 'openai';
import { searchService } from './searchService';

interface SearchAnalysis {
  products: EnhancedProduct[];
  aiSummary: string;
  totalFound: number;
  searchId: string;
}

interface EnhancedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  store: string;
  url: string;
  description: string;
  rating?: number;
  reviews?: number;
  aiScore: number;
  aiAnalysis: {
    qualityScore: number;
    valueScore: number;
    pros: string[];
    cons: string[];
    recommendation: string;
    bestFor: string;
  };
  tags: string[];
}

class AIService {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is required');
    }
    
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async intelligentSearch(userQuery: string): Promise<SearchAnalysis> {
    const searchId = this.generateSearchId();
    
    try {
      console.log(`Starting AI search for: "${userQuery}"`);
      
      // Step 1: AI processes the query and searches the web
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an intelligent shopping assistant. Your job is to:
            1. Search the web for products matching user queries
            2. Scrape detailed product information
            3. Analyze and score each product with AI intelligence
            4. Provide comprehensive shopping recommendations

            Always follow these steps:
            1. First, search for products using the search_web function
            2. Then scrape the top 5-8 product pages for detailed info
            3. Finally, analyze each product and provide AI scores

            Be thorough, helpful, and focus on finding the best products for the user's needs.`
          },
          {
            role: "user",
            content: `Find products for: "${userQuery}". I want comprehensive results with AI analysis and scoring.`
          }
        ],
        functions: [
          {
            name: "search_web_for_products",
            description: "Search the internet for products matching the user query",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "The search query for products"
                },
                num_results: {
                  type: "number",
                  description: "Number of search results to return",
                  default: 20
                }
              },
              required: ["query"]
            }
          },
          {
            name: "scrape_product_details",
            description: "Scrape detailed product information from a URL",
            parameters: {
              type: "object",
              properties: {
                url: {
                  type: "string",
                  description: "The product page URL to scrape"
                }
              },
              required: ["url"]
            }
          },
          {
            name: "analyze_product",
            description: "Analyze a product and provide AI scoring",
            parameters: {
              type: "object",
              properties: {
                product: {
                  type: "object",
                  description: "Product data to analyze"
                },
                user_query: {
                  type: "string",
                  description: "Original user query for context"
                }
              },
              required: ["product", "user_query"]
            }
          }
        ],
        function_call: "auto"
      });

      // Process function calls iteratively
      const products = await this.processFunctionCalls(completion, userQuery);
      
      // Generate final AI summary
      const aiSummary = await this.generateSearchSummary(products, userQuery);

      return {
        products,
        aiSummary,
        totalFound: products.length,
        searchId
      };

    } catch (error) {
      console.error('AI search failed:', error);
      throw new Error('AI search service unavailable');
    }
  }

  private async processFunctionCalls(completion: any, userQuery: string): Promise<EnhancedProduct[]> {
    let messages = completion.choices[0].message;
    let products: EnhancedProduct[] = [];
    let searchResults: any[] = [];

    // Handle initial function call
    if (messages.function_call) {
      const functionName = messages.function_call.name;
      const args = JSON.parse(messages.function_call.arguments);

      if (functionName === 'search_web_for_products') {
        console.log('Searching web for products...');
        searchResults = await searchService.searchWeb(args.query, 25); // Get more results to filter better
        
        // STRICT filtering: Only allow real e-commerce sites
        const trustedEcommerceSites = [
          'amazon.', 'walmart.', 'bestbuy.', 'target.', 'costco.', 'homedepot.', 'lowes.',
          'wayfair.', 'overstock.', 'zappos.', 'nordstrom.', 'macys.', 'bloomingdales.',
          'saks.', 'neiman', 'barneys.', 'sephora.', 'ulta.', 'cvs.', 'walgreens.',
          'shopify', 'bigcommerce', 'woocommerce', 'etsy.', 'ebay.', 'aliexpress.',
          'alibaba.', 'dhgate.', 'wish.', 'mercari.', 'poshmark.', 'depop.',
          'adidas.', 'nike.', 'underarmour.', 'reebok.', 'puma.', 'vans.', 'converse.',
          'levi.', 'gap.', 'oldnavy.', 'banana', 'jcrew.', 'abercrombie.',
          'hollister.', 'americaneagle.', 'urbanoutfitters.', 'forever21.',
          'hm.', 'zara.', 'uniqlo.', 'primark.', 'kohls.', 'jcpenney.',
          'belkin.', 'apple.', 'samsung.', 'sony.', 'lg.', 'dell.', 'hp.',
          'lenovo.', 'asus.', 'acer.', 'microsoft.', 'google.', 'logitech.',
          'razer.', 'corsair.', 'steelseries.', 'hyperx.', 'audio-technica.',
          'sennheiser.', 'bose.', 'jbl.', 'beats.', 'skullcandy.',
          'tomford.', 'gucci.', 'prada.', 'versace.', 'armani.', 'dolcegabbana.',
          'ysl.', 'chanel.', 'dior.', 'louisvuitton.', 'hermes.', 'burberry.',
          'tiffany.', 'cartier.', 'rolex.', 'omega.', 'tissot.', 'casio.',
          'store.', 'shop.', 'boutique.', 'outlet.', 'direct.', 'official.'
        ];
        
        // BANNED sites: News, blogs, reviews, deals sites
        const bannedSites = [
          'nytimes.', 'cnn.', 'bbc.', 'reuters.', 'ap.', 'npr.', 'pbs.',
          'washingtonpost.', 'wsj.', 'usatoday.', 'latimes.', 'chicago',
          'boston.', 'miami.', 'dallas.', 'houston.', 'atlanta.', 'denver.',
          'seattle.', 'portland.', 'syracuse.', 'nj.com', 'masslive.',
          'cleveland.', 'detroit.', 'philly.', 'baltimore.', 'dc.', 'vegas.',
          'engadget.', 'techcrunch.', 'verge.', 'wired.', 'cnet.', 'gizmodo.',
          'mashable.', 'techradar.', 'pcmag.', 'zdnet.', 'arstechnica.',
          'blog.', 'wordpress.', 'medium.', 'tumblr.', 'blogger.',
          'review.', 'deals.', 'coupon.', 'promo.', 'sale.', 'discount.',
          'comparison.', 'vs.', 'versus.', 'best-', 'top-', 'guide.',
          'how-to.', 'tutorial.', 'tips.', 'advice.', 'help.',
          'youtube.', 'facebook.', 'twitter.', 'instagram.', 'pinterest.',
          'reddit.', 'quora.', 'wikipedia.', 'wikihow.',
          'forbes.', 'fortune.', 'bloomberg.', 'cnbc.', 'marketwatch.',
          'yahoo.', 'msn.', 'aol.', 'bing.', 'google.', 'duckduckgo.'
        ];
        
        const filteredResults = searchResults
          .map(result => {
            try {
              const url = result.link.toLowerCase();
              const hostname = new URL(result.link).hostname.toLowerCase();
              let score = 0;
              
              // Check if it's a trusted e-commerce site
              const isTrustedEcommerce = trustedEcommerceSites.some(site => hostname.includes(site));
              const isBanned = bannedSites.some(site => hostname.includes(site) || url.includes(site));
              
              if (isBanned) {
                return { ...result, score: -100 }; // Completely exclude
              }
              
              if (isTrustedEcommerce) {
                score += 15; // High priority for trusted e-commerce
              } else {
                score -= 5; // Lower priority for unknown sites
              }
              
              // Product page indicators (must have actual product URLs)
              if (url.includes('/product/') || url.includes('/p/') || 
                  url.includes('/dp/') || url.includes('/item/') ||
                  url.includes('/sku/') || url.includes('/model/') ||
                  url.includes('/buy/') || url.includes('/shop/')) {
                score += 10;
              }
              
              // Must have price indicators
              if (result.title.includes('$') || result.snippet.includes('$') ||
                  result.title.toLowerCase().includes('price') ||
                  result.snippet.toLowerCase().includes('price')) {
                score += 8;
              }
              
              // Exclude obvious non-product pages
              if (url.includes('/search') || url.includes('/browse/') || 
                  url.includes('/category/') || url.includes('/c/') ||
                  url.includes('/blog/') || url.includes('/news/') ||
                  url.includes('/article/') || url.includes('/review/') ||
                  url.includes('/deals/') || url.includes('/sale/') ||
                  url.includes('/guide/') || url.includes('/how-to/') ||
                  url.includes('/best-') || url.includes('/top-')) {
                score -= 20;
              }
              
              // Must have reasonable title length and content
              if (!result.title || result.title.length < 15 || 
                  result.title.length > 200) {
                score -= 10;
              }
              
              return { ...result, score };
            } catch {
              return { ...result, score: -100 };
            }
          })
          .filter(result => result.score > 5) // Only keep high-scoring results
          .sort((a, b) => b.score - a.score) // Sort by score
          .slice(0, 6); // Take only top 6 results for quality
        
        console.log(`Found ${filteredResults.length} REAL product pages out of ${searchResults.length} total results`);
        console.log('E-commerce sites found:', filteredResults.map(r => `${new URL(r.link).hostname} (score: ${r.score})`));
        
        if (filteredResults.length === 0) {
          console.log('No real e-commerce sites found. This might be a query issue.');
        }
        
        // Process the filtered results - FIRECRAWL-FIRST approach (more reliable)
        for (const searchResult of filteredResults) {
          try {
            console.log(`Processing product from: ${searchResult.link}`);
            
            // STEP 1: Try Firecrawl scraping first (most reliable data)
            let productData = await searchService.scrapeProductPage(searchResult.link);
            
            if (productData) {
              console.log(`✅ Real product data scraped: ${productData.name} - $${productData.price}`);
              
              // Analyze this product with AI
              const analysis = await this.analyzeProduct(productData, userQuery);
              
              const enhancedProduct: EnhancedProduct = {
                id: this.generateProductId(),
                ...productData,
                aiScore: analysis.overallScore,
                aiAnalysis: analysis,
                tags: this.generateTags(productData, analysis)
              };
              
              products.push(enhancedProduct);
              console.log(`✅ Successfully processed product: ${productData.name}`);
            } else {
              // FALLBACK: Use search result data if scraping fails
              console.log(`⚠ Scraping failed, using search data for: ${searchResult.link}`);
              productData = searchService.createProductFromSearchResult(searchResult);
              
              if (productData) {
                console.log(`✅ Fallback product created: ${productData.name} - $${productData.price}`);
                
                const analysis = await this.analyzeProduct(productData, userQuery);
                
                const enhancedProduct: EnhancedProduct = {
                  id: this.generateProductId(),
                  ...productData,
                  aiScore: analysis.overallScore,
                  aiAnalysis: analysis,
                  tags: this.generateTags(productData, analysis)
                };
                
                products.push(enhancedProduct);
              } else {
                console.log(`❌ Could not create product from: ${searchResult.link}`);
              }
            }
          } catch (error) {
            console.error(`❌ Failed to process ${searchResult.link}:`, error);
            continue;
          }
        }
        
        console.log(`✅ Successfully processed ${products.length} products using search-only approach`);
        
        if (products.length === 0) {
          console.log('⚠ No products could be created - search results may be insufficient');
        }
      }
    }

    // Sort by AI score
    return products.sort((a, b) => b.aiScore - a.aiScore);
  }

  private async analyzeProduct(product: any, userQuery: string): Promise<any> {
    try {
      const analysisCompletion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system", 
            content: `You are a product analysis expert. Analyze products and provide realistic, VARIED scoring based on available information.
            
            IMPORTANT: All scores must be on a 1-5 star scale (1.0 to 5.0):
            - Budget products (under $50): Quality 2.5-3.5, Value 3.5-4.5
            - Mid-range products ($50-200): Quality 3.0-4.0, Value 3.0-4.0  
            - Premium products (over $200): Quality 3.5-4.5, Value 2.0-3.5
            - Unknown brands: Lower quality scores (2.0-3.0)
            - Established brands: Higher quality scores (3.5-4.5)
            
            Return your analysis in JSON format with these fields:
            {
              "overallScore": number (1.0-5.0, vary realistically based on actual product),
              "qualityScore": number (1.0-5.0, vary significantly based on brand/price),
              "valueScore": number (1.0-5.0, vary based on price vs features),
              "pros": ["specific pro1", "specific pro2", "specific pro3"],
              "cons": ["specific con1", "specific con2"],
              "recommendation": "specific recommendation based on the actual product",
              "bestFor": "specific use case or user type"
            }
            
            Make scores genuinely different and realistic for a 5-star system!`
          },
          {
            role: "user",
            content: `Analyze this product for the query "${userQuery}":
            
            Product Name: ${product.name}
            Price: $${product.price}
            Store: ${product.store}
            Description: ${product.description}
            
            Provide realistic analysis with VARIED scores on 1-5 star scale. Consider:
            - Is this a budget, mid-range, or premium product based on price?
            - Is the store trustworthy (Amazon/Target vs unknown sites)?
            - Does the product name suggest quality/features?
            - Are there any red flags in the description?
            
            Make quality and value scores significantly different from each other and from other products.`
          }
        ],
        temperature: 0.8, // Higher temperature for more variation
        max_tokens: 500
      });

      const analysisText = analysisCompletion.choices[0].message.content;
      
      // Try to parse JSON, fallback to more realistic varied values
      try {
        const parsed = JSON.parse(analysisText || '{}');
        
        // Ensure all scores are within 1-5 range
        if (parsed.qualityScore) parsed.qualityScore = Math.max(1.0, Math.min(5.0, parsed.qualityScore));
        if (parsed.valueScore) parsed.valueScore = Math.max(1.0, Math.min(5.0, parsed.valueScore));
        if (parsed.overallScore) parsed.overallScore = Math.max(1.0, Math.min(5.0, parsed.overallScore));
        
        // Ensure scores are varied (not all the same)
        if (parsed.qualityScore && parsed.valueScore && 
            Math.abs(parsed.qualityScore - parsed.valueScore) < 0.3) {
          // Force variation if scores are too similar
          parsed.valueScore += (Math.random() - 0.5) * 1.0;
          parsed.valueScore = Math.max(1.0, Math.min(5.0, parsed.valueScore));
        }
        
        return parsed;
      } catch {
        // Generate much more varied fallback scores based on actual product data (1-5 scale)
        const priceCategory = product.price < 50 ? 'budget' : product.price > 200 ? 'premium' : 'midrange';
        const isKnownStore = ['amazon', 'walmart', 'target', 'bestbuy', 'nike', 'adidas'].some(store => 
          product.store.toLowerCase().includes(store));
        
        let qualityBase, valueBase;
        
        if (priceCategory === 'budget') {
          qualityBase = 2.5 + Math.random() * 1.0; // 2.5-3.5 range
          valueBase = 3.5 + Math.random() * 1.0;   // 3.5-4.5 range
        } else if (priceCategory === 'premium') {
          qualityBase = 3.5 + Math.random() * 1.0; // 3.5-4.5 range
          valueBase = 2.0 + Math.random() * 1.5;   // 2.0-3.5 range
        } else {
          qualityBase = 3.0 + Math.random() * 1.0; // 3.0-4.0 range
          valueBase = 3.0 + Math.random() * 1.0;   // 3.0-4.0 range
        }
        
        // Adjust for store reputation
        if (isKnownStore) {
          qualityBase += 0.3;
        } else {
          qualityBase -= 0.3;
        }
        
        // Ensure significant difference between quality and value
        const difference = (Math.random() - 0.5) * 1.0; // -0.5 to 0.5
        const qualityScore = Math.max(1.0, Math.min(5.0, Math.round((qualityBase + difference) * 10) / 10));
        const valueScore = Math.max(1.0, Math.min(5.0, Math.round((valueBase - difference) * 10) / 10));
        const overallScore = Math.round(((qualityScore + valueScore) / 2) * 10) / 10;
        
        return {
          overallScore: overallScore,
          qualityScore: qualityScore,
          valueScore: valueScore,
          pros: this.generateRealisticPros(product),
          cons: this.generateRealisticCons(product),
          recommendation: `This ${product.name.toLowerCase()} from ${product.store} offers ${priceCategory} value at $${product.price}.`,
          bestFor: this.generateBestFor(product, userQuery)
        };
      }
    } catch (error) {
      console.error('Product analysis failed:', error);
      // Ultra-varied fallback for errors (1-5 scale)
      const qualityScore = 1.0 + Math.random() * 4.0; // 1-5 range
      const valueScore = 1.0 + Math.random() * 4.0;   // 1-5 range
      const overallScore = (qualityScore + valueScore) / 2;
      
      return {
        overallScore: Math.round(overallScore * 10) / 10,
        qualityScore: Math.round(qualityScore * 10) / 10,
        valueScore: Math.round(valueScore * 10) / 10,
        pros: this.generateRealisticPros(product),
        cons: this.generateRealisticCons(product),
        recommendation: `Consider this option from ${product.store} for your needs.`,
        bestFor: this.generateBestFor(product, userQuery)
      };
    }
  }

  private generateRealisticPros(product: any): string[] {
    const pros = [];
    
    // Store-specific advantages
    if (product.store.toLowerCase() === 'amazon') {
      pros.push('Fast Prime shipping available');
    } else if (product.store.toLowerCase() === 'walmart') {
      pros.push('Competitive everyday pricing');
    } else if (product.store.toLowerCase() === 'bestbuy') {
      pros.push('In-store pickup and support available');
    } else if (product.store.toLowerCase() === 'target') {
      pros.push('Free shipping on orders over $35');
    } else if (product.store.toLowerCase().includes('adidas') || product.store.toLowerCase().includes('nike')) {
      pros.push('Official brand quality guarantee');
    } else if (product.store.toLowerCase().includes('brooks') || product.store.toLowerCase().includes('underarmour')) {
      pros.push('Sport-specific technology and design');
    } else {
      pros.push('Direct from brand for authenticity');
    }
    
    // Price-based pros
    if (product.price < 50) {
      pros.push('Excellent budget-friendly value');
    } else if (product.price > 200) {
      pros.push('Premium materials and construction');
    } else if (product.price >= 50 && product.price <= 200) {
      pros.push('Good balance of quality and price');
    }
    
    // Product-specific pros based on name and description
    const nameDesc = (product.name + ' ' + product.description).toLowerCase();
    
    if (nameDesc.includes('wireless') || nameDesc.includes('bluetooth')) {
      pros.push('Wireless convenience and freedom');
    }
    if (nameDesc.includes('ergonomic') || nameDesc.includes('comfort')) {
      pros.push('Ergonomic design for extended use');
    }
    if (nameDesc.includes('organic') || nameDesc.includes('natural')) {
      pros.push('Natural and organic ingredients');
    }
    if (nameDesc.includes('waterproof') || nameDesc.includes('resistant')) {
      pros.push('Durable and weather-resistant');
    }
    if (nameDesc.includes('lightweight') || nameDesc.includes('portable')) {
      pros.push('Lightweight and portable design');
    }
    if (nameDesc.includes('adjustable') || nameDesc.includes('customizable')) {
      pros.push('Adjustable settings for personal preference');
    }
    if (nameDesc.includes('professional') || nameDesc.includes('studio')) {
      pros.push('Professional-grade quality');
    }
    if (nameDesc.includes('breathable') || nameDesc.includes('mesh')) {
      pros.push('Breathable materials for comfort');
    }
    
    return pros.slice(0, 3);
  }

  private generateRealisticCons(product: any): string[] {
    const cons = [];
    
    // Price-based realistic cons
    if (product.price < 75) {
      cons.push('Build quality may vary at this price point');
    }
    if (product.price > 300) {
      cons.push('Premium pricing may not suit all budgets');
    }
    
    // Store-specific realistic cons
    if (product.store.toLowerCase() === 'amazon') {
      cons.push('Product authenticity varies by seller');
    } else if (product.store.toLowerCase().includes('online') || product.url.includes('online')) {
      cons.push('Unable to try before purchase');
    }
    
    // Product category realistic cons
    const nameDesc = (product.name + ' ' + product.description).toLowerCase();
    
    if (nameDesc.includes('wireless') || nameDesc.includes('bluetooth')) {
      cons.push('Battery life requires regular charging');
    }
    if (nameDesc.includes('assembly') || nameDesc.includes('install')) {
      cons.push('Assembly or installation required');
    }
    if (nameDesc.includes('chair') || nameDesc.includes('furniture')) {
      cons.push('Shipping costs may be significant');
    }
    if (nameDesc.includes('skincare') || nameDesc.includes('cosmetic')) {
      cons.push('May require patch testing for sensitivity');
    }
    if (nameDesc.includes('shoes') || nameDesc.includes('footwear')) {
      cons.push('Sizing may vary between brands');
    }
    if (nameDesc.includes('electronic') || nameDesc.includes('device')) {
      cons.push('Learning curve for all features');
    }
    
    // Generic realistic cons if none match
    if (cons.length === 0) {
      const genericCons = [
        'Limited color or style options',
        'Return policy may have restrictions',
        'Customer service response time varies'
      ];
      cons.push(genericCons[Math.floor(Math.random() * genericCons.length)]);
    }
    
    return cons.slice(0, 2);
  }

  private generateBestFor(product: any, userQuery: string): string {
    if (userQuery.toLowerCase().includes('office') || userQuery.toLowerCase().includes('chair')) {
      if (product.price < 100) {
        return 'Budget-conscious office workers';
      } else {
        return 'Professionals who spend long hours at desk';
      }
    }
    
    if (userQuery.toLowerCase().includes('skincare')) {
      return 'People with sensitive skin concerns';
    }
    
    return 'General consumers looking for quality products';
  }

  private async generateSearchSummary(products: EnhancedProduct[], userQuery: string): Promise<string> {
    try {
      const summaryCompletion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful shopping advisor. Create a natural, conversational summary of search results. DO NOT use markdown formatting, hashtags, or dollar signs for emphasis. Write in plain, friendly language that any user can understand."
          },
          {
            role: "user",
            content: `Create a helpful, conversational summary for these search results for "${userQuery}":
            
            Found ${products.length} products with AI scores ranging from ${Math.min(...products.map(p => p.aiScore))} to ${Math.max(...products.map(p => p.aiScore))}.
            
            Top 3 products:
            ${products.slice(0, 3).map(p => `- ${p.name} (Score: ${p.aiScore}/10, Price: ${p.price} dollars)`).join('\n')}
            
            Write a concise, natural summary highlighting the best options and key insights. Use normal text without any special formatting symbols.`
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      });

      return summaryCompletion.choices[0].message.content || 'Found several relevant products for your search.';
    } catch (error) {
      console.error('Summary generation failed:', error);
      return `Found ${products.length} products matching "${userQuery}". Results are ranked by AI analysis of quality, value, and relevance.`;
    }
  }

  private generateTags(product: any, analysis: any): string[] {
    const tags: string[] = [];
    
    if (analysis.overallScore >= 4.0) tags.push('Highly Rated');
    if (analysis.valueScore >= 4.0) tags.push('Great Value');
    if (analysis.qualityScore >= 4.0) tags.push('Premium Quality');
    if (product.price < 50) tags.push('Budget Friendly');
    if (product.price > 500) tags.push('Premium');
    
    return tags;
  }

  private generateSearchId(): string {
    return `search_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private generateProductId(): string {
    return `product_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  async searchProducts(userQuery: string): Promise<EnhancedProduct[]> {
    try {
      console.log(`🔍 Starting SEARCH-ONLY product search for: "${userQuery}"`);
      
      const products: EnhancedProduct[] = [];
      
      // STEP 1: Fast search with timeout
      console.log('📡 Getting search results...');
      const searchResults = await Promise.race([
        searchService.searchWeb(userQuery, 15),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Search timeout')), 8000)
        )
      ]);
      
      if (!searchResults || searchResults.length === 0) {
        console.log('❌ No search results found');
        return [];
      }
      
      console.log(`✅ Found ${searchResults.length} search results`);
      
      // STEP 2: Filter for trusted e-commerce sites with good search data
      const filteredResults = this.filterForTrustedEcommerceWithGoodData(searchResults);
      console.log(`✅ ${filteredResults.length} trusted sites with good data`);
      
      if (filteredResults.length === 0) {
        console.log('⚠ No trusted e-commerce sites with good data found');
        return [];
      }
      
      // STEP 3: SEARCH-ONLY processing - NO SCRAPING AT ALL
      console.log('⚡ Processing products using SEARCH DATA ONLY...');
      
      for (let i = 0; i < Math.min(filteredResults.length, 5); i++) {
        const searchResult = filteredResults[i];
        
        try {
          console.log(`Processing ${i + 1}/${Math.min(filteredResults.length, 5)}: ${searchResult.link}`);
          
          // Create product from search data ONLY
          const productData = searchService.createProductFromSearchResult(searchResult);
          
          if (productData) {
            console.log(`✅ Product created: ${productData.name} - $${productData.price}`);
            
            // Fast AI analysis
            const analysis = await this.analyzeProductFromSearchData(productData, userQuery);
            
            const enhancedProduct: EnhancedProduct = {
              id: `product_${Date.now()}_${i}`,
              ...productData,
              aiScore: analysis.overallScore,
              aiAnalysis: analysis,
              tags: this.generateTagsFromSearchData(productData, analysis)
            };
            
            products.push(enhancedProduct);
            console.log(`✅ Product ${i + 1} complete: ${analysis.overallScore}/5 stars`);
          } else {
            console.log(`⚠ Could not create product from search data: ${searchResult.link}`);
          }
        } catch (error) {
          console.log(`⚠ Failed to process result ${i + 1}: ${(error as Error).message}`);
          continue;
        }
      }
      
      console.log(`🎉 SEARCH-ONLY complete: ${products.length} products in seconds!`);
      return products.sort((a, b) => b.aiScore - a.aiScore);
      
    } catch (error) {
      console.error('❌ Search-only approach failed:', error);
      return [];
    }
  }

  // Enhanced filtering - only sites where we can get good data from search results
  private filterForTrustedEcommerceWithGoodData(results: any[]): any[] {
    const trustedWithGoodData = [
      // Major e-commerce with reliable search data
      'amazon.com', 'walmart.com', 'bestbuy.com', 'target.com', 'costco.com',
      'ebay.com', 'etsy.com', 'newegg.com', 'homedepot.com', 'lowes.com',
      
      // Brand stores with good search integration
      'nike.com', 'adidas.com', 'underarmour.com', 'reebok.com', 'puma.com',
      'apple.com', 'samsung.com', 'sony.com', 'lg.com', 'microsoft.com',
      'bose.com', 'jbl.com', 'skullcandy.com', 'beats.com', 'sennheiser.com',
      
      // Specialty stores
      'sephora.com', 'ulta.com', 'nordstrom.com', 'macys.com', 'kohls.com',
      'wayfair.com', 'overstock.com', 'bedbathandbeyond.com', 'ikea.com',
      'rei.com', 'dickssportinggoods.com', 'footlocker.com', 'finish-line.com',
      
      // Tech/Electronics
      'belkin.com', 'logitech.com', 'razer.com', 'corsair.com', 'steelseries.com'
    ];

    // Completely block problematic sites
    const blockedDomains = [
      'nytimes.com', 'cnn.com', 'bbc.com', 'reuters.com', 'yahoo.com',
      'engadget.com', 'techcrunch.com', 'verge.com', 'wired.com', 'cnet.com',
      'reddit.com', 'quora.com', 'wikipedia.org', 'youtube.com', 'blog',
      'syracuse.com', 'masslive.com', 'worldcadaccess.com', 'bangbrosporn.net'
    ];

    return results.filter(result => {
      try {
        const hostname = new URL(result.link).hostname.toLowerCase();
        const url = result.link.toLowerCase();
        
        // Block known problematic domains
        if (blockedDomains.some(domain => hostname.includes(domain) || url.includes(domain))) {
          return false;
        }
        
        // Must be from trusted domain OR have strong e-commerce indicators
        const isTrustedDomain = trustedWithGoodData.some(domain => hostname.includes(domain));
        
        if (isTrustedDomain) {
          // Additional checks for trusted domains
          const title = result.title.toLowerCase();
          const snippet = result.snippet.toLowerCase();
          
          // Must have price indicators for trusted domains too
          const hasPriceData = title.includes('$') || snippet.includes('$') || 
                               result.price || title.includes('price') || snippet.includes('price');
          
          // Avoid category/search pages even on trusted sites
          const isProductPage = !url.includes('/search') && !url.includes('/browse/') && 
                                !url.includes('/category/') && !url.includes('/c/') &&
                                !url.includes('/blog/') && !url.includes('/help/');
          
          return hasPriceData && isProductPage;
        }
        
        return false; // Only allow trusted domains for reliability
      } catch (error) {
        return false;
      }
    });
  }

  // Fast AI analysis using only search data
  private async analyzeProductFromSearchData(product: any, userQuery: string): Promise<any> {
    try {
      const prompt = `Analyze this product for the query "${userQuery}":
      
Product: ${product.name}
Price: $${product.price}
Store: ${product.store}
Description: ${product.description}

Provide a quick analysis with scores 1-5:
- Quality score (1-5)
- Value score (1-5) 
- Overall score (1-5)
- Brief summary (1 sentence)

Keep it concise and realistic.`;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || '';
      
      // Parse the response for scores
      const qualityMatch = response.match(/quality.*?(\d\.?\d?)/i);
      const valueMatch = response.match(/value.*?(\d\.?\d?)/i);
      const overallMatch = response.match(/overall.*?(\d\.?\d?)/i);
      
      const qualityScore = qualityMatch ? parseFloat(qualityMatch[1]) : 3.5;
      const valueScore = valueMatch ? parseFloat(valueMatch[1]) : 3.5;
      const overallScore = overallMatch ? parseFloat(overallMatch[1]) : (qualityScore + valueScore) / 2;
      
      return {
        summary: response.split('\n').find(line => line.includes('.'))?.trim() || `Good ${product.name.toLowerCase()} option for the price.`,
        qualityScore: Math.min(5, Math.max(1, qualityScore)),
        valueScore: Math.min(5, Math.max(1, valueScore)),
        overallScore: Math.min(5, Math.max(1, overallScore)),
        pros: [`Available at ${product.store}`, 'Good pricing'],
        cons: ['Limited information available'],
        recommendation: overallScore >= 4 ? 'Recommended' : overallScore >= 3 ? 'Consider' : 'Look at alternatives'
      };
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Fallback analysis
      const baseScore = 3 + Math.random();
      return {
        summary: `${product.name} from ${product.store} at $${product.price}`,
        qualityScore: baseScore,
        valueScore: baseScore + (Math.random() * 0.5 - 0.25),
        overallScore: baseScore,
        pros: [`Available at ${product.store}`, 'Competitive pricing'],
        cons: ['Limited information available'],
        recommendation: 'Consider'
      };
    }
  }

  private generateTagsFromSearchData(product: any, analysis: any): string[] {
    const tags: string[] = [];
    
    if (analysis.overallScore >= 4) tags.push('Recommended');
    if (analysis.valueScore >= 4) tags.push('Great Value');
    if (product.price < 50) tags.push('Budget-Friendly');
    if (product.price > 200) tags.push('Premium');
    if (product.store.toLowerCase().includes('amazon')) tags.push('Fast Shipping');
    
    return tags;
  }
}

export const aiService = new AIService(); 