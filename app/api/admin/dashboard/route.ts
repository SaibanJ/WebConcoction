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
    const featureRequests = client.db().collection("feature_requests")

    const currentUser = await users.findOne({ email: session.user.email })

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 })
    }

    // Get admin statistics
    const totalUsers = await users.countDocuments()
    const activeSubscriptions = await users.countDocuments({ "subscription.status": "active" })
    const pendingRequests = await featureRequests.countDocuments({ status: "pending" })

    // Get all users
    const allUsers = await users
      .find(
        {},
        {
          projection: { password: 0 },
        },
      )
      .toArray()

    // Get feature requests
    const requests = await featureRequests.find({}).toArray()

    const adminData = {
      stats: {
        totalUsers,
        activeSubscriptions,
        monthlyRevenue: activeSubscriptions * 19.99, // Mock calculation
        pendingRequests,
      },
      users: allUsers.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        plan: user.subscription?.plan || "Basic",
        status: user.subscription?.status || "inactive",
        created: user.createdAt?.toISOString() || new Date().toISOString(),
        lastLogin: user.lastLogin?.toISOString() || new Date().toISOString(),
      })),
      featureRequests: requests.map((request) => ({
        id: request._id.toString(),
        title: request.title,
        description: request.description,
        user: request.userEmail,
        status: request.status,
        created: request.createdAt?.toISOString() || new Date().toISOString(),
        votes: request.votes || 0,
      })),
    }

    return NextResponse.json(adminData)
  } catch (error) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    await client.close()
  }
}
