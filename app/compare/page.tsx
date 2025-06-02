"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mockProducts = [
  {
    id: 1,
    name: "Modern Minimalist Reading Chair",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    store: "Amazon",
    rating: 4.5,
    material: "Premium Fabric",
    dimensions: '32" W x 30" D x 36" H',
    weight: "300 lbs",
  },
  {
    id: 2,
    name: "Ergonomic Comfort Lounge Chair",
    price: 189,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=300&fit=crop",
    store: "Walmart",
    rating: 4.3,
    material: "Mesh & Foam",
    dimensions: '30" W x 28" D x 38" H',
    weight: "250 lbs",
  },
  {
    id: 3,
    name: "Scandinavian Style Accent Chair",
    price: 275,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    store: "Target",
    rating: 4.7,
    material: "Velvet",
    dimensions: '28" W x 32" D x 34" H',
    weight: "280 lbs",
  },
]

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29]">
      {/* Header */}
      <div className="p-4 border-b border-[#7C3AED]/20">
        <div className="flex items-center space-x-4">
          <Link href="/results">
            <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F4F4F5]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-[#F4F4F5]">Compare Products</h1>
        </div>
      </div>

      {/* AI Summary */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-[#7C3AED]/20 to-[#A78BFA]/20 border-[#7C3AED]/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-[#F4F4F5] mb-3">AI Comparison Summary</h2>
            <p className="text-[#9CA3AF] leading-relaxed">
              Based on your search for a "comfy reading chair under $300", the{" "}
              <strong className="text-[#A78BFA]">Modern Minimalist Reading Chair</strong> offers the best value with
              premium materials and the highest savings. The{" "}
              <strong className="text-[#A78BFA]">Scandinavian Style Chair</strong> has the highest rating but exceeds
              your budget slightly. The <strong className="text-[#A78BFA]">Ergonomic Comfort Chair</strong> is the most
              budget-friendly option.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Table */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <div className="min-w-full space-y-4">
            {/* Product Images & Names */}
            <div className="grid grid-cols-3 gap-4">
              {mockProducts.map((product) => (
                <Card key={product.id} className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
                  <CardContent className="p-4 text-center space-y-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={120}
                      height={120}
                      className="w-full rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-[#F4F4F5] text-sm leading-tight">{product.name}</h3>
                      <p className="text-xs text-[#9CA3AF] mt-1">{product.store}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Price Comparison */}
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#F4F4F5] mb-3">Price</h3>
                <div className="grid grid-cols-3 gap-4">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="text-center">
                      <div className="text-xl font-bold text-[#F4F4F5]">${product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-[#9CA3AF] line-through">${product.originalPrice}</div>
                      )}
                      {product.id === 1 && (
                        <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs mt-1">Best Deal</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rating Comparison */}
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#F4F4F5] mb-3">Customer Rating</h3>
                <div className="grid grid-cols-3 gap-4">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-[#9CA3AF] mt-1">{product.rating}/5</div>
                      {product.id === 3 && (
                        <Badge className="bg-[#7C3AED]/20 text-[#A78BFA] text-xs mt-1">Highest Rated</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Material Comparison */}
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#F4F4F5] mb-3">Material</h3>
                <div className="grid grid-cols-3 gap-4">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="text-center">
                      <div className="text-sm text-[#F4F4F5]">{product.material}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dimensions Comparison */}
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#F4F4F5] mb-3">Dimensions</h3>
                <div className="grid grid-cols-3 gap-4">
                  {mockProducts.map((product) => (
                    <div key={product.id} className="text-center">
                      <div className="text-xs text-[#9CA3AF]">{product.dimensions}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 pb-20">
              {mockProducts.map((product) => (
                <div key={product.id} className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white text-xs py-2">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Buy Now
                  </Button>
                  <div className="grid grid-cols-2 gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20 text-xs"
                    >
                      <Heart className="w-3 h-3" />
                    </Button>
                    <Link href={`/product/${product.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20 text-xs w-full"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
