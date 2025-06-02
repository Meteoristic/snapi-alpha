"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, Heart, User, Mic } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface UseAutoResizeTextareaProps {
  minHeight: number
  maxHeight?: number
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current
      if (!textarea) return

      if (reset) {
        textarea.style.height = `${minHeight}px`
        return
      }

      textarea.style.height = `${minHeight}px`
      const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY))

      textarea.style.height = `${newHeight}px`
    },
    [minHeight, maxHeight],
  )

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = `${minHeight}px`
    }
  }, [minHeight])

  return { textareaRef, adjustHeight }
}

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 120,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setError(null)

    try {
      console.log('Starting AI search for:', query.trim())
      
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          userId: 'user_placeholder' // This will be replaced with real auth later
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Search failed')
      }

      if (data.success && data.products && data.products.length > 0) {
        // Store search results in sessionStorage for the results page
        sessionStorage.setItem('searchResults', JSON.stringify(data))
        
        // Navigate to results page
        router.push(`/results?searchId=${data.searchId}&q=${encodeURIComponent(query.trim())}`)
      } else {
        setError('No products found. Try a different search term.')
      }

    } catch (error) {
      console.error('Search failed:', error)
      setError(error instanceof Error ? error.message : 'Search failed. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] text-white p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C3AED]/8 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A78BFA]/8 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-[#7C3AED]/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-xl mx-auto relative">
        <motion.div
          className="relative z-10 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F4F4F5] to-[#9CA3AF]">
                What are you looking for?
              </h1>
            </motion.div>
            <motion.p
              className="text-[#9CA3AF]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Describe what you need and let AI find it for you across the entire internet
            </motion.p>
          </div>

          {/* Search Input */}
          <motion.div
            className="relative backdrop-blur-xl bg-[#27253D]/30 rounded-xl border border-[#7C3AED]/20 shadow-xl"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-4">
              <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  adjustHeight()
                  setError(null) // Clear error when user types
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Find me comfortable running shoes under $150..."
                className={cn(
                  "w-full px-3 py-2",
                  "resize-none",
                  "bg-transparent",
                  "border-none",
                  "text-[#F4F4F5] text-base",
                  "focus:outline-none",
                  "placeholder:text-[#9CA3AF]",
                  "min-h-[60px]",
                )}
                style={{
                  overflow: "hidden",
                }}
                disabled={isSearching}
              />
            </div>

            <div className="px-4 pb-4 flex items-center justify-between gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                className="p-2 text-[#9CA3AF] hover:text-[#F4F4F5] rounded-lg transition-colors relative group"
                disabled={isSearching}
              >
                <Mic className="w-4 h-4" />
                <motion.span className="absolute inset-0 bg-[#7C3AED]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                type="button"
                onClick={handleSearch}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSearching || !query.trim()}
                className={cn(
                  "px-5 py-2.5 rounded-lg text-sm font-medium transition-all",
                  "flex items-center gap-2",
                  query.trim() && !isSearching
                    ? "bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white shadow-lg shadow-[#7C3AED]/20"
                    : "bg-[#27253D]/50 text-[#9CA3AF]",
                )}
              >
                {isSearching ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Search className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>{isSearching ? "Searching..." : "Search"}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Instructions */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-[#9CA3AF] text-center">Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Wireless headphones with good bass",
                "Comfortable office chair under $200",
                "Skincare routine for sensitive skin",
                "Gaming laptop with RTX graphics"
              ].map((example, index) => (
                <motion.button
                  key={example}
                  onClick={() => {
                    setQuery(example)
                    adjustHeight()
                  }}
                  className="px-3 py-1.5 text-xs bg-[#27253D]/40 hover:bg-[#27253D]/60 border border-[#7C3AED]/20 hover:border-[#7C3AED]/40 rounded-full text-[#9CA3AF] hover:text-[#F4F4F5] transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSearching}
                >
                  {example}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Searching Animation */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-xl bg-[#27253D]/50 rounded-full px-4 py-2 shadow-lg border border-[#7C3AED]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] flex items-center justify-center">
                <Search className="w-3 h-3 text-white" />
              </div>
              <div className="flex items-center gap-2 text-sm text-[#F4F4F5]">
                <span>AI is searching the internet for you</span>
                <div className="flex items-center ml-1">
                  {[1, 2, 3].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-1 h-1 bg-[#7C3AED] rounded-full mx-0.5"
                      initial={{ opacity: 0.3 }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.85, 1.1, 0.85],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: dot * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mouse Follow Effect */}
      {inputFocused && (
        <motion.div
          className="fixed w-[40rem] h-[40rem] rounded-full pointer-events-none z-0 opacity-[0.015] bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#7C3AED] blur-[80px]"
          animate={{
            x: mousePosition.x - 320,
            y: mousePosition.y - 320,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 150,
            mass: 0.5,
          }}
        />
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1C1B29]/90 backdrop-blur-md border-t border-[#7C3AED]/20">
        <div className="flex justify-center space-x-8">
          <Button variant="ghost" className="flex flex-col items-center space-y-1 text-[#7C3AED]">
            <div className="w-6 h-6 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="text-xs">Search</span>
          </Button>
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
              <User className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
