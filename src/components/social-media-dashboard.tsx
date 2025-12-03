// components/social-media-dashboard.tsx
'use client';

import { Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Fake data for social media
const fakeFollowerData = {
  instagram: [
    { date: '2024-06-01', count: 198500 },
    { date: '2024-07-01', count: 199200 },
    { date: '2024-08-01', count: 199800 },
    { date: '2024-09-01', count: 200300 },
    { date: '2024-10-01', count: 200900 },
    { date: '2024-11-01', count: 201500 },
  ],
  twitter: [
    { date: '2024-06-01', count: 145200 },
    { date: '2024-07-01', count: 145800 },
    { date: '2024-08-01', count: 146300 },
    { date: '2024-09-01', count: 146900 },
    { date: '2024-10-01', count: 147400 },
    { date: '2024-11-01', count: 148000 },
  ],
  facebook: [
    { date: '2024-06-01', count: 185000 },
    { date: '2024-07-01', count: 185600 },
    { date: '2024-08-01', count: 186200 },
    { date: '2024-09-01', count: 186700 },
    { date: '2024-10-01', count: 187300 },
    { date: '2024-11-01', count: 187900 },
  ],
};

const fakePosts = [
  {
    id: '1',
    platform: 'INSTAGRAM',
    title: 'New Titan Edge collection - Redefining elegance in watchmaking',
    postedAt: '2024-11-08T10:30:00Z',
  },
  {
    id: '2',
    platform: 'FACEBOOK',
    title: 'Celebrating 40 years of timeless watches and memories',
    postedAt: '2024-11-07T14:15:00Z',
  },
  {
    id: '3',
    platform: 'TWITTER',
    title: 'Sustainability in watchmaking - Our commitment to the environment',
    postedAt: '2024-11-06T09:45:00Z',
  },
  {
    id: '4',
    platform: 'INSTAGRAM',
    title: 'Behind the scenes: Crafting perfection one watch at a time',
    postedAt: '2024-11-05T16:20:00Z',
  },
  {
    id: '5',
    platform: 'FACEBOOK',
    title: 'Limited edition festive collection now available',
    postedAt: '2024-11-04T11:00:00Z',
  },
];

export function SocialMediaDashboard() {
  // Build chart data from fake data
  const chartData = fakeFollowerData.instagram.map((item, index) => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    INSTAGRAM: item.count,
    TWITTER: fakeFollowerData.twitter[index].count,
    FACEBOOK: fakeFollowerData.facebook[index].count,
  }));

  const instagramLatest = fakeFollowerData.instagram[fakeFollowerData.instagram.length - 1].count;
  const instagramPrevious = fakeFollowerData.instagram[fakeFollowerData.instagram.length - 2].count;
  const instagramGrowth = ((instagramLatest - instagramPrevious) / instagramPrevious) * 100;

  const twitterLatest = fakeFollowerData.twitter[fakeFollowerData.twitter.length - 1].count;
  const twitterPrevious = fakeFollowerData.twitter[fakeFollowerData.twitter.length - 2].count;
  const twitterGrowth = ((twitterLatest - twitterPrevious) / twitterPrevious) * 100;

  const facebookLatest = fakeFollowerData.facebook[fakeFollowerData.facebook.length - 1].count;
  const facebookPrevious = fakeFollowerData.facebook[fakeFollowerData.facebook.length - 2].count;
  const facebookGrowth = ((facebookLatest - facebookPrevious) / facebookPrevious) * 100;

  return (
    <div className="w-full space-y-6 p-6">
      {/* Social Media Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          platform="Instagram"
          icon={<Users className="w-5 h-5" />}
          value={formatNumber(instagramLatest)}
          growth={instagramGrowth}
        />
        <StatCard
          platform="Twitter"
          icon={<Users className="w-5 h-5" />}
          value={formatNumber(twitterLatest)}
          growth={twitterGrowth}
        />
        <StatCard
          platform="Facebook"
          icon={<Users className="w-5 h-5" />}
          value={formatNumber(facebookLatest)}
          growth={facebookGrowth}
        />
      </div>

      {/* Follower Growth Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Follower Growth Trends</CardTitle>
          <CardDescription>Social media follower growth over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => formatNumber(value)}
                  domain={['dataMin - 500', 'dataMax + 500']}
                  tickCount={8}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number, name: string) => [formatNumber(value), name]}
                />
                <Legend />
                <Line
                  type="linear"
                  dataKey="INSTAGRAM"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', strokeWidth: 2, stroke: '#fff', r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
                  name="Instagram"
                />
                <Line
                  type="linear"
                  dataKey="TWITTER"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, stroke: '#fff', r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
                  name="Twitter"
                />
                <Line
                  type="linear"
                  dataKey="FACEBOOK"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, stroke: '#fff', r: 5 }}
                  activeDot={{ r: 7, strokeWidth: 2, stroke: '#fff' }}
                  name="Facebook"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Most engaging content from the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fakePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
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
          <TrendingUp className={`h-4 w-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
          <span className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '+' : ''}
            {growth.toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// Post Card Component
function PostCard({ post }: { post: any }) {
  const timeAgo = getTimeAgo(new Date(post.postedAt));

  return (
    <Card className="hover:bg-accent transition-colors cursor-pointer">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{post.platform}</Badge>
              <span className="text-sm text-muted-foreground">{timeAgo}</span>
            </div>
            <p className="text-sm text-foreground mb-3">{post.title}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>12.5K</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬</span>
                <span>850</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🔗</span>
                <span>420</span>
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

