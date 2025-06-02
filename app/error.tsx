'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29] flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <CardTitle className="text-[#F4F4F5] text-xl">Something went wrong!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-[#9CA3AF] text-sm">
            {error.message.includes('OPENAI_API_KEY') 
              ? 'API configuration issue. Please check environment variables.'
              : 'An unexpected error occurred. Please try again.'}
          </p>
          
          <div className="space-y-2">
            <Button 
              onClick={reset}
              className="w-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white border-0"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try again
            </Button>
            
            <Link href="/" className="block">
              <Button 
                variant="outline" 
                className="w-full border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Go home
              </Button>
            </Link>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="text-[#9CA3AF] text-xs cursor-pointer">Technical details</summary>
              <pre className="text-xs text-[#9CA3AF] mt-2 p-2 bg-black/20 rounded overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 