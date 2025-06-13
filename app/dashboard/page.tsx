"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Globe, BarChart3, CreditCard, MessageSquare, Settings, Plus, ExternalLink } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FeatureRequestForm } from "@/components/feature-request-form"

interface UserData {
  subscription: {
    status: string
    plan: string
    nextBilling: string
  }
  websites: Array<{
    domain: string
    status: string
    created: string
    diskUsage: number
    diskLimit: number
  }>
  analytics: {
    totalVisits: number
    monthlyVisits: number
    storageUsed: number
    storageLimit: number
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData()
    }
  }, [status])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/dashboard")
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Please sign in to continue</h2>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {session.user?.name}!</h1>
            <p className="text-muted-foreground">Manage your hosting accounts and websites</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Website
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.subscription?.plan || "Basic"}</div>
              <Badge variant={userData?.subscription?.status === "active" ? "default" : "secondary"}>
                {userData?.subscription?.status || "Active"}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Websites</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.websites?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Active websites</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Visits</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData?.analytics?.monthlyVisits?.toLocaleString() || "0"}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{((userData?.analytics?.storageUsed || 0) / 1024).toFixed(1)}GB</div>
              <Progress
                value={((userData?.analytics?.storageUsed || 0) / (userData?.analytics?.storageLimit || 1)) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="websites" className="space-y-4">
          <TabsList>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="websites" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Websites</CardTitle>
                <CardDescription>Manage your hosted websites</CardDescription>
              </CardHeader>
              <CardContent>
                {userData?.websites?.length ? (
                  <div className="space-y-4">
                    {userData.websites.map((website, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Globe className="h-8 w-8 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">{website.domain}</h3>
                            <p className="text-sm text-muted-foreground">
                              Created {new Date(website.created).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={website.status === "active" ? "default" : "secondary"}>
                            {website.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            {((website.diskUsage || 0) / 1024).toFixed(1)}GB /{" "}
                            {((website.diskLimit || 0) / 1024).toFixed(1)}GB
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No websites yet</h3>
                    <p className="text-muted-foreground mb-4">Create your first website to get started</p>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Website
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Visits</span>
                      <span className="font-semibold">{userData?.analytics?.totalVisits?.toLocaleString() || "0"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-semibold">
                        {userData?.analytics?.monthlyVisits?.toLocaleString() || "0"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Used</span>
                      <span className="font-semibold">
                        {((userData?.analytics?.storageUsed || 0) / 1024).toFixed(1)}GB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available</span>
                      <span className="font-semibold">
                        {((userData?.analytics?.storageLimit || 0) / 1024).toFixed(1)}GB
                      </span>
                    </div>
                    <Progress
                      value={((userData?.analytics?.storageUsed || 0) / (userData?.analytics?.storageLimit || 1)) * 100}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
                <CardDescription>Manage your billing and subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Current Plan</h3>
                    <p className="text-muted-foreground">{userData?.subscription?.plan || "Basic"}</p>
                  </div>
                  <Badge variant={userData?.subscription?.status === "active" ? "default" : "secondary"}>
                    {userData?.subscription?.status || "Active"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Next Billing Date</h3>
                    <p className="text-muted-foreground">
                      {userData?.subscription?.nextBilling
                        ? new Date(userData.subscription.nextBilling).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline">Upgrade Plan</Button>
                  <Button variant="outline">Manage Billing</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get help from our expert team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Open Support Ticket
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <p>Response time: Usually within 2 hours</p>
                    <p>Available 24/7 for all plans</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Request</CardTitle>
                  <CardDescription>Suggest new features or improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <FeatureRequestForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
