"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Check} from "lucide-react";
import {Badge} from "@/components/ui/badge"
import Link from "next/link";
import { Button } from "@/components/ui/button"

const plans = [
    {
        name: "Basic",
        price: "$9.99",
        description: "Perfect for personal websites",
        features: ["1 Website", "10GB Storage", "100GB Bandwidth", "Free SSL Certificate", "24/7 Support"],
        priceId: "price_basic_monthly",
    },
    {
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
        priceId: "price_growth_monthly",
        popular: true,
    },
    {
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
        priceId: "price_premium_monthly",
    },
]

const plansSecond = [
    {
        name: "Basic",
        price: "$19.99",
        description: "Perfect for personal websites",
        features: ["1 Website", "10GB Storage", "100GB Bandwidth", "Free SSL Certificate", "24/7 Support"],
        priceId: "price_basic_monthly",
    },
    {
        name: "Growth",
        price: "$39.99",
        description: "Great for growing businesses",
        features: [
            "5 Websites",
            "50GB Storage",
            "500GB Bandwidth",
            "Free SSL Certificate",
            "Priority Support",
            "Daily Backups",
        ],
        priceId: "price_growth_monthly",
        popular: true,
    },
    {
    name: "Premium",
    price: "$79.99",
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
    priceId: "price_premium_monthly",
},

]
 const Pricing = () => {

    return (
     <section id="pricing" className="py-16 px-4 bg-gray-50">
         <div className="container mx-auto">
             <h2 className="text-3xl font-bold text-center  text-gray-900 mb-12">Simple, Transparent Pricing</h2>
             <Tabs defaultValue="tab1">
                 <TabsList className="flex justify-center" aria-label="Manage your account">
                     <div className="flex justify-center gap-5 border rounded-[10rem] w-auto mb-10">
                         <TabsTrigger className="data-[state=active]:bg-blue-400 p-5 rounded-[10rem] text-gray-900" value="tab1">
                             Annually
                         </TabsTrigger>
                         <TabsTrigger className="data-[state=active]:bg-blue-400 p-5 rounded-[10rem] text-gray-900" value="tab2">
                             Monthly
                         </TabsTrigger>
                     </div>
                 </TabsList>
                 <TabsContent value='tab1' >
                     <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                         {plansSecond.map((plan) => (
                             <Card key={plan.name} className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
                                 {plan.popular && (
                                     <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-blue-50">
                                         Most Popular
                                     </Badge>
                                 )}
                                 <CardHeader className="text-center">
                                   <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                   <CardDescription>{plan.description}</CardDescription>
                                   <div className="text-4xl font-bold text-blue-600 mt-4">
                                     {plan.price}
                                     <span className="text-lg text-gray-500">/annually</span>
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
                                     <Link href={`/checkout?plan=${plan.priceId}`}>
                                         <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                                             Get Started
                                         </Button>
                                     </Link>
                                 </CardContent>
                             </Card>
                         ))}
                     </div>
                 </TabsContent>
                 <TabsContent value="tab2">
                     <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                         {plans.map((plan) => (
                             <Card key={plan.name} className={`relative ${plan.popular ? "border-blue-500 shadow-lg scale-105" : ""}`}>
                                 {plan.popular && (
                                     <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-blue-50">
                                         Most Popular
                                     </Badge>
                                 )}
                                 <CardHeader className="text-center">
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
                                     <Link href={`/checkout?plan=${plan.priceId}`}>
                                         <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                                             Get Started
                                         </Button>
                                     </Link>
                                 </CardContent>
                             </Card>
                         ))}
                     </div>
                 </TabsContent>
             </Tabs>

         </div>
     </section>
    )
};

export default Pricing