"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Home,
  Smartphone,
  Heart,
  Book,
  Gamepad2,
  Car,
  Dumbbell,
  Coffee,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const categories = [
  { name: "Fashion & Apparel", icon: <Heart className="w-4 h-4" />, color: "from-pink-500 to-rose-500" },
  { name: "Home & Garden", icon: <Home className="w-4 h-4" />, color: "from-green-500 to-emerald-500" },
  { name: "Electronics", icon: <Smartphone className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" },
  { name: "Beauty & Personal Care", icon: <Sparkles className="w-4 h-4" />, color: "from-purple-500 to-pink-500" },
  { name: "Sports & Outdoors", icon: <Dumbbell className="w-4 h-4" />, color: "from-orange-500 to-red-500" },
  { name: "Books & Media", icon: <Book className="w-4 h-4" />, color: "from-indigo-500 to-purple-500" },
  { name: "Toys & Games", icon: <Gamepad2 className="w-4 h-4" />, color: "from-yellow-500 to-orange-500" },
  { name: "Automotive", icon: <Car className="w-4 h-4" />, color: "from-gray-500 to-slate-500" },
  { name: "Health & Wellness", icon: <Heart className="w-4 h-4" />, color: "from-teal-500 to-green-500" },
  { name: "Food & Beverages", icon: <Coffee className="w-4 h-4" />, color: "from-amber-500 to-yellow-500" },
]

export default function CategoriesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A78BFA]/8 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#7C3AED]/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="p-4 flex items-center justify-between relative z-10">
        <Link href="/welcome">
          <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F4F4F5]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div className="flex space-x-2">
          <motion.div
            className="w-8 h-2 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.5 }}
          />
          <div className="w-8 h-2 bg-[#27253D] rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div
          className="w-full max-w-2xl space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-[#F4F4F5] mb-2">What do you love to shop for?</h1>
              <p className="text-[#9CA3AF]">Select categories that interest you to get personalized recommendations</p>
            </motion.div>
          </div>

          <motion.div
            className="backdrop-blur-xl bg-[#27253D]/30 rounded-2xl border border-[#7C3AED]/20 p-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Badge
                    variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                    className={`p-4 text-center cursor-pointer transition-all duration-300 w-full h-auto flex flex-col items-center space-y-2 ${
                      selectedCategories.includes(category.name)
                        ? "bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white border-0 shadow-lg shadow-[#7C3AED]/20"
                        : "border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/50"
                    }`}
                    onClick={() => toggleCategory(category.name)}
                  >
                    <motion.div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedCategories.includes(category.name)
                          ? "bg-white/20"
                          : `bg-gradient-to-r ${category.color}`
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.icon}
                    </motion.div>
                    <span className="text-xs font-medium leading-tight">{category.name}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex justify-between items-center pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button variant="ghost" className="text-[#9CA3AF] hover:text-[#F4F4F5]">
              Skip for now
            </Button>
            <Link href="/onboarding/style">
              <Button
                className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/20"
                disabled={selectedCategories.length === 0}
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Selection Counter */}
          <AnimatePresence>
            {selectedCategories.length > 0 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-sm text-[#A78BFA]">
                  {selectedCategories.length} categor{selectedCategories.length === 1 ? "y" : "ies"} selected
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
