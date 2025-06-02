import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-[#9CA3AF] hover:text-[#F4F4F5]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-8">
            {/* Logo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-2xl flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#F4F4F5]">Welcome to Snapi</h1>
                <p className="text-[#9CA3AF] mt-2">Your AI-powered shopping assistant</p>
              </div>
            </div>

            {/* Sign-in Options */}
            <div className="space-y-4">
              <Link href="/onboarding/categories" className="block">
                <Button className="w-full bg-white text-black hover:bg-gray-100 flex items-center justify-center space-x-3 py-6">
                  <Image
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span className="font-medium">Continue with Google</span>
                </Button>
              </Link>

              <Link href="/onboarding/categories" className="block">
                <Button className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center space-x-3 py-6">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span className="font-medium">Continue with Apple</span>
                </Button>
              </Link>
            </div>

            {/* Legal Links */}
            <div className="text-xs text-[#9CA3AF] space-y-2">
              <p>By continuing, you agree to our</p>
              <div className="flex justify-center space-x-4">
                <Link href="#" className="underline hover:text-[#F4F4F5]">
                  Terms of Service
                </Link>
                <Link href="#" className="underline hover:text-[#F4F4F5]">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
