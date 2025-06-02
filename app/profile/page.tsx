import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Search, Heart, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29]">
      {/* Header */}
      <div className="p-4 border-b border-[#7C3AED]/20">
        <h1 className="text-2xl font-bold text-[#F4F4F5]">Profile</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* User Info */}
        <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">JD</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#F4F4F5]">John Doe</h2>
                <p className="text-[#9CA3AF]">john.doe@example.com</p>
                <Badge className="bg-[#7C3AED]/20 text-[#A78BFA] mt-2">Premium Member</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Preferences */}
        <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#F4F4F5] mb-4">Shopping Preferences</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#9CA3AF] mb-2">Favorite Categories</p>
                <div className="flex flex-wrap gap-2">
                  {["Fashion", "Home & Garden", "Electronics"].map((category) => (
                    <Badge key={category} variant="outline" className="border-[#7C3AED]/30 text-[#F4F4F5]">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-[#9CA3AF] mb-2">Style Preferences</p>
                <div className="flex flex-wrap gap-2">
                  {["Minimalist", "Modern", "Scandinavian"].map((style) => (
                    <Badge key={style} variant="outline" className="border-[#7C3AED]/30 text-[#F4F4F5]">
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20">
                <Settings className="w-4 h-4 mr-2" />
                Edit Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Options */}
        <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { icon: Settings, label: "Account Settings", href: "#" },
                { icon: HelpCircle, label: "Help & Support", href: "#" },
                { icon: User, label: "Privacy Policy", href: "#" },
                { icon: HelpCircle, label: "Terms of Service", href: "#" },
              ].map((item, index) => (
                <Link key={index} href={item.href}>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-[#7C3AED]/10 transition-colors">
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-[#9CA3AF]" />
                      <span className="text-[#F4F4F5]">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <Button variant="outline" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* App Version */}
        <div className="text-center text-sm text-[#9CA3AF] pb-20">Snapi v1.0.0</div>
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
          <Link href="/wishlist">
            <Button
              variant="ghost"
              className="flex flex-col items-center space-y-1 text-[#9CA3AF] hover:text-[#F4F4F5]"
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs">Wishlist</span>
            </Button>
          </Link>
          <Button variant="ghost" className="flex flex-col items-center space-y-1 text-[#7C3AED]">
            <User className="w-6 h-6 fill-current" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
