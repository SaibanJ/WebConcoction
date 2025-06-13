// import { type NextRequest, NextResponse } from "next/server"
// import { getServerSession } from "next-auth"
//
// export async function GET(request: NextRequest) {
//   try {
//     const session = await getServerSession()
//
//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }
//
//     // WHM API call to list accounts
//     const whmResponse = await fetch(`${process.env.WHM_API_URL}/json-api/listaccts`, {
//       method: "GET",
//       headers: {
//         Authorization: `WHM ${process.env.WHM_API_TOKEN}`,
//       },
//     })
//
//     if (!whmResponse.ok) {
//       throw new Error("WHM API request failed")
//     }
//
//     const result = await whmResponse.json()
//
//     // Filter accounts for current user
//     const userAccounts = result.data?.acct?.filter((account: any) => account.email === session.user.email) || []
//
//     return NextResponse.json({ accounts: userAccounts })
//   } catch (error) {
//     console.error("WHM accounts fetch error:", error)
//     return NextResponse.json({ message: "Failed to fetch accounts" }, { status: 500 })
//   }
// }
//
// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession()
//
//     if (!session?.user?.email) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }
//
//     const { domain, plan } = await request.json()
//
//     if (!domain || !plan) {
//       return NextResponse.json({ message: "Domain and plan are required" }, { status: 400 })
//     }
//
//     // WHM API call to create account
//     const whmResponse = await fetch(`${process.env.WHM_API_URL}/json-api/createacct`, {
//       method: "POST",
//       headers: {
//         Authorization: `WHM ${process.env.WHM_API_TOKEN}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         username: domain.split(".")[0].substring(0, 8),
//         domain: domain,
//         plan: plan,
//         contactemail: session.user.email,
//         password: generateRandomPassword(),
//       }),
//     })
//
//     const result = await whmResponse.json()
//
//     if (result.metadata?.result === 1) {
//       return NextResponse.json({
//         message: "Account created successfully",
//         account: result.data,
//       })
//     } else {
//       return NextResponse.json({ message: result.metadata?.reason || "Account creation failed" }, { status: 400 })
//     }
//   } catch (error) {
//     console.error("WHM account creation error:", error)
//     return NextResponse.json({ message: "Failed to create account" }, { status: 500 })
//   }
// }
//
// function generateRandomPassword(): string {
//   return Math.random().toString(36).slice(-12) + "A1!"
// }
