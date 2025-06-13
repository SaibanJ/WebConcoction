// import { type NextRequest, NextResponse } from "next/server"
// import { headers } from "next/headers"
// import Stripe from "stripe"
// import { MongoClient } from "mongodb"
//
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-05-28.basil",
// })
//
// const client = new MongoClient(process.env.MONGODB_URI!)
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
//
// export async function POST(request: NextRequest) {
//   const body = await request.text()
//   const headersList = headers()
//   const sig = headersList.get("stripe-signature")!
//
//   let event: Stripe.Event
//
//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err)
//     return NextResponse.json({ message: "Invalid signature" }, { status: 400 })
//   }
//
//   try {
//     await client.connect()
//     const users = client.db().collection("users")
//
//     switch (event.type) {
//       case "checkout.session.completed":
//         const session = event.data.object as Stripe.Checkout.Session
//
//         if (session.metadata?.userEmail) {
//           await users.updateOne(
//             { email: session.metadata.userEmail },
//             {
//               $set: {
//                 "subscription.status": "active",
//                 "subscription.stripeCustomerId": session.customer,
//                 "subscription.subscriptionId": session.subscription,
//                 "subscription.updatedAt": new Date(),
//               },
//             },
//           )
//
//           // Create WHM account here
//           await createWHMAccount(session.metadata.userEmail)
//         }
//         break
//
//       case "customer.subscription.deleted":
//         const subscription = event.data.object as Stripe.Subscription
//
//         await users.updateOne(
//           { "subscription.subscriptionId": subscription.id },
//           {
//             $set: {
//               "subscription.status": "canceled",
//               "subscription.updatedAt": new Date(),
//             },
//           },
//         )
//         break
//
//       default:
//         console.log(`Unhandled event type ${event.type}`)
//     }
//
//     return NextResponse.json({ received: true })
//   } catch (error) {
//     console.error("Webhook processing error:", error)
//     return NextResponse.json({ message: "Webhook processing failed" }, { status: 500 })
//   } finally {
//     await client.close()
//   }
// }
//
// async function createWHMAccount(userEmail: string) {
//   try {
//     // WHM API call to create account
//     const whmResponse = await fetch(`${process.env.WHM_API_URL}/json-api/createacct`, {
//       method: "POST",
//       headers: {
//         Authorization: `WHM ${process.env.WHM_API_TOKEN}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         username: userEmail.split("@")[0].substring(0, 8), // First 8 chars of email
//         domain: `${userEmail.split("@")[0]}.yourdomain.com`,
//         plan: "basic_hosting",
//         contactemail: userEmail,
//         password: generateRandomPassword(),
//       }),
//     })
//
//     const result = await whmResponse.json()
//     console.log("WHM account creation result:", result)
//
//     return result
//   } catch (error) {
//     console.error("WHM account creation failed:", error)
//     throw error
//   }
// }
//
// function generateRandomPassword(): string {
//   return Math.random().toString(36).slice(-12) + "A1!"
// }
