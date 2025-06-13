import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { title, description } = await request.json()

    if (!title || !description) {
      return NextResponse.json({ message: "Title and description are required" }, { status: 400 })
    }

    await client.connect()
    const featureRequests = client.db().collection("feature_requests")

    const result = await featureRequests.insertOne({
      title,
      description,
      userEmail: session.user.email,
      status: "pending",
      votes: 0,
      createdAt: new Date(),
    })

    return NextResponse.json(
      { message: "Feature request submitted successfully", id: result.insertedId },
      { status: 201 },
    )
  } catch (error) {
    console.error("Feature request error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  } finally {
    await client.close()
  }
}
