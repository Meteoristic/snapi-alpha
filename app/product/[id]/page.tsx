"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, ShoppingCart, BarChart3, ExternalLink, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

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

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProduct = () => {
      try {
        const storedProduct = sessionStorage.getItem(`product_${productId}`)
        
        if (storedProduct) {
          const productData: Product = JSON.parse(storedProduct)
          setProduct(productData)
        } else {
          setError('Product not found. Please go back to search results.')
        }
      } catch (error) {
        console.error('Failed to load product:', error)
        setError('Failed to load product details.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#F4F4F5]">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <p className="text-red-400">{error}</p>
          <Link href="/results">
            <Button className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white">
              Back to Results
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
        <div className="flex items-center justify-between">
          <Link href="/results">
            <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F4F4F5]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`${isWishlisted ? "text-red-400" : "text-[#9CA3AF]"} hover:text-red-400`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Product Image */}
        <div className="relative">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="w-full rounded-xl object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} className="bg-[#7C3AED]/90 text-white">
                {tag}
              </Badge>
            ))}
            <Badge className="bg-[#7C3AED] text-white">
              AI: {product.aiScore}/10
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
          <CardContent className="p-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-[#F4F4F5] mb-2">{product.name}</h1>
              <p className="text-[#9CA3AF]">Available at {product.store}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-[#F4F4F5]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[#9CA3AF] line-through">${product.originalPrice}</span>
                )}
              </div>
              {product.originalPrice && (
                <Badge className="bg-[#10B981]/20 text-[#10B981]">
                  Save ${product.originalPrice - product.price}
                </Badge>
              )}
            </div>

            {/* AI Analysis Scores */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[#9CA3AF]">Quality:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(product.aiAnalysis.qualityScore / 2) ? "text-yellow-400 fill-current" : "text-gray-600"}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-[#F4F4F5]">{product.aiAnalysis.qualityScore}/10</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[#9CA3AF]">Value:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(product.aiAnalysis.valueScore / 2) ? "text-green-400 fill-current" : "text-gray-600"}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-[#F4F4F5]">{product.aiAnalysis.valueScore}/10</span>
              </div>
            </div>

            <p className="text-[#9CA3AF] leading-relaxed">{product.description}</p>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#F4F4F5] mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-[#A78BFA]" />
              AI Analysis
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-[#10B981] font-medium mb-2">Pros</h4>
                <ul className="space-y-1">
                  {product.aiAnalysis.pros.map((pro, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#9CA3AF]">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-[#EF4444] font-medium mb-2">Cons</h4>
                <ul className="space-y-1">
                  {product.aiAnalysis.cons.map((con, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#EF4444] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#9CA3AF]">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-[#F4F4F5] font-medium mb-2">Recommendation</h4>
                <p className="text-[#9CA3AF]">{product.aiAnalysis.recommendation}</p>
              </div>
              
              <div>
                <h4 className="text-[#A78BFA] font-medium mb-2">Best For</h4>
                <p className="text-[#9CA3AF]">{product.aiAnalysis.bestFor}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 pb-20">
          <Button 
            className="w-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white py-4 text-lg"
            onClick={() => window.open(product.url, '_blank')}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy Now at {product.store}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Compare
            </Button>
            <Button
              variant="outline"
              className="border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-current text-red-400" : ""}`} />
              {isWishlisted ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1C1B29]/90 backdrop-blur-md border-t border-[#7C3AED]/20">
        <div className="flex justify-center space-x-8">
          <Link href="/search">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-[#9CA3AF] hover:text-[#F4F4F5]"
            >
              <div className="w-6 h-6 rounded-full border border-[#7C3AED]/30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#7C3AED]/50" />
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
