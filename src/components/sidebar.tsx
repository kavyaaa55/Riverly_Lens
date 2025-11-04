"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Eye,
  Search,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Settings,
  Bell,
  ExternalLink,
  Plus,
} from "lucide-react"
import Link from "next/link"

interface TrackedCompany {
  id: string
  name: string
  description?: string | null
  type?: string | null
  logoUrl?: string | null
  _count?: {
    pressReleases: number
    socialAccounts: number
    products: number
  }
}

interface DashboardData {
  metrics: {
    totalTrackedCompanies: number
    totalNewsUpdates: number
    totalSocialMentions: number
    totalRevenueEstimate: string
    totalRevenueBillion: string
  }
  userCompanies: TrackedCompany[]
  recentNews: any[]
  todaysHotTopic: any
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [searchQuery, setSearchQuery] = useState("")
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const userId = session?.user?.id

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/dashboard?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setDashboardData(data.data)
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [userId])

  const filteredCompanies = dashboardData?.userCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const todaysNews = dashboardData?.todaysHotTopic || {
    title: "No recent updates",
    summary: "Check back later for competitor news",
    company: { name: "RivalryLens" },
  }

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen bg-white flex w-full">
          <Sidebar className="bg-white border-r border-gray-200">
            <SidebarContent>
              <div className="p-4 space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </SidebarContent>
          </Sidebar>
          <div className="flex-1 p-6">
            <div className="animate-pulse space-y-6">
              <div className="h-8 w-64 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-white flex w-full">
        {/* Sidebar */}
        <Sidebar className="bg-white border-r border-gray-200">
          <SidebarContent>
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-6">
                <Eye className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">RivalryLens</span>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>
                Your Rivals ({filteredCompanies.length})
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                      <SidebarMenuItem key={company.id}>
                        <SidebarMenuButton asChild>
                          <Link href={`/companies/${company.id}`}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center space-x-3 flex-1 min-w-0">
                                {company.logoUrl ? (
                                  <Avatar className="h-8 w-8 flex-shrink-0">
                                    <AvatarImage src={company.logoUrl} alt={company.name} />
                                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                ) : (
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-medium">{company.name.charAt(0)}</span>
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <span className="font-medium text-sm block truncate">{company.name}</span>
                                  <p className="text-xs text-muted-foreground truncate">{company.type || "B2C"}</p>
                                </div>
                              </div>
                              <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                                {company._count?.pressReleases || 0}
                              </Badge>
                            </div>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  ) : (
                    <SidebarMenuItem>
                      <div className="p-4 text-center text-muted-foreground text-sm">
                        No companies tracked yet
                      </div>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Add Company Button */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/companies/add">
                        <Plus className="h-4 w-4" />
                        <span>Add Company</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Today's Hot Topic</SidebarGroupLabel>
              <SidebarGroupContent>
                <Card className="m-2">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-2">
                      <Bell className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium line-clamp-2">{todaysNews.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {todaysNews.summary || todaysNews.company?.name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset>
          <div className="flex-1 flex flex-col">
            <header className="border-b border-gray-200 p-4 bg-white">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">RivalryLens Dashboard</h2>
              </div>
            </header>

            <main className="flex-1 p-6 bg-white overflow-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
                <p className="text-gray-600">
                  Monitor your competitors. Tracking{" "}
                  <span className="font-medium">{dashboardData?.metrics?.totalTrackedCompanies || 0}</span> companies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Companies Tracked</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.metrics?.totalTrackedCompanies || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Active monitoring</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Market Updates</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.metrics?.totalNewsUpdates || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Social Mentions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {dashboardData?.metrics?.totalSocialMentions || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">Recent activity</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Revenue Insights</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${dashboardData?.metrics?.totalRevenueBillion || "0.0"}B
                    </div>
                    <p className="text-xs text-muted-foreground">Estimated competitor revenue</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-8 bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-black">
                    <FileText className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData?.recentNews && dashboardData.recentNews.length > 0 ? (
                      dashboardData.recentNews.slice(0, 3).map((news) => (
                        <div
                          key={news.id}
                          className="flex items-start justify-between p-4 rounded-lg bg-gray-50 border border-gray-100"
                        >
                          <div className="flex items-start space-x-3 flex-1 min-w-0">
                            <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-black truncate">{news.title}</p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{news.summary}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {news.company.name} • {new Date(news.publishedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Link href={`/companies/${news.company.id}/news`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-teal-600 border-teal-600 hover:bg-teal-50 bg-transparent ml-4 flex-shrink-0"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Read
                            </Button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        No recent activity to show
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                {filteredCompanies.slice(0, 6).map((company) => (
                  <Card key={company.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{company.name}</CardTitle>
                        <Badge variant="outline">{company.type || "B2C"}</Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {company.description || "No description available"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Updates</span>
                          <span className="font-medium">{company._count?.pressReleases || 0}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Social Accounts</span>
                          <span className="font-medium">{company._count?.socialAccounts || 0}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Products</span>
                          <span className="font-medium">{company._count?.products || 0}</span>
                        </div>
                        <Link href={`/companies/${company.id}`}>
                          <Button className="w-full mt-4">View Details</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

