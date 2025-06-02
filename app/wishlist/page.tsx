"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, User, Bell, Trash2, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mockWishlistItems = [
  {
    id: 1,
    name: "Modern Minimalist Reading Chair",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    store: "Amazon",
    priceAlert: 220,
    inStock: true,
  },
  {
    id: 2,
    name: "Scandinavian Desk Lamp",
    price: 89,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
    store: "Target",
    priceAlert: 75,
    inStock: true,
  },
  {
    id: 3,
    name: "Cozy Throw Blanket",
    price: 45,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop",
    store: "Walmart",
    priceAlert: 40,
    inStock: false,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29]">
      {/* Header */}
      <div className="p-4 border-b border-[#7C3AED]/20">
        <h1 className="text-2xl font-bold text-[#F4F4F5]">My Wishlist</h1>
        <p className="text-[#9CA3AF] mt-1">{wishlistItems.length} items saved</p>
      </div>

      {/* Wishlist Items */}
      <div className="p-4 space-y-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <Card key={item.id} className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex space-x-4">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[#F4F4F5] leading-tight">{item.name}</h3>
                        <p className="text-sm text-[#9CA3AF]">{item.store}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-[#9CA3AF] hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-[#F4F4F5]">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-[#9CA3AF] line-through">${item.originalPrice}</span>
                      )}
                      {item.originalPrice && (
                        <Badge className="bg-[#10B981]/20 text-[#10B981] text-xs">
                          Save ${item.originalPrice - item.price}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-[#A78BFA]" />
                      <span className="text-sm text-[#9CA3AF]">Alert me when under ${item.priceAlert}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/product/${item.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20"
                        >
                          View Details
                        </Button>
                      </Link>
                      {item.inStock && (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Buy Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 bg-[#27253D] rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#F4F4F5] mb-2">Your wishlist is empty</h3>
              <p className="text-[#9CA3AF] mb-6">Start saving products you love to keep track of them</p>
              <Link href="/search">
                <Button className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1C1B29]/90 backdrop-blur-md border-t border-[#7C3AED]/20">
        <div className="flex justify-center space-x-8">
          <Link href="/search">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-[#9CA3AF] hover:text-[#F4F4F5]"
            >
              <Search className="w-6 h-6" />
              <span className="text-xs">Search</span>
            </Button>
          </Link>
          <Button variant="ghost" className="flex flex-col items-center space-y-1 text-[#7C3AED]">
            <Heart className="w-6 h-6 fill-current" />
            <span className="text-xs">Wishlist</span>
          </Button>
          <Link href="/profile">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-[#9CA3AF] hover:text-[#F4F4F5]"
            >
              <User className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
