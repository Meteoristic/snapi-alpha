import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Zap,
  Shield,
  Mic,
  Search,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Download,
  Smartphone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1B29] via-[#27253D] to-[#1C1B29]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#1C1B29]/80 border-b border-[#7C3AED]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-[#F4F4F5]">Snapi</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-[#9CA3AF] hover:text-[#F4F4F5] transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-[#9CA3AF] hover:text-[#F4F4F5] transition-colors">
              Pricing
            </Link>
            <Link href="#faq" className="text-[#9CA3AF] hover:text-[#F4F4F5] transition-colors">
              FAQ
            </Link>
          </div>
          <Link href="/welcome">
            <Button className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white border-0">
              Try Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-[#7C3AED]/20 text-[#A78BFA] border-[#7C3AED]/30 hover:bg-[#7C3AED]/30">
                  ✨ AI-Powered Shopping Assistant
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-[#F4F4F5] leading-tight">
                  Smart AI for Your{" "}
                  <span className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] bg-clip-text text-transparent">
                    Everyday Needs
                  </span>
                </h1>
                <p className="text-xl text-[#9CA3AF] leading-relaxed max-w-lg">
                  Transform how you shop with intelligent product discovery, instant comparisons, and personalized
                  recommendations powered by advanced AI.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/welcome">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] hover:from-[#6D28D9] hover:to-[#8B5CF6] text-white border-0 text-lg px-8 py-6"
                  >
                    Try Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/10 text-lg px-8 py-6"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-[#9CA3AF]">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=800&fit=crop"
                  alt="Snapi mobile app interface"
                  width={400}
                  height={600}
                  className="mx-auto rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#A78BFA]/20 rounded-3xl blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#F4F4F5] mb-4">Key Advantages</h2>
            <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto">
              Experience the future of shopping with our intelligent AI assistant
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm hover:bg-[#27253D]/70 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#F4F4F5] mb-4">Instant Processing</h3>
                <p className="text-[#9CA3AF] leading-relaxed">
                  Get intelligent product recommendations in seconds with our advanced AI processing engine.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm hover:bg-[#27253D]/70 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#F4F4F5] mb-4">99.9% Uptime</h3>
                <p className="text-[#9CA3AF] leading-relaxed">
                  Reliable service you can count on, with enterprise-grade infrastructure and monitoring.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm hover:bg-[#27253D]/70 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#F4F4F5] mb-4">Voice Control</h3>
                <p className="text-[#9CA3AF] leading-relaxed">
                  Natural language processing that understands exactly what you're looking for.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#F4F4F5] mb-4">Revolutionary Power & Capabilities</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, title: "Smart AI Assistance", desc: "Intelligent product discovery" },
              { icon: TrendingUp, title: "Instant Task Automation", desc: "Automated price tracking" },
              { icon: Clock, title: "Effortless Voice Control", desc: "Natural language queries" },
              { icon: Shield, title: "Reliable & Secure", desc: "Enterprise-grade security" },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-[#27253D]/30 border-[#7C3AED]/20 backdrop-blur-sm hover:bg-[#27253D]/50 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <item.icon className="w-8 h-8 text-[#A78BFA] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#F4F4F5] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#F4F4F5] mb-4">
              What Our Happy Customers Are Saying About Snapi
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                rating: 5,
                text: "Snapi completely transformed my shopping experience. I found the perfect furniture for my apartment in minutes!",
              },
              {
                name: "Mike Rodriguez",
                rating: 5,
                text: "The AI recommendations are spot-on. It's like having a personal shopping assistant that actually understands my style.",
              },
              {
                name: "Emily Johnson",
                rating: 5,
                text: "Price alerts saved me hundreds of dollars. I love how it tracks deals automatically.",
              },
              {
                name: "David Kim",
                rating: 5,
                text: "The comparison feature is incredible. No more opening dozens of tabs to compare products.",
              },
              {
                name: "Lisa Thompson",
                rating: 5,
                text: "Natural language search actually works! I can describe exactly what I want and it finds it.",
              },
              {
                name: "Alex Parker",
                rating: 5,
                text: "Clean interface, fast results, and genuinely helpful recommendations. This is the future of shopping.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#7C3AED] text-[#7C3AED]" />
                    ))}
                  </div>
                  <p className="text-[#9CA3AF] mb-4 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="text-[#F4F4F5] font-semibold">{testimonial.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#F4F4F5] mb-4">Pricing</h2>
            <p className="text-xl text-[#9CA3AF]">Choose the perfect plan for your shopping needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#F4F4F5] mb-2">Basic</h3>
                <div className="text-4xl font-bold text-[#F4F4F5] mb-6">
                  $12<span className="text-lg text-[#9CA3AF]">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {["Smart product search", "Basic comparisons", "Price alerts", "Mobile app access"].map(
                    (feature, i) => (
                      <li key={i} className="flex items-center text-[#9CA3AF]">
                        <CheckCircle className="w-4 h-4 text-[#10B981] mr-3" />
                        {feature}
                      </li>
                    ),
                  )}
                </ul>
                <Button className="w-full bg-[#27253D] border border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Advanced Plan - Highlighted */}
            <Card className="bg-gradient-to-b from-[#7C3AED]/20 to-[#27253D]/50 border-[#7C3AED] backdrop-blur-sm relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white">Most Popular</Badge>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#F4F4F5] mb-2">Advanced</h3>
                <div className="text-4xl font-bold text-[#F4F4F5] mb-6">
                  $20<span className="text-lg text-[#9CA3AF]">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Basic",
                    "Advanced AI recommendations",
                    "Unlimited comparisons",
                    "Priority support",
                    "Custom alerts",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-[#9CA3AF]">
                      <CheckCircle className="w-4 h-4 text-[#10B981] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white hover:from-[#6D28D9] hover:to-[#8B5CF6]">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-[#27253D]/50 border-[#7C3AED]/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#F4F4F5] mb-2">Pro</h3>
                <div className="text-4xl font-bold text-[#F4F4F5] mb-6">
                  $47<span className="text-lg text-[#9CA3AF]">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Advanced",
                    "API access",
                    "White-label options",
                    "Custom integrations",
                    "Dedicated support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-[#9CA3AF]">
                      <CheckCircle className="w-4 h-4 text-[#10B981] mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#27253D] border border-[#7C3AED]/30 text-[#F4F4F5] hover:bg-[#7C3AED]/20">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#F4F4F5] mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "What can I do with Snapi for free?",
                a: "You can perform basic product searches and comparisons with our free tier.",
              },
              {
                q: "How does the AI shopping assistant work?",
                a: "Our AI analyzes your natural language queries and matches them with relevant products from top retailers.",
              },
              {
                q: "Can I use the app for free shopping?",
                a: "Yes, Snapi helps you find the best deals and compare prices across multiple retailers.",
              },
              {
                q: "Is my personal data secure?",
                a: "Absolutely. We use enterprise-grade security and never share your personal information.",
              },
              {
                q: "What about other plans and pricing?",
                a: "We offer flexible plans starting from $12/month with advanced features and priority support.",
              },
              {
                q: "How do I get started?",
                a: "Simply sign up with your Google or Apple account and start searching for products immediately.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-[#27253D]/30 border-[#7C3AED]/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#F4F4F5] mb-2">{faq.q}</h3>
                  <p className="text-[#9CA3AF]">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download Banner */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <Card className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] border-0 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Smart AI for Your Everyday Needs</h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Download Snapi on the App Store and Google Play to start your intelligent shopping journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>App Store</span>
                  </Button>
                  <Button size="lg" className="bg-black text-white hover:bg-gray-800 flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Google Play</span>
                  </Button>
                </div>
              </div>
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <Smartphone className="w-24 h-24 text-white/20" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#7C3AED]/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-[#F4F4F5]">Snapi</span>
              </div>
              <p className="text-[#9CA3AF] mb-4">
                Intelligent solutions for effortless shopping, powered by cutting-edge AI technology.
              </p>
              <p className="text-sm text-[#9CA3AF]">Version 1.0.0</p>
            </div>
            <div>
              <h3 className="text-[#F4F4F5] font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-[#9CA3AF]">
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#F4F4F5] font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-[#9CA3AF]">
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#F4F4F5] font-semibold mb-4">Download and Socials</h3>
              <ul className="space-y-2 text-[#9CA3AF]">
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    iOS App
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    Android App
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#F4F4F5] transition-colors">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#7C3AED]/20 mt-8 pt-8 text-center text-[#9CA3AF]">
            <p>&copy; 2025 Snapi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
