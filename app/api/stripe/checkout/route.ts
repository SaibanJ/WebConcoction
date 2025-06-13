// import { type NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
// import Stripe from "stripe"
//
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-05-28.basil",
// })
//
// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession()
//
//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }
//
//     const { priceId } = await request.json()
//
//     if (!priceId) {
//       return NextResponse.json({ message: "Price ID is required" }, { status: 400 })
//     }
//
//     // Create Stripe checkout session
//     const checkoutSession = await stripe.checkout.sessions.create({
//       customer_email: session.user.email,
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: "subscription",
//       success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
//       cancel_url: `${process.env.NEXTAUTH_URL}/dashboard?canceled=true`,
//       metadata: {
//         userEmail: session.user.email,
//       },
//     })
//
//     return NextResponse.json({ url: checkoutSession.url })
//   } catch (error) {
//     console.error("Stripe checkout error:", error)
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//   }
// }
