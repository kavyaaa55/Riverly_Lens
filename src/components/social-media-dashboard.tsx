'use client';

import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Types
type SerializedFollowerSnapshot = {
  id: string;
  socialAccountId: string;
  date: string;
  count: number;
};

type SerializedTopPost = {
  id: string;
  socialAccountId: string;
  title: string;
  link: string;
  postedAt: string;
};

type SocialAccountWithData = {
  id: string;
  platform: 'INSTAGRAM' | 'TWITTER' | 'FACEBOOK';
  followers: number | null;
  followerSnapshots: SerializedFollowerSnapshot[];
  topPosts: SerializedTopPost[];
};

type CompanyWithSocial = {
  socialAccounts: SocialAccountWithData[];
};

interface SocialMediaDashboardProps {
  company: CompanyWithSocial;
}

// NAMED EXPORT - This is important!
export function SocialMediaDashboard({ company }: SocialMediaDashboardProps) {
  const { socialAccounts } = company;

  const instagramAccount = socialAccounts.find((acc) => acc.platform === 'INSTAGRAM');
  const twitterAccount = socialAccounts.find((acc) => acc.platform === 'TWITTER');
  const facebookAccount = socialAccounts.find((acc) => acc.platform === 'FACEBOOK');

  const getLatestFollowerCount = (account: SocialAccountWithData | undefined) => {
    if (!account) return 0;
    if (account.followerSnapshots.length === 0) return account.followers || 0;

    // Sort by date and get the latest snapshot
    const sortedSnapshots = [...account.followerSnapshots].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    console.log(`${account.platform} Latest:`, {
      date: sortedSnapshots[0].date,
      count: sortedSnapshots[0].count,
      allDates: sortedSnapshots.map(s => ({ date: s.date, count: s.count }))
    });

    return sortedSnapshots[0].count;
  };

  const calculateGrowth = (snapshots: SerializedFollowerSnapshot[]) => {
    if (snapshots.length < 2) return 0;
    const sortedSnapshots = [...snapshots].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const latest = sortedSnapshots[0].count;
    const previous = sortedSnapshots[1].count;
    return ((latest - previous) / previous) * 100;
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Social Media Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {instagramAccount && (
          <StatCard
            platform="Instagram"
            icon={<Users className="w-5 h-5" />}
            value={formatNumber(getLatestFollowerCount(instagramAccount))}
            growth={calculateGrowth(instagramAccount.followerSnapshots)}
          />
        )}

        {twitterAccount && (
          <StatCard
            platform="Twitter"
            icon={<Users className="w-5 h-5" />}
            value={formatNumber(getLatestFollowerCount(twitterAccount))}
            growth={calculateGrowth(twitterAccount.followerSnapshots)}
          />
        )}

        {facebookAccount && (
          <StatCard
            platform="Facebook"
            icon={<Users className="w-5 h-5" />}
            value={formatNumber(getLatestFollowerCount(facebookAccount))}
            growth={calculateGrowth(facebookAccount.followerSnapshots)}
          />
        )}
      </div>

      {/* Follower Growth Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Follower Growth Trends</CardTitle>
          <CardDescription>Social media follower growth over the last 5 months</CardDescription>
        </CardHeader>
        <CardContent>
          <FollowerGrowthChart socialAccounts={socialAccounts} />
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Most engaging content from the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <TopPostsList socialAccounts={socialAccounts} />
        </CardContent>
      </Card>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  platform: string;
  icon: React.ReactNode;
  value: string;
  growth: number;
}

function StatCard({ platform, icon, value, growth }: StatCardProps) {
  const isPositive = growth >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{platform}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-2">
          <TrendingUp
            className={`h-4 w-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`}
          />
          <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}{growth.toFixed(1)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Improved Follower Growth Chart Component
function FollowerGrowthChart({ socialAccounts }: { socialAccounts: SocialAccountWithData[] }) {
  // Prepare chart data
  const dateSet = new Set<string>();

  // Collect all unique dates
  socialAccounts.forEach((account) => {
    account.followerSnapshots.forEach((snapshot) => {
      dateSet.add(snapshot.date);
    });
  });

  // Sort dates
  const sortedDates = Array.from(dateSet).sort();

  // Build chart data
  const chartData = sortedDates.map((date) => {
    const dataPoint: any = {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date,
    };

    socialAccounts.forEach((account) => {
      const snapshot = account.followerSnapshots.find((s) => s.date === date);
      if (snapshot) {
        dataPoint[account.platform] = snapshot.count;
      }
    });

    return dataPoint;
  });

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
        No follower data available
      </div>
    );
  }

  const platformColors: Record<string, string> = {
    INSTAGRAM: 'hsl(var(--chart-1))',
    TWITTER: 'hsl(var(--chart-2))',
    FACEBOOK: 'hsl(var(--chart-3))',
  };

  const platformLabels: Record<string, string> = {
    INSTAGRAM: 'Instagram',
    TWITTER: 'Twitter',
    FACEBOOK: 'Facebook',
  };

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(value) => formatNumber(value)}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || !payload.length) return null;

              return (
                <div className="rounded-lg border bg-background p-2 shadow-md">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                      </span>
                    </div>
                    {payload.map((entry: any, index: number) => (
                      <div key={index} className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {platformLabels[entry.dataKey] || entry.dataKey}
                          </span>
                        </div>
                        <span className="text-sm font-bold">
                          {formatNumber(entry.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => platformLabels[value] || value}
            iconType="line"
          />
          {socialAccounts.map((account, index) => {
            const colors = ['#2563eb', '#10b981', '#f59e0b'];
            return (
              <Line
                key={account.id}
                type="linear"
                dataKey={account.platform}
                stroke={colors[index % colors.length]}
                strokeWidth={3}
                dot={{ fill: colors[index % colors.length], strokeWidth: 2, stroke: '#fff', r: 5 }}
                activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
                animationDuration={1000}
                connectNulls={true}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Top Posts List Component
function TopPostsList({ socialAccounts }: { socialAccounts: SocialAccountWithData[] }) {
  const allPosts: Array<{ post: SerializedTopPost; platform: string }> = [];

  socialAccounts.forEach((account) => {
    account.topPosts.forEach((post) => {
      allPosts.push({ post, platform: account.platform });
    });
  });

  allPosts.sort((a, b) => new Date(b.post.postedAt).getTime() - new Date(a.post.postedAt).getTime());

  if (allPosts.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
        No posts available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allPosts.slice(0, 10).map(({ post, platform }) => (
        <PostCard key={post.id} post={post} platform={platform} />
      ))}
    </div>
  );
}

// Post Card Component
function PostCard({ post, platform }: { post: SerializedTopPost; platform: string }) {
  const timeAgo = getTimeAgo(new Date(post.postedAt));

  return (
    <Card className="hover:bg-accent transition-colors cursor-pointer">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{platform}</Badge>
              <span className="text-sm text-muted-foreground">{timeAgo}</span>
            </div>
            <p className="text-sm text-foreground mb-3">{post.title}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>125K</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬</span>
                <span>3.2K</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🔗</span>
                <span>892</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Utility Functions
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

function formatCurrency(num: number): string {
  return `$${(num / 1000000000).toFixed(1)}B`;
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return '1 week ago';
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}
