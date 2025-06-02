"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Palette,
  Sparkles,
  Crown,
  Wrench,
  Mountain,
  Clock,
  Gem,
  Coffee,
  Zap,
  Home,
  Flower,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const styles = [
  { name: "Minimalist", icon: <Sparkles className="w-4 h-4" />, color: "from-gray-400 to-slate-500" },
  { name: "Modern", icon: <Zap className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" },
  { name: "Classic", icon: <Crown className="w-4 h-4" />, color: "from-amber-500 to-yellow-500" },
  { name: "Bohemian", icon: <Flower className="w-4 h-4" />, color: "from-purple-500 to-pink-500" },
  { name: "Industrial", icon: <Wrench className="w-4 h-4" />, color: "from-gray-600 to-gray-700" },
  { name: "Scandinavian", icon: <Mountain className="w-4 h-4" />, color: "from-blue-400 to-teal-500" },
  { name: "Vintage", icon: <Clock className="w-4 h-4" />, color: "from-orange-500 to-red-500" },
  { name: "Luxury", icon: <Gem className="w-4 h-4" />, color: "from-purple-600 to-indigo-600" },
  { name: "Casual", icon: <Coffee className="w-4 h-4" />, color: "from-green-500 to-emerald-500" },
  { name: "Sporty", icon: <Zap className="w-4 h-4" />, color: "from-red-500 to-orange-500" },
  { name: "Elegant", icon: <Sparkles className="w-4 h-4" />, color: "from-pink-500 to-rose-500" },
  { name: "Rustic", icon: <Home className="w-4 h-4" />, color: "from-amber-600 to-orange-600" },
]

export default function StylePage() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#A78BFA]/8 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#A78BFA]/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="p-4 flex items-center justify-between relative z-10">
        <Link href="/onboarding/categories">
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
          <motion.div
            className="w-8 h-2 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
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
              <div className="w-16 h-16 bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-[#F4F4F5] mb-2">What's your style vibe?</h1>
              <p className="text-[#9CA3AF]">Choose styles that resonate with your personal taste</p>
            </motion.div>
          </div>

          <motion.div
            className="backdrop-blur-xl bg-[#27253D]/30 rounded-2xl border border-[#7C3AED]/20 p-6"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {styles.map((style, index) => (
                <motion.div
                  key={style.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Badge
                    variant={selectedStyles.includes(style.name) ? "default" : "outline"}
                    className={`p-4 text-center cursor-pointer transition-all duration-300 w-full h-auto flex flex-col items-center space-y-2 ${
                      selectedStyles.includes(style.name)
                        ? "bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] text-white border-0 shadow-lg shadow-[#A78BFA]/20"
                        : "border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/50"
                    }`}
                    onClick={() => toggleStyle(style.name)}
                  >
                    <motion.div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        selectedStyles.includes(style.name) ? "bg-white/20" : `bg-gradient-to-r ${style.color}`
                      }`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {style.icon}
                    </motion.div>
                    <span className="text-xs font-medium leading-tight">{style.name}</span>
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
            <Link href="/search">
              <Button
                className="bg-gradient-to-r from-[#A78BFA] to-[#7C3AED] hover:from-[#8B5CF6] hover:to-[#6D28D9] text-white shadow-lg shadow-[#A78BFA]/20"
                disabled={selectedStyles.length === 0}
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Selection Counter */}
          <AnimatePresence>
            {selectedStyles.length > 0 && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-sm text-[#A78BFA]">
                  {selectedStyles.length} style{selectedStyles.length === 1 ? "" : "s"} selected
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
