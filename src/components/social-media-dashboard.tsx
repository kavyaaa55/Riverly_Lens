// components/social-media-dashboard.tsx
'use client';

import { Company, SocialAccount, SocialFollowerSnapshot, SocialTopPost } from '@prisma/client';
import { Users, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SocialAccountWithData = SocialAccount & {
  followerSnapshots: SocialFollowerSnapshot[];
  topPosts: SocialTopPost[];
};

type CompanyWithSocial = Company & {
  socialAccounts: SocialAccountWithData[];
};

interface SocialMediaDashboardProps {
  company: CompanyWithSocial;
}

export function SocialMediaDashboard({ company }: SocialMediaDashboardProps) {
  const { socialAccounts } = company;

  const instagramAccount = socialAccounts.find((acc) => acc.platform === 'INSTAGRAM');
  const twitterAccount = socialAccounts.find((acc) => acc.platform === 'TWITTER');
  const facebookAccount = socialAccounts.find((acc) => acc.platform === 'FACEBOOK');

  const calculateGrowth = (snapshots: SocialFollowerSnapshot[]) => {
    if (snapshots.length < 2) return 0;
    const latest = snapshots[snapshots.length - 1].count;
    const previous = snapshots[snapshots.length - 2].count;
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
            value={formatNumber(instagramAccount.followers || 0)}
            growth={calculateGrowth(instagramAccount.followerSnapshots)}
          />
        )}

        {twitterAccount && (
          <StatCard
            platform="Twitter"
            icon={<DollarSign className="w-5 h-5" />}
            value={formatCurrency(twitterAccount.followers || 0)}
            growth={calculateGrowth(twitterAccount.followerSnapshots)}
          />
        )}

        {facebookAccount && (
          <StatCard
            platform="Facebook"
            icon={<DollarSign className="w-5 h-5" />}
            value={formatCurrency(facebookAccount.followers || 0)}
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

// Stat Card Component with shadcn/ui
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

// Follower Growth Chart Component
function FollowerGrowthChart({ socialAccounts }: { socialAccounts: SocialAccountWithData[] }) {
  const getMonthLabels = () => {
    const months = new Set<string>();
    socialAccounts.forEach((account) => {
      account.followerSnapshots.forEach((snapshot) => {
        const month = new Date(snapshot.date).toLocaleString('default', { month: 'short' });
        months.add(month);
      });
    });
    return Array.from(months);
  };

  const months = getMonthLabels();

  return (
    <div className="relative" style={{ height: '300px' }}>
      <svg className="w-full h-full" viewBox="0 0 1200 300">
        {/* Grid lines */}
        {[0, 10, 20, 30, 40].map((y, i) => (
          <g key={i}>
            <line
              x1="40"
              y1={250 - (y * 5)}
              x2="1150"
              y2={250 - (y * 5)}
              stroke="currentColor"
              className="text-muted"
              strokeDasharray="5,5"
              opacity="0.2"
            />
            <text x="10" y={255 - (y * 5)} fontSize="12" fill="currentColor" className="text-muted-foreground">
              {y}
            </text>
          </g>
        ))}

        {/* Lines for each platform */}
        {socialAccounts.map((account, accountIndex) => {
          const color = accountIndex === 0 ? '#2563eb' : accountIndex === 1 ? '#ef4444' : '#93c5fd';
          const points = account.followerSnapshots.map((snapshot, i) => {
            const x = 100 + (i * 250);
            const y = 250 - ((snapshot.count / 1000000) * 5);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polyline
              key={account.id}
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
          );
        })}

        {/* X-axis labels */}
        {months.map((month, i) => (
          <text
            key={month}
            x={100 + (i * 250)}
            y="280"
            fontSize="12"
            fill="currentColor"
            className="text-muted-foreground"
            textAnchor="middle"
          >
            {month}
          </text>
        ))}
      </svg>
    </div>
  );
}

// Top Posts List Component
function TopPostsList({ socialAccounts }: { socialAccounts: SocialAccountWithData[] }) {
  const allPosts: Array<{ post: SocialTopPost; platform: string }> = [];

  socialAccounts.forEach((account) => {
    account.topPosts.forEach((post) => {
      allPosts.push({ post, platform: account.platform });
    });
  });

  allPosts.sort((a, b) => new Date(b.post.postedAt).getTime() - new Date(a.post.postedAt).getTime());

  return (
    <div className="space-y-4">
      {allPosts.slice(0, 10).map(({ post, platform }) => (
        <PostCard key={post.id} post={post} platform={platform} />
      ))}
    </div>
  );
}

// Post Card Component with shadcn/ui
function PostCard({ post, platform }: { post: SocialTopPost; platform: string }) {
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

