"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Heart, ShoppingCart, BarChart3, Star, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface Product {
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

interface SearchResults {
  products: Product[];
  aiSummary: string;
  totalFound: number;
  searchId: string;
  query: string;
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const searchId = searchParams.get("searchId") || ""
  
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSearchResults = () => {
      try {
        // Try to get results from sessionStorage first
        const storedResults = sessionStorage.getItem('searchResults')
        
        if (storedResults) {
          const results: SearchResults = JSON.parse(storedResults)
          
          // Verify the search ID matches
          if (results.searchId === searchId) {
            setSearchResults(results)
            setLoading(false)
            return
          }
        }
        
        // If no stored results or mismatched ID, show error
        setError('Search results not found. Please search again.')
        setLoading(false)
        
      } catch (error) {
        console.error('Failed to load search results:', error)
        setError('Failed to load search results. Please try searching again.')
        setLoading(false)
      }
    }

    loadSearchResults()
  }, [searchId])

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleProductClick = (product: Product) => {
    // Store product data for the product detail page
    sessionStorage.setItem(`product_${product.id}`, JSON.stringify(product))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#F4F4F5]">Loading search results...</p>
        </div>
      </div>
    )
  }

  if (error || !searchResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <p className="text-red-400">{error}</p>
          <Link href="/search">
            <Button className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white">
              Back to Search
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29]">
      {/* Header */}
      <div className="p-4 border-b border-[#7C3AED]/20">
        <div className="flex items-center space-x-4">
          <Link href="/search">
            <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F4F4F5]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <p className="text-sm text-[#9CA3AF]">AI Search Results for:</p>
            <p className="text-[#F4F4F5] font-medium truncate">"{query}"</p>
            <p className="text-xs text-[#7C3AED]">{searchResults.totalFound} products found</p>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      {searchResults.aiSummary && (
        <motion.div 
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-[#7C3AED]/20 to-[#A78BFA]/20 border-[#7C3AED]/30 backdrop-blur-sm">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-[#F4F4F5] mb-2 flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#A78BFA]" />
                AI Analysis
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed">{searchResults.aiSummary}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Results */}
      <div className="p-4 space-y-4">
        <AnimatePresence>
          {searchResults.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm hover:bg-[#27253D]/70 transition-all">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => toggleProductSelection(product.id)}
                          className="bg-white/90 border-0"
                        />
                      </div>
                      {/* AI Score Badge */}
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-[#7C3AED] text-white text-xs">
                          AI: {product.aiScore}/10
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#F4F4F5] leading-tight">{product.name}</h3>
                          <p className="text-sm text-[#9CA3AF]">{product.store}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleWishlist(product.id)}
                          className={`${wishlist.includes(product.id) ? "text-red-400" : "text-[#9CA3AF]"} hover:text-red-400`}
                        >
                          <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-[#F4F4F5]">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-[#9CA3AF] line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      
                      {/* AI Analysis Preview */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-[#9CA3AF]">Quality:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.round(product.aiAnalysis.qualityScore / 2) ? "text-yellow-400 fill-current" : "text-gray-600"}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[#9CA3AF]">Value:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${i < Math.round(product.aiAnalysis.valueScore / 2) ? "text-green-400 fill-current" : "text-gray-600"}`} 
                              />
                            ))}
                          </div>
                        </div>
                        
                        {product.aiAnalysis.pros.length > 0 && (
                          <p className="text-xs text-[#10B981]">
                            + {product.aiAnalysis.pros[0]}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-[#7C3AED]/20 text-[#A78BFA]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link href={`/product/${product.id}`} onClick={() => handleProductClick(product)}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20"
                          >
                            View Details
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white"
                          onClick={() => window.open(product.url, '_blank')}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Buy Now
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {searchResults.products.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <p className="text-[#9CA3AF]">No products found for your search.</p>
            <Link href="/search">
              <Button className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white">
                Try a Different Search
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Compare Button */}
      <AnimatePresence>
        {selectedProducts.length > 1 && (
          <motion.div 
            className="fixed bottom-20 left-4 right-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <Link href={`/compare?products=${selectedProducts.join(",")}&searchId=${searchId}`}>
              <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white py-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                Compare ({selectedProducts.length})
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1C1B29]/90 backdrop-blur-md border-t border-[#7C3AED]/20">
        <div className="flex justify-center space-x-8">
          <Link href="/search">
            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-[#7C3AED]">
              <div className="w-6 h-6 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-xs">Search</span>
            </Button>
          </Link>
          <Link href="/wishlist">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-[#9CA3AF] hover:text-[#F4F4F5]"
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs">Wishlist</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-[#9CA3AF] hover:text-[#F4F4F5]"
            >
              <div className="w-6 h-6 rounded-full bg-[#27253D] border border-[#7C3AED]/30" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
