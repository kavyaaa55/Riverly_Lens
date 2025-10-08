// components/overview-dashboard.tsx
'use client';

import { Company, SocialAccount, BusinessModel, Product } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, TrendingUp, Store } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

type BusinessModelWithRelations = BusinessModel & {
  revenueStreams: any[];
  salesChannels: any[];
  acquisitionChannels: any[];
};

type SerializedRevenueRecord = {
  id: string;
  companyId: string;
  periodType: string;
  periodStart: Date;
  periodEnd: Date;
  amount: string;
};

type CompanyWithOverview = Company & {
  socialAccounts: SocialAccount[];
  businessModel: BusinessModelWithRelations | null;
  revenueRecords: SerializedRevenueRecord[];
  products: Product[];
};

interface OverviewDashboardProps {
  company: CompanyWithOverview;
}

export default function OverviewDashboard({ company }: OverviewDashboardProps) {
  const { socialAccounts, businessModel, revenueRecords } = company;
  const params = useParams();
  const pathname = usePathname();
  const companyId = params?.companyId as string;

  const instagramAccount = socialAccounts.find((acc) => acc.platform === 'INSTAGRAM');
  const instagramFollowers = instagramAccount?.followers || 0;
  const latestRevenue = revenueRecords[0]?.amount ? parseFloat(revenueRecords[0].amount) : 0;

  // Navigation tabs
  const tabs = [
    { name: 'Overview', href: `/companies/${companyId}` },
    { name: 'Social Media', href: `/companies/${companyId}/social` },
    { name: 'Revenue', href: `/companies/${companyId}/revenue` },
    { name: 'News & PR', href: `/companies/${companyId}/news` },
    { name: 'Products', href: `/companies/${companyId}/products` },
  ];

  const isActiveTab = (href: string) => {
    if (href === `/companies/${companyId}`) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="w-full space-y-6">
      {/* Company Header */}
      <div className="px-6 pt-6">
        <div className="flex items-start gap-4 mb-6">
          {company.logoUrl ? (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border bg-white flex-shrink-0">
              <img
                src={company.logoUrl}
                alt={company.name}
                className="w-full h-full object-contain p-2"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-lg border bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">
                {company.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
            <p className="text-muted-foreground mb-3">
              {company.description || 'No description available'}
            </p>
            {company.type && (
              <Badge variant="secondary" className="text-sm">
                {company.type}
              </Badge>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`pb-4 px-1 text-sm font-medium transition-colors border-b-2 ${isActiveTab(tab.href)
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                  }`}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Instagram Followers"
            icon={<Users className="w-5 h-5" />}
            value={formatNumber(instagramFollowers)}
            growth={2.3}
          />

          <StatCard
            title="Quarterly Revenue"
            icon={<DollarSign className="w-5 h-5" />}
            //value={`${formatRevenue(latestRevenue)}B`}
            value={`$134B`}
            growth={11.3}
          />

          <StatCard
            title="Market Cap"
            icon={<TrendingUp className="w-5 h-5" />}
            value="108.5B"
            subtitle="Current valuation"
            growth={0}
          />

          <StatCard
            title="Store Count"
            icon={<Store className="w-5 h-5" />}
            value="33,833"
            subtitle="Global locations"
            growth={0}
          />
        </div>

        {/* Business Model Overview */}
        {businessModel && (
          <Card>
            <CardHeader>
              <CardTitle>Business Model Overview</CardTitle>
              <CardDescription>Key components of {company.name}'s business strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Revenue Streams</h3>
                  <ul className="space-y-2">
                    {businessModel.revenueStreams.length > 0 ? (
                      businessModel.revenueStreams.map((stream: any, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{formatEnumValue(stream.stream)}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Retail Sales</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Licensing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Food Service</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Consumer Products</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3 text-gray-400">Key Partnerships</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">Nestle</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">PepsiCo</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">Spotify</span>
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <span className="text-sm">Uber Eats</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Cost Structure</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Store Operations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Supply Chain</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Marketing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Technology</span>
                    </li>
                  </ul>
                </div>
              </div>

              {businessModel.valueProp && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-2">Value Proposition</h3>
                  <p className="text-sm text-muted-foreground">{businessModel.valueProp}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  growth?: number;
  subtitle?: string;
}

function StatCard({ title, icon, value, growth, subtitle }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {growth !== undefined && growth !== 0 && (
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className={`w-4 h-4 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            <span className={`text-xs ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? '+' : ''}
              {growth.toFixed(1)}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

function formatRevenue(amount: number): string {
  if (amount >= 1000000000) return (amount / 1000000000).toFixed(1);
  return (amount / 1000000000).toFixed(1);
}

function formatEnumValue(value: string): string {
  return value.split('_').map((word) => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
}

