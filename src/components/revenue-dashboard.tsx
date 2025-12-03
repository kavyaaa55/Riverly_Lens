'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, BarChart3, PieChart, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// components/revenue-dashboard.tsx

type SerializedRevenueRecord = {
  id: string;
  companyId: string;
  periodType: string;
  periodStart: string;
  periodEnd: string;
  amount: string;
};
type SerializedRevenueBreakdown = {
  id: string;
  companyId: string;
  periodType: string;
  periodStart: string;
  periodEnd: string;
  kind: string;
  label: string;
  amount: string;
  productId: string | null;
};
type SerializedProfitabilityRecord = {
  id: string;
  companyId: string;
  periodType: string;
  periodStart: string;
  periodEnd: string;
  grossMarginPct: string | null;
  netMarginPct: string | null;
  ebitdaMarginPct: string | null;
};
type SerializedGrowthMetric = {
  id: string;
  companyId: string;
  metric: string;
  date: string;
  valuePct: string;
};
type CompanyForRevenueDashboard = {
  id: string;
  name: string;
  revenueRecords: SerializedRevenueRecord[];
  revenueBreakdowns: SerializedRevenueBreakdown[];
  profitability: SerializedProfitabilityRecord[];
  growthMetrics: SerializedGrowthMetric[];
};

interface RevenueDashboardProps {
  company: CompanyForRevenueDashboard;
}


export default function Fn({ company }: RevenueDashboardProps) {
  // Parse dates and numbers from serialized strings
  const revenueRecords = company.revenueRecords.map((r) => ({
    ...r,
    periodStart: new Date(r.periodStart),
    periodEnd: new Date(r.periodEnd),
    amount: parseFloat(r.amount),
  }));

  const revenueBreakdowns = company.revenueBreakdowns.map((b) => ({
    ...b,
    periodStart: new Date(b.periodStart),
    periodEnd: new Date(b.periodEnd),
    amount: parseFloat(b.amount),
  }));

  const profitabilityRecords = company.profitability.map((p) => ({
    ...p,
    periodStart: new Date(p.periodStart),
    periodEnd: new Date(p.periodEnd),
    grossMarginPct: p.grossMarginPct ? parseFloat(p.grossMarginPct) : null,
    netMarginPct: p.netMarginPct ? parseFloat(p.netMarginPct) : null,
    ebitdaMarginPct: p.ebitdaMarginPct ? parseFloat(p.ebitdaMarginPct) : null,
  }));

  const growthMetrics = company.growthMetrics.map((g) => ({
    ...g,
    date: new Date(g.date),
    valuePct: parseFloat(g.valuePct),
  }));

  // Chart data and latest values
  const revenueChartData = revenueRecords.slice(0, 12).reverse().map((record) => ({
    period: `${record.periodStart.getFullYear()} Q${Math.floor((record.periodStart.getMonth() + 2) / 3)}`,
    revenue: record.amount / 1000000000,
    date: record.periodStart,
  }));

  const latestRevenue = revenueRecords[0]?.amount || 0;

  const latestProfitability = profitabilityRecords[0];
  const grossMargin = latestProfitability?.grossMarginPct ?? 0;
  const netMargin = latestProfitability?.netMarginPct ?? 0;

  const latestGrowth = (growthMetrics.find((g) => g.metric === 'YOY')?.valuePct ?? 0) * 100;

  const recentBreakdowns = revenueBreakdowns.filter(
    (bd) => bd.periodStart.getTime() > Date.now() - 6 * 30 * 24 * 60 * 60 * 1000
  );
  const revenueBreakdown = recentBreakdowns.length
    ? recentBreakdowns.map((bd) => ({
      category: bd.label,
      amount: bd.amount,
      color: '#10B981',
    }))
    : [
      { category: 'Product Sales', amount: 60, color: '#10B981' },
      { category: 'Licensing', amount: 20, color: '#3B82F6' },
      { category: 'Services', amount: 15, color: '#F59E0B' },
      { category: 'Other', amount: 5, color: '#6B7280' },
    ];

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Revenue Analysis</h2>
        <p className="text-muted-foreground">Comprehensive financial performance and trends</p>
      </div>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Latest Quarter Revenue"
          value={`$${formatCurrency(latestRevenue)}B`}
          change={latestGrowth}
          icon={<DollarSign className="w-5 h-5" />}
          description="Q3 2025"
        />
        <MetricCard
          title="Gross Margin"
          value={`${grossMargin?.toFixed(1)}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          description="Latest Quarter"
          isPositive={+grossMargin > 0}
        />
        <MetricCard
          title="YoY Growth"
          value={`${latestGrowth.toFixed(1)}%`}
          change={latestGrowth}
          icon={<BarChart3 className="w-5 h-5" />}
          description="Revenue Growth"
          isPositive={latestGrowth > 0}
        />
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart (from RevenueRecord) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Quarterly revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}B`, 'Revenue']} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Revenue Breakdown (from RevenueBreakdown) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Revenue Breakdown
            </CardTitle>
            <CardDescription>Recent revenue sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.category}</span>
                  </div>
                  <span className="font-medium">
                    {latestRevenue
                      ? ((item.amount / latestRevenue) * 100).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Detailed Revenue Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quarterly Revenue Details</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          <CardDescription>Last 8 quarters</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>YoY Growth</TableHead>
                <TableHead>Gross Margin</TableHead>
                <TableHead>Net Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueRecords.slice(0, 8).map((record, index) => {
                const profitability = profitabilityRecords[index];
                const revenue = record.amount;
                const growthMetric = growthMetrics.find(
                  (g) => g.date.getTime() === record.periodStart.getTime()
                );
                const growth = growthMetric ? growthMetric.valuePct * 100 : 0;
                const grossMarginPct =
                  profitability?.grossMarginPct !== null
                    ? profitability?.grossMarginPct
                    : 0;
                const netMarginPct =
                  profitability?.netMarginPct !== null
                    ? profitability?.netMarginPct
                    : 0;

                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {record.periodType} {record.periodStart.getFullYear()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {record.periodStart.toLocaleDateString('en-US', { month: 'short' })} -{' '}
                          {record.periodEnd.toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${formatCurrency(revenue)}B</TableCell>
                    <TableCell>
                      <Badge variant={growth >= 0 ? 'default' : 'secondary'}>
                        {growth >= 0 ? '+' : ''}
                        {growth.toFixed(1)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{grossMarginPct?.toFixed(1)}%</TableCell>
                    <TableCell className={netMarginPct >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {netMarginPct?.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  description: string;
  isPositive?: boolean;
}

function MetricCard({
  title,
  value,
  change,
  icon,
  description,
  isPositive,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 mt-2 text-xs ${(change > 0 || isPositive) ? 'text-green-600' : 'text-red-600'
              }`}
          >
            <TrendingUp className="w-3 h-3" />
            {change > 0 ? '+' : ''}
            {change?.toFixed(1)}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatCurrency(amount: number): string {
  return (amount / 1000000000).toFixed(1);
}

