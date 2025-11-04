// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
} from '@/components/ui/sidebar';
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
  Building2,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardData {
  metrics: {
    totalTrackedCompanies: number;
    totalNewsUpdates: number;
    totalSocialMentions: number;
    totalRevenueEstimate: string;
    totalRevenueBillion: string;
  };
  userCompanies: Array<{
    id: string;
    name: string;
    description?: string | null;
    type?: string | null;
    logoUrl?: string | null;
    _count: {
      pressReleases: number;
      socialAccounts: number;
      products: number;
    };
  }>;
  recentNews: Array<{
    id: string;
    title: string;
    summary: string;
    publishedAt: string;
    type: 'PRESS' | 'REPORT';
    company: {
      id: string;
      name: string;
      logoUrl?: string | null;
    };
  }>;
  todaysHotTopic: {
    id: string;
    title: string;
    summary: string;
    publishedAt: string;
    company: { name: string };
  } | null;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      fetchDashboardData();
    }
  }, [userId]);

  const fetchDashboardData = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/dashboard?userId=${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.data) {
        setDashboardData(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard');

      setDashboardData({
        metrics: {
          totalTrackedCompanies: 0,
          totalNewsUpdates: 0,
          totalSocialMentions: 0,
          totalRevenueEstimate: '0.00',
          totalRevenueBillion: '0.0',
        },
        userCompanies: [],
        recentNews: [],
        todaysHotTopic: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies =
    dashboardData?.userCompanies.filter((company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const todaysNewsItem = dashboardData?.todaysHotTopic || {
    title: 'No recent updates',
    summary: 'Check back later for competitor news',
    publishedAt: new Date().toISOString(),
    company: { name: 'RivalryLens' },
  };

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
    );
  }

  if (error) {
    return (
      <SidebarProvider>
        <div className="min-h-screen bg-white flex w-full items-center justify-center p-6">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Error Loading Dashboard</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={fetchDashboardData} className="w-full">
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarProvider>
    );
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
              <SidebarGroupLabel>Your Rivals ({filteredCompanies.length})</SidebarGroupLabel>
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
                                    <span className="text-xs font-medium">
                                      {company.name.charAt(0)}
                                    </span>
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <span className="font-medium text-sm block truncate">
                                    {company.name}
                                  </span>
                                  <p className="text-xs text-muted-foreground truncate">
                                    {company.type || 'B2C'}
                                  </p>
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

            {todaysNewsItem && (
              <SidebarGroup>
                <SidebarGroupLabel>Today's Hot Topic</SidebarGroupLabel>
                <SidebarGroupContent>
                  <Card className="m-2">
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-2">
                        <Bell className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium line-clamp-2">
                            {todaysNewsItem.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {todaysNewsItem.summary}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(todaysNewsItem.publishedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

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
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">
                Monitor your competitors. Tracking{' '}
                <span className="font-medium">
                  {dashboardData?.metrics?.totalTrackedCompanies || 0}
                </span>{' '}
                companies.
              </p>
            </div>

            {/* Metrics */}
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
                    ${dashboardData?.metrics?.totalRevenueBillion || '0.0'}B
                  </div>
                  <p className="text-xs text-muted-foreground">Estimated competitor revenue</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
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
                        className="flex items-start justify-between p-4 rounded-lg bg-gray-50 border"
                      >
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{news.title}</p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {news.summary}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {news.company.name} •{' '}
                              {new Date(news.publishedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {/* <Link */}
                        {/*   href={`/news/${news.id}?type=${news.type === 'PRESS' ? 'press' : 'report'}`} */}
                        {/* > */}
                        {/*   <Button */}
                        {/*     variant="outline" */}
                        {/*     size="sm" */}
                        {/*     className="ml-4 flex-shrink-0" */}
                        {/*   > */}
                        {/*     <ExternalLink className="h-3 w-3 mr-1" /> */}
                        {/*     Read More */}
                        {/*   </Button> */}
                        {/* </Link> */}

                        <Link href={`/news/${news.company.id}`}>
                          <Button variant="outline" size="sm" className="ml-4 flex-shrink-0">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Read More
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

            {/* Company Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCompanies.slice(0, 6).map((company) => (
                <Card key={company.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Badge variant="outline">{company.type || 'B2C'}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {company.description || 'No description available'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Updates</span>
                        <span className="font-medium">
                          {company._count?.pressReleases || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Social Accounts</span>
                        <span className="font-medium">
                          {company._count?.socialAccounts || 0}
                        </span>
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
      </div>
    </SidebarProvider>
  );
}

