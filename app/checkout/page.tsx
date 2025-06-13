"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const plans = {
  price_basic_monthly: {
    name: "Basic",
    price: "$9.99",
    description: "Perfect for personal websites",
    features: ["1 Website", "10GB Storage", "100GB Bandwidth", "Free SSL Certificate", "24/7 Support"],
  },
  price_growth_monthly: {
    name: "Growth",
    price: "$19.99",
    description: "Great for growing businesses",
    features: [
      "5 Websites",
      "50GB Storage",
      "500GB Bandwidth",
      "Free SSL Certificate",
      "Priority Support",
      "Daily Backups",
    ],
  },
  price_premium_monthly: {
    name: "Premium",
    price: "$39.99",
    description: "For high-traffic websites",
    features: [
      "Unlimited Websites",
      "200GB Storage",
      "Unlimited Bandwidth",
      "Free SSL Certificate",
      "VIP Support",
      "Daily Backups",
      "CDN Included",
    ],
  },
}

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const planId = searchParams.get("plan") as keyof typeof plans
  const plan = plans[planId]

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  const handleCheckout = async () => {
    if (!session) return

    setLoading(true)

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: planId }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
          <Button onClick={() => router.push("/")}>Go back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-muted-foreground">You're one step away from getting started</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <Badge className="w-fit mx-auto mb-2">Selected Plan</Badge>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="text-4xl font-bold text-blue-600 mt-4">
              {plan.price}
              <span className="text-lg text-gray-500">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>{plan.name} Plan</span>
              <span className="font-semibold">{plan.price}/month</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Setup Fee</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{plan.price}/month</span>
            </div>

            <Button onClick={handleCheckout} disabled={loading} className="w-full mt-6" size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Purchase"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Your hosting account will be created automatically after payment. You can cancel anytime from your
              dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
