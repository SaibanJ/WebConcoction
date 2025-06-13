import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import {
  Check,
  Zap,
  Shield,
  Headphones,
  ArrowRight,
  Menu,
  Code,
  Server,
  Star,
  Globe,
  Rocket,
  Palette
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal
} from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import Pricing from "@/components/Pricing";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center">
          <Globe className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">WebConcoction</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-6">
          <Link href="#services" className="text-sm font-medium hover:text-blue-600 transition-colors text-gray-900">
            Services
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors text-gray-900">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors text-gray-900">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-blue-600 transition-colors text-gray-900">
            Contact
          </Link>
        </nav>
        <Button className="ml-4 hidden md:inline-flex">Get Started</Button>
        <Button variant="outline" className="ml-4 hidden md:inline-flex">
          <Link href="/auth/signin">
            Sign In
          </Link>
        </Button>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[100%] bg-white rounded-md p-5 shadow-md mr-4 flex flex-col">
            <DropdownMenuItem asChild>
              <Link href="#services" className="w-full p-2 hover:bg-slate-100 rounded-md cursor-pointer text-gray-900">
                Services
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#features" className="w-full p-2 hover:bg-slate-100 rounded-md cursor-pointer text-gray-900">
                Features
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#pricing" className="w-full p-2 hover:bg-slate-100 rounded-md cursor-pointer text-gray-900">
                Pricing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#contact" className="w-full p-2 hover:bg-slate-100 rounded-md cursor-pointer text-gray-900">
                Contact
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/signup" className="w-full p-2 mt-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md cursor-pointer flex justify-center">
                Get Started
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </header>


      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">
                  🚀 Professional Web Solutions
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-5xl xl:text-6xl/none">
                  Build Stunning Websites with
                  <span className="text-blue-600"> Reliable Hosting</span>
                </h1>
                <p className="max-w-[600px] text-gray-600 md:text-xl">
                  From custom website design to lightning-fast hosting, we provide everything you need to establish a
                  powerful online presence. Launch your dream website today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-blue-50">
                  Start Building Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  View Our Work
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Free SSL Certificate</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-3xl opacity-20"></div>
                <Image
                    src="/placeholder-logo.svg?height=400&width=600"
                    width="600"
                    height="400"
                    alt="Website showcase"
                    className="relative rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge className="text-gray-900" variant="outline">Our Services</Badge>
              <h2 className="text-3xl font-bold text-gray-900 t-graytracking-tighter sm:text-5xl">
                Everything You Need for Online Success
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer comprehensive web solutions from design to deployment, ensuring your website not only looks
                great but performs exceptionally.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-xl">Website Development</CardTitle>
                </div>
                <CardDescription>Custom websites built with modern technologies and best practices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Responsive Design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>SEO Optimized</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Fast Loading Speed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Mobile-First Approach</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Server className="h-8 w-8 text-purple-600" />
                  <CardTitle className="text-xl">Web Hosting</CardTitle>
                </div>
                <CardDescription>Reliable, fast, and secure hosting solutions for your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>99.9% Uptime Guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Free SSL Certificates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Daily Backups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>CDN Integration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="text-gray-900">Why Choose Us</Badge>
              <h2 className="text-3xl text-gray-900 font-bold tracking-tighter sm:text-5xl">Built for Performance & Growth</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines cutting-edge technology with exceptional support to deliver websites that drive
                results.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-1 text-center">
              <div className="flex justify-center">
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
              </div>
              <h3 className="text-lg font-bold">Lightning Fast</h3>
              <p className="text-sm text-gray-600">
                Optimized for speed with advanced caching and CDN integration for instant loading times.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-green-600 mb-4" />
              </div>
              <h3 className="text-lg font-bold">Secure & Reliable</h3>
              <p className="text-sm text-gray-600">
                Enterprise-grade security with automatic updates and malware protection included.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="flex justify-center">
                <Headphones className="h-12 w-12 text-blue-600 mb-4" />
              </div>
              <h3 className="text-lg font-bold">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Expert support team available around the clock to help with any questions or issues.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="flex justify-center">
                <Palette className="h-12 w-12 text-pink-600 mb-4" />
              </div>
              <h3 className="text-lg font-bold">Custom Design</h3>
              <p className="text-sm text-gray-600">
                Unique designs tailored to your brand with unlimited revisions until perfect.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="flex justify-center">
                <Rocket className="h-12 w-12 text-purple-600 mb-4" />
              </div>
              <h3 className="text-lg font-bold">Easy Scaling</h3>
              <p className="text-sm text-gray-600">
                Grow your website effortlessly with our scalable hosting infrastructure.
              </p>
            </div>
            <div className="grid gap-1 text-center">
              <div className="flex justify-center">
                <Globe className="h-12 w-12 text-indigo-600 mb-4" />
              </div>
              <h3 className="text-lg font-bold">Global Reach</h3>
              <p className="text-sm text-gray-600">
                Worldwide content delivery network ensures fast loading times globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="outline" className="text-gray-900">Testimonials</Badge>
              <h2 className="text-3xl text-gray-900 font-bold tracking-tighter sm:text-5xl">Trusted by Businesses Worldwide</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our clients say about their experience with WebConcoction.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  "WebConcoction transformed our online presence completely. The website is beautiful, fast, and our
                  sales have increased by 40% since launch."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-xs text-gray-600">CEO, TechStart Inc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  "Outstanding service and support. They delivered exactly what we needed on time and within budget.
                  Highly recommended!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    M
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mike Chen</p>
                    <p className="text-xs text-gray-600">Founder, GreenLeaf Co.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  "The hosting is incredibly reliable and fast. We've had zero downtime since switching to
                  WebConcoction. Excellent value!"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-medium">Anna Rodriguez</p>
                    <p className="text-xs text-gray-600">Director, Creative Studio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Pricing />

      {/* CTA Section */}
      <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Launch Your Website?</h2>
              <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of satisfied customers who trust WebConcoction for their web presence. Get started
                today with our free consultation.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Button type="submit" variant="secondary">
                  Get Started
                </Button>
              </form>
              <p className="text-xs text-blue-100">Free consultation • No commitment required</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-6 w-6" />
            <span className="text-xl font-bold">WebConcoction</span>
          </div>
          <p className="text-gray-400 mb-4">Professional web hosting made simple.</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/terms" className="hover:text-blue-400">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-blue-400">
              Privacy
            </Link>
            <Link href="/support" className="hover:text-blue-400">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
