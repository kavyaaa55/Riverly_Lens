// components/revenue-dashboard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, DollarSign } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Fake data
const quarterlyRevenue = [
  { quarter: 'Q1 2023', revenue: 2850, profit: 425, margin: 14.9 },
  { quarter: 'Q2 2023', revenue: 3120, profit: 485, margin: 15.5 },
  { quarter: 'Q3 2023', revenue: 3450, profit: 540, margin: 15.7 },
  { quarter: 'Q4 2023', revenue: 3890, profit: 610, margin: 15.7 },
  { quarter: 'Q1 2024', revenue: 4180, profit: 695, margin: 16.6 },
  { quarter: 'Q2 2024', revenue: 4520, profit: 755, margin: 16.7 },
  { quarter: 'Q3 2024', revenue: 4850, profit: 820, margin: 16.9 },
  { quarter: 'Q4 2024', revenue: 5280, profit: 910, margin: 17.2 },
];

const monthlyRevenue = [
  { month: 'Jan', revenue: 1520 },
  { month: 'Feb', revenue: 1680 },
  { month: 'Mar', revenue: 1980 },
  { month: 'Apr', revenue: 1850 },
  { month: 'May', revenue: 2020 },
  { month: 'Jun', revenue: 2150 },
  { month: 'Jul', revenue: 2280 },
  { month: 'Aug', revenue: 2450 },
  { month: 'Sep', revenue: 2620 },
  { month: 'Oct', revenue: 2850 },
  { month: 'Nov', revenue: 3020 },
  { month: 'Dec', revenue: 3280 },
];

const segmentRevenue = [
  { segment: 'Watches', revenue: 14250, percentage: 52 },
  { segment: 'Jewellery', revenue: 8900, percentage: 32 },
  { segment: 'Eyewear', revenue: 3280, percentage: 12 },
  { segment: 'Accessories', revenue: 1100, percentage: 4 },
];

const pieData = [
  { name: 'Watches', value: 52 },
  { name: 'Jewellery', value: 32 },
  { name: 'Eyewear', value: 12 },
  { name: 'Accessories', value: 4 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export function RevenueDashboard() {
  const totalRevenue = quarterlyRevenue.reduce((sum, q) => sum + q.revenue, 0);

  return (
    <div className="w-full space-y-6 p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue}Cr</div>
            <p className="text-xs text-muted-foreground">Last 8 quarters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Quarter</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹5,280Cr</div>
            <p className="text-xs text-muted-foreground">Q4 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹910Cr</div>
            <p className="text-xs text-muted-foreground">Current quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17.2%</div>
            <p className="text-xs text-muted-foreground">Current quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quarterly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Revenue & Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={quarterlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Revenue (₹Cr)"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Profit (₹Cr)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue (2024)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue by Segment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Segment</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segment</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {segmentRevenue.map((item, index) => (
                <TableRow key={item.segment}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium">{item.segment}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">₹{item.revenue}Cr</TableCell>
                  <TableCell className="text-right">{item.percentage}%</TableCell>
                </TableRow>
              ))}
              <TableRow className="border-t-2">
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">
                  ₹{segmentRevenue.reduce((sum, s) => sum + s.revenue, 0)}Cr
                </TableCell>
                <TableCell className="text-right font-bold">100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quarterly Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quarterly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quarter</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Profit</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead className="text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quarterlyRevenue.map((q, index) => {
                const prevRevenue = index > 0 ? quarterlyRevenue[index - 1].revenue : q.revenue;
                const growth = ((q.revenue - prevRevenue) / prevRevenue) * 100;

                return (
                  <TableRow key={q.quarter}>
                    <TableCell className="font-medium">{q.quarter}</TableCell>
                    <TableCell className="text-right">₹{q.revenue}Cr</TableCell>
                    <TableCell className="text-right">₹{q.profit}Cr</TableCell>
                    <TableCell className="text-right">{q.margin}%</TableCell>
                    <TableCell className="text-right">
                      {index > 0 && (
                        <Badge variant={growth >= 0 ? 'default' : 'secondary'}>
                          {growth >= 0 ? '+' : ''}
                          {growth.toFixed(1)}%
                        </Badge>
                      )}
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

