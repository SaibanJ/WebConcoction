// import { type NextRequest, NextResponse } from "next/server"
// import { MongoClient } from "mongodb"
// import bcrypt from "bcryptjs"
//
// const client = new MongoClient(process.env.MONGODB_URI!)
//
// export async function POST(request: NextRequest) {
//   try {
//     const { name, email, password } = await request.json()
//
//     if (!name || !email || !password) {
//       return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
//     }
//
//     await client.connect()
//     const users = client.db().collection("users")
//
//     // Check if user already exists
//     const existingUser = await users.findOne({ email })
//     if (existingUser) {
//       return NextResponse.json({ message: "User already exists" }, { status: 400 })
//     }
//
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12)
//
//     // Create user
//     const result = await users.insertOne({
//       name,
//       email,
//       password: hashedPassword,
//       role: "user",
//       createdAt: new Date(),
//       subscription: {
//         status: "inactive",
//         plan: null,
//         stripeCustomerId: null,
//       },
//     })
//
//     return NextResponse.json({ message: "User created successfully", userId: result.insertedId }, { status: 201 })
//   } catch (error) {
//     console.error("Registration error:", error)
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//   } finally {
//     await client.close()
//   }
// }
