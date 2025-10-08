"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/sidebar"
import {
  Eye,
  Search,
  Home,
  Info,
  ChevronDown,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Settings,
  Bell,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

const rivalCompanies = [
  { name: "Starbucks", industry: "Coffee", status: "tracking" },
  { name: "Nike", industry: "Shoes", status: "tracking" },
  { name: "Zara", industry: "Fashion", status: "tracking" },
]

const todaysNews = {
  title: "Starbucks Launches New Sustainability Initiative",
  summary: "Major competitor announces carbon-neutral goal by 2030",
  time: "2 hours ago",
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
            </div>

            <SidebarGroup>
              <SidebarGroupLabel>Your Rivals</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {rivalCompanies.map((company) => (
                    <SidebarMenuItem key={company.name}>
                      <SidebarMenuButton asChild>
                        <Link href={`/company/${company.name.toLowerCase()}`}>
                          <div className="flex items-center justify-between w-full">
                            <span>{company.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {company.industry}
                            </Badge>
                          </div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
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
                      <div>
                        <h4 className="text-sm font-medium text-balance">{todaysNews.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{todaysNews.time}</p>
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
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}

          {/* Dashboard Content */}
          <main className="flex-1 p-6 bg-white">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
              <p className="text-gray-600">Monitor your competitors and track market trends</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Companies Tracked</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Active monitoring</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Market Updates</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Social Mentions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue Insights</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.4M</div>
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
                  <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-black">Starbucks launched new mobile app feature</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Enhanced loyalty program with AI-powered recommendations
                        </p>
                        <p className="text-xs text-gray-400">2 hours ago • Product Update</p>
                      </div>
                    </div>
                    <Link href="/dashboard/activity/starbucks-mobile-app">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-teal-600 border-teal-600 hover:bg-teal-50 bg-transparent"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Read Full
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-black">Nike's Instagram followers increased by 10K</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Major spike following new Air Jordan collaboration announcement
                        </p>
                        <p className="text-xs text-gray-400">4 hours ago • Social Media</p>
                      </div>
                    </div>
                    <Link href="/dashboard/activity/nike-instagram-growth">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-teal-600 border-teal-600 hover:bg-teal-50 bg-transparent"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Read Full
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gray-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-black">Zara announced Q3 earnings report</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Revenue up 15% year-over-year, strong online sales growth
                        </p>
                        <p className="text-xs text-gray-400">6 hours ago • Financial</p>
                      </div>
                    </div>
                    <Link href="/dashboard/activity/zara-q3-earnings">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-teal-600 border-teal-600 hover:bg-teal-50 bg-transparent"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Read Full
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {rivalCompanies.map((company) => (
                <Card key={company.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Badge>{company.industry}</Badge>
                    </div>
                    <CardDescription>Competitor analysis and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Social Media Growth</span>
                        <span className="text-green-600 font-medium">+5.2%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Product Updates</span>
                        <span className="font-medium">3 this month</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">News Mentions</span>
                        <span className="font-medium">24 articles</span>
                      </div>
                      <Link href={`/dashboard/company/${company.name.toLowerCase()}`}>
                        <Button className="w-full mt-4">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

