import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await client.connect()
    const users = client.db().collection("users")

    const user = await users.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Mock data for demonstration - replace with actual WHM API calls
    const dashboardData = {
      subscription: {
        status: user.subscription?.status || "inactive",
        plan: user.subscription?.plan || "Basic",
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      websites: [
        {
          domain: "example.com",
          status: "active",
          created: new Date().toISOString(),
          diskUsage: 2048, // MB
          diskLimit: 10240, // MB
        },
      ],
      analytics: {
        totalVisits: 15420,
        monthlyVisits: 3240,
        storageUsed: 2048, // MB
        storageLimit: 10240, // MB
      },
    }

    return NextResponse.json(dashboardData)
  } catch (error) {
    console.error("Dashboard data error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    await client.close()
  }
}
