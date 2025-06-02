
# Snapi – Product Requirements Document (PRD)

**Version:** MVP v1.0 (Optimized)  
**Date:** May 29, 2025  
**Document Status:** Final for MVP Development  
**Prepared by:** Udbhav

---

## 1. Introduction: Defining the Snapi Experience

### 1.1. What Snapi Delivers:
Snapi is an intelligent, AI-powered shopping assistant designed to revolutionize how users discover, compare, and track products across leading U.S. retailers. By interpreting natural language prompts, Snapi demystifies the online shopping journey, delivering curated, budget-conscious, and style-aligned recommendations.

### 1.2. Core Value Proposition:
Snapi's distinct advantage lies in its ability to:
- **Transform Complexity into Clarity:** Convert nuanced, conversational shopping queries into actionable, intelligent product results.
- **Combat Decision Fatigue:** Empower users with AI-driven comparison tools that simplify choices and highlight key differentiators.
- **Enable Seamless Shopping Journeys:** Facilitate a fluid path from discovery to potential purchase through intuitive affiliate redirection, intelligent watchlists, and style-aware recommendations.

### 1.3. MVP Strategic Focus (Problem-Solution Validation):
The modern shopper, particularly within the Gen Z and Millennial demographics, grapples with decision overload, inherent distrust in pervasive advertising, and the challenge of finding products that authentically resonate with their personal style and financial parameters. Snapi's MVP directly addresses this pain point by strategically fusing advanced AI-driven understanding with intuitive product discovery, emergent personalization, and indispensable price tracking capabilities—all delivered within a singular, minimalist, and highly engaging user experience. Our primary goal is to validate this problem-solution fit.

---

## 2. Objectives and Goals: Charting the Course for MVP Success

### 2.1. Primary MVP Objectives:
To achieve our strategic focus, the MVP will prioritize:
- **Intuitive Prompt-Based Discovery:** Enable users to articulate their shopping needs via natural language prompts, receiving highly relevant product options in return.
- **Meaningful Product Comparison:** Equip users with clear, concise comparison tools that highlight pertinent product attributes, thereby aiding informed purchasing decisions.
- **Foundational Personalization Engine:** Implement an initial layer of personalization, seeded by optional onboarding cues and dynamically refined through recent user interactions (e.g., viewed, saved items), particularly for the "You may also like" feature.
- **Core Re-engagement Loops:** Deliver essential wishlist and price-tracking functionalities to foster user retention and encourage repeat interaction.

### 2.2. Key Business Goals for MVP:
- **Monetization Framework Validation:** Establish and test an affiliate-based monetization model through seamless redirection to premier U.S. retail partners (e.g., Amazon, Walmart).
- **Early Market Penetration:** Achieve initial traction and adoption among the target demographic of Gen Z and Millennial mobile-first shoppers.
- **User Habit Formation:** Cultivate a "sticky" AI shopping loop that encourages daily or weekly engagement, positioning Snapi as a go-to shopping companion.
- **Strategic Market Positioning:** Begin to establish Snapi as the definitive "AI-powered shopping layer" that intelligently bridges the gap between initial user search intent and final purchase across diverse product verticals.

---

## 3. Target Audience and User Roles: Understanding Our Users

### 3.1. Target User Segments:
- **Primary Cohort:** Gen Z & Millennials (ages 18–35) residing in the U.S., characterized as mobile-native consumers with high online shopping frequency.
- **Secondary Cohorts:**
  - Value-driven deal seekers and budget-conscious shoppers.
  - Lifestyle-oriented users who prioritize style, aesthetics, and personalized product curation.

### 3.2. User Roles (MVP Scope):
- **Standard User:** Empowered to search via natural language prompts, compare product attributes, track prices, save items to a personalized wishlist, and receive timely price drop alerts.
- **Admin (Internal Operations - MVP Scope):** Focused exclusively on monitoring critical system aspects: affiliate feed integrity, overall platform performance, and key user interaction patterns (e.g., prevalent query types, search success/failure rates).

---

## 4. Key Features and Functionality: The MVP Core Offering

### 4.1. 🔍 Intelligent Search & Preprocessing Engine:
- **Conversational Prompt Input:** Designed to accept and interpret complex, natural language queries (e.g., "Show me a cozy, ergonomic desk chair under $200 suitable for compact home office spaces").
- **Advanced NLP Parsing:** Employs a robust NLP engine to accurately dissect queries and extract key attributes, including item type, budget constraints, desired aesthetic qualities, and specific use-case scenarios.
- **Semantic Understanding:** Incorporates synonym mapping and intelligent fallback logic to gracefully handle vague or ambiguous terminology, ensuring a higher degree of search relevance.

### 4.2. 🤖 AI/NLP Analysis & Product Retrieval:
- **Precise Entity Extraction:** Accurately identifies and isolates critical entities within user prompts, such as specific products, price points, intended use-cases, and nuanced design preferences.
- **Targeted Affiliate API Integration:** Retrieves relevant product information from integrated affiliate partner APIs (e.g., Amazon, Walmart) based on meticulously matched criteria derived from the parsed user query.
- **Intelligent Ranking Algorithm:** Implements a sophisticated, score-based ranking system that prioritizes search results based on a weighted combination of relevance to query, product availability, style congruence, and price alignment.

### 4.3. ⚖️ Actionable & Insightful Output:
- **Dynamic Search Results Presentation:** Optimized Product Cards displaying essential product information: clear image, concise name, current price, and originating merchant.
- **Streamlined Product Comparison View:** Intuitive Side-by-Side Matrix enabling users to select and compare multiple products.
- **Contextual Smart Recommendations:** "You May Also Like" Engine powered by recent user behavior and lightly seeded by optional onboarding preferences.

### 4.4. 🧾 Seamless Wishlist & Proactive Price Tracking:
- **Effortless Product Saving:** Allows users to instantly save desired products to a personalized wishlist with a single tap.
- **Customizable Price Alerts:** Empowers users to set specific price alert thresholds for products on their wishlist.
- **Diligent Background Monitoring:** Robust background watcher executing regular checks for price drops on wishlisted items.
- **Timely Push Notifications:** Delivers targeted push notifications when tracked products meet predefined alert conditions.

### 4.5. 📤 Efficient Redirect & Monetization Pathway:
- **Affiliate-Tagged Redirection:** Facilitates seamless external redirection to U.S. merchant partner websites with embedded affiliate tags.
- **Comprehensive Logging:** Every redirection event meticulously logged for analytics and monetization reporting.

### 4.6. 📱 Superior User Experience (UX) Principles:
- **Mobile-First Design Philosophy:** Prioritizes flawless mobile experience with large, accessible tap targets.
- **Engaging Loading States:** Implements lightweight, informative loading states to maintain user engagement.
- **AI Transparency:** Provides concise "Why this?" explanations for AI-selected recommendations.
- **Persistent Action Buttons:** Key action buttons designed as sticky elements for constant accessibility.

---

## 5. User Journey: Mapping the Path to Purchase

### 5.1. Entry & Onboarding:
- **Frictionless Sign-In:** Users initiate their Snapi experience via secure Google/Apple Single Sign-On (SSO).
- **Streamlined Optional Onboarding:** Highly concise, optional onboarding sequence to lightly seed the personalization engine.

### 5.2. Prompt-Driven Search Initiation:
The user articulates their need via a natural language prompt, and Snapi's backend intelligently parses the query and initiates product retrieval.

### 5.3. Results Presentation & Interaction:
Relevant products are displayed as scrollable, visually appealing product cards with intuitive tap-to-select functionality.

### 5.4. In-Depth Product Comparison:
Users select 2-3 products for detailed side-by-side comparison with clear visual grid highlighting key attributes.

### 5.5. User Action & Next Steps:
Users can save items to Watchlist, configure price drop alerts, or click "Buy" for seamless redirection with affiliate tags.

### 5.6. Sustained Engagement & Re-Engagement:
Timely push notifications alert users to price drops, encouraging return visits and potential purchase completion.

---

## 6. Technology Stack & Strategic Integrations

### 6.1. Frontend Frameworks:
- React (Web MVP) with TailwindCSS for utility-first styling

### 6.2. Backend Services & Infrastructure:
- **Supabase** (PostgreSQL + Auth + Edge Functions)
- Redis for efficient caching

### 6.3. AI/NLP & Data APIs:
- OpenAI API for core NLP tasks
- LangChain for orchestrating AI workflows

### 6.4. Affiliate & Product Data Sources:
- Amazon Product Advertising API
- Walmart Open API
- Target Affiliate API

### 6.5. Hosting & Deployment Strategy:
- Vercel (Frontend)
- Supabase (Backend & Database)

### 6.6. Essential Additional Infrastructure:
- Supabase Auth for Google/Apple SSO
- Firebase Cloud Messaging (FCM) for push notifications
- Mixpanel/Amplitude for analytics

---

## 7. Future Scope: Beyond the MVP Horizon

The following features are explicitly out of scope for MVP v1.0:
- Visual Search Capabilities
- Voice-Activated Input
- Ethical & Pre-Owned Filters
- Smart Bundles & Curated Missions
- Daily Personalized "Smart Picks"
- Social Sharing & Group Shopping Layers
- Comprehensive Admin CMS Dashboard

---

## 8. Testing Strategy & Success Metrics: Defining MVP Victory

### 8.1. Comprehensive Test Scenarios:
- NLP Accuracy & Robustness
- Product Result Relevance
- Core Functionality Validation
- Mobile Responsiveness & Performance

### 8.2. Key Performance Benchmarks (MVP Targets):
- Search-to-Result Response Time: < 1.5 seconds
- Product Match Accuracy: > 85% relevance rate
- Comparison View Render Time: < 800 milliseconds
- Price Alert Delivery Efficacy: Within minutes of detection

### 8.3. Critical Success Metrics (Post-Launch Tracking):
- D7 Retention Rate: > 20%
- Product Search to Affiliate Click-Through Rate (CTR): > 35%
- Watchlist Conversion to Affiliate Click: > 25%
- Average Session Duration: > 3 minutes
- Monthly Affiliate Revenue Per User (ARPU): > $0.50 by Month 3
