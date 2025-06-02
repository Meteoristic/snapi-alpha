import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Search, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-[#7C3AED]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-[#A78BFA]" />
          </div>
          <CardTitle className="text-[#F4F4F5] text-2xl">404 - Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-[#9CA3AF]">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-2">
            <Link href="/" className="block">
              <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white border-0">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            
            <Link href="/search" className="block">
              <Button 
                variant="outline" 
                className="w-full border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/10"
              >
                <Search className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="w-full text-[#9CA3AF] hover:text-[#F4F4F5] hover:bg-[#27253D]/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-6 pt-4 border-t border-[#7C3AED]/20">
            <p className="text-xs text-[#9CA3AF]">
              Need help? Try searching for products or check our{' '}
              <Link href="/" className="text-[#A78BFA] hover:underline">
                homepage
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 