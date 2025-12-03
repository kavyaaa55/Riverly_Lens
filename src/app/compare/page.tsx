'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, BarChart2, DollarSign, Users, TrendingUp, Globe, Building2, Percent, Target, PieChart, Newspaper } from 'lucide-react';
import Link from 'next/link';

interface CompanyList {
    id: string;
    name: string;
    logoUrl: string | null;
    type: string | null;
}

interface ComparisonData {
    id: string;
    name: string;
    logoUrl: string | null;
    type: string | null;
    description: string | null;
    socialAccounts: Array<{
        platform: string;
        followers: number | null;
        handle: string | null;
    }>;
    revenueRecords: Array<{
        amount: string;
        periodEnd: string;
        periodType: string;
    }>;
    growthMetrics: Array<{
        metric: string;
        valuePct: string;
        date: string;
    }>;
    profitability: Array<{
        grossMarginPct: string | null;
        netMarginPct: string | null;
    }>;
    revenueBreakdowns: Array<{
        label: string;
        amount: string;
        kind: string;
    }>;
    pressReleases: Array<{
        title: string;
        publishedAt: string;
        sourceUrl: string;
    }>;
    reports: Array<{
        title: string;
        reportedAt: string;
        summary: string | null;
    }>;
    businessModel: {
        valueProp: string | null;
        customerSegments: string | null;
    } | null;
    _count: {
        products: number;
        pressReleases: number;
        reports: number;
    };
}

export default function ComparePage() {
    const { data: session } = useSession();
    const [companies, setCompanies] = useState<CompanyList[]>([]);
    const [selectedId1, setSelectedId1] = useState<string>('');
    const [selectedId2, setSelectedId2] = useState<string>('');
    const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch company list on mount
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await fetch('/api/companies/list');
                const data = await res.json();
                if (data.data) {
                    setCompanies(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch companies:', error);
            }
        };
        fetchCompanies();
    }, []);

    // Fetch comparison data when selections change
    useEffect(() => {
        const fetchComparison = async () => {
            if (!selectedId1 && !selectedId2) {
                setComparisonData([]);
                return;
            }

            const ids = [selectedId1, selectedId2].filter(Boolean).join(',');
            if (!ids) return;

            setLoading(true);
            try {
                const res = await fetch(`/api/companies/compare?ids=${ids}`);
                const data = await res.json();
                if (data.data) {
                    setComparisonData(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch comparison data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComparison();
    }, [selectedId1, selectedId2]);

    const getCompanyData = (id: string) => comparisonData.find(c => c.id === id);

    const formatCurrency = (amount: string | number) => {
        const val = Number(amount);
        if (isNaN(val)) return '-';
        if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        return `$${val.toLocaleString()}`;
    };

    const formatPercent = (val: string | number | null | undefined) => {
        const num = Number(val);
        if (isNaN(num) || val === null || val === undefined) return '-';
        return `${(num * 100).toFixed(1)}%`;
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-white flex w-full">
                <Sidebar className="bg-white border-r border-gray-200">
                    <SidebarContent>
                        <div className="p-4">
                            <Link href="/dashboard" className="flex items-center space-x-2 mb-6">
                                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                    <BarChart2 className="size-4" />
                                </div>
                                <span className="font-bold text-lg">RivalryLens</span>
                            </Link>
                        </div>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/dashboard">
                                                <BarChart2 className="h-4 w-4" />
                                                <span>Dashboard</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive>
                                            <Link href="/compare">
                                                <ArrowRight className="h-4 w-4" />
                                                <span>Compare</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <div className="flex-1 flex flex-col">
                    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <SidebarTrigger />
                            <h1 className="text-lg font-semibold">Compare Companies</h1>
                        </div>
                    </header>

                    <main className="flex-1 p-6 overflow-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* Selection 1 */}
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-muted-foreground">Company A</label>
                                <Select value={selectedId1} onValueChange={setSelectedId1}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select company..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companies.map((c) => (
                                            <SelectItem key={c.id} value={c.id} disabled={c.id === selectedId2}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Selection 2 */}
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-muted-foreground">Company B</label>
                                <Select value={selectedId2} onValueChange={setSelectedId2}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select company..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companies.map((c) => (
                                            <SelectItem key={c.id} value={c.id} disabled={c.id === selectedId1}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Comparison Grid */}
                        {(selectedId1 || selectedId2) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[selectedId1, selectedId2].map((id, index) => {
                                    if (!id) return <div key={`empty-${index}`} className="hidden md:block" />;

                                    const data = getCompanyData(id);
                                    if (!data && loading) return (
                                        <Card key={id} className="animate-pulse">
                                            <CardHeader className="h-24 bg-gray-100" />
                                            <CardContent className="h-64 bg-gray-50" />
                                        </Card>
                                    );

                                    if (!data) return null;

                                    return (
                                        <div key={id} className="space-y-6">
                                            {/* Header Card */}
                                            <Card className="border-t-4 border-t-primary">
                                                <CardHeader className="flex flex-row items-center gap-4">
                                                    {data.logoUrl ? (
                                                        <Avatar className="h-16 w-16">
                                                            <AvatarImage src={data.logoUrl} alt={data.name} />
                                                            <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                    ) : (
                                                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <Building2 className="h-8 w-8 text-primary" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <CardTitle className="text-2xl">{data.name}</CardTitle>
                                                        <CardDescription>{data.type || 'Company'}</CardDescription>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                                        {data.description || 'No description available.'}
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            {/* Financials & Growth */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg flex items-center">
                                                        <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                                                        Financials & Growth
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                        <span className="text-sm text-muted-foreground flex items-center">
                                                            <DollarSign className="h-4 w-4 mr-2" /> Revenue
                                                        </span>
                                                        <span className="font-bold text-lg">
                                                            {data.revenueRecords?.[0]
                                                                ? formatCurrency(data.revenueRecords[0].amount)
                                                                : '-'}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="p-3 bg-gray-50 rounded-lg">
                                                            <span className="text-xs text-muted-foreground block">MoM Growth</span>
                                                            <span className={`font-bold ${Number(data.growthMetrics?.find(m => m.metric === 'MOM')?.valuePct) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {formatPercent(data.growthMetrics?.find(m => m.metric === 'MOM')?.valuePct)}
                                                            </span>
                                                        </div>
                                                        <div className="p-3 bg-gray-50 rounded-lg">
                                                            <span className="text-xs text-muted-foreground block">YoY Growth</span>
                                                            <span className={`font-bold ${Number(data.growthMetrics?.find(m => m.metric === 'YOY')?.valuePct) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {formatPercent(data.growthMetrics?.find(m => m.metric === 'YOY')?.valuePct)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="p-3 bg-gray-50 rounded-lg">
                                                            <span className="text-xs text-muted-foreground block">Gross Margin</span>
                                                            <span className="font-bold">
                                                                {data.profitability?.[0]?.grossMarginPct ? `${data.profitability[0].grossMarginPct}%` : '-'}
                                                            </span>
                                                        </div>
                                                        <div className="p-3 bg-gray-50 rounded-lg">
                                                            <span className="text-xs text-muted-foreground block">Net Margin</span>
                                                            <span className="font-bold">
                                                                {data.profitability?.[0]?.netMarginPct ? `${data.profitability[0].netMarginPct}%` : '-'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Revenue Breakdown */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg flex items-center">
                                                        <PieChart className="h-5 w-5 mr-2 text-primary" />
                                                        Revenue Breakdown
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    {data.revenueBreakdowns?.length > 0 ? (
                                                        <div className="space-y-3">
                                                            {data.revenueBreakdowns.map((item, i) => (
                                                                <div key={i} className="flex justify-between items-center text-sm">
                                                                    <span className="text-muted-foreground">{item.label}</span>
                                                                    <span className="font-medium">{formatCurrency(item.amount)}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-muted-foreground">No breakdown available.</p>
                                                    )}
                                                </CardContent>
                                            </Card>

                                            {/* Business Model */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg flex items-center">
                                                        <Target className="h-5 w-5 mr-2 text-primary" />
                                                        Business Model
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-1">Value Proposition</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {data.businessModel?.valueProp || 'Not available'}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-1">Customer Segments</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {data.businessModel?.customerSegments || 'Not available'}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Latest News */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg flex items-center">
                                                        <Newspaper className="h-5 w-5 mr-2 text-primary" />
                                                        Latest News
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-4">
                                                        {data.pressReleases?.length > 0 && (
                                                            <div>
                                                                <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Press Releases</h4>
                                                                <div className="space-y-2">
                                                                    {data.pressReleases.map((pr, i) => (
                                                                        <div key={i} className="text-sm">
                                                                            <a href={pr.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline block truncate">
                                                                                {pr.title}
                                                                            </a>
                                                                            <span className="text-xs text-muted-foreground">{formatDate(pr.publishedAt)}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {data.reports?.length > 0 && (
                                                            <div>
                                                                <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase mt-4">Reports</h4>
                                                                <div className="space-y-2">
                                                                    {data.reports.map((report, i) => (
                                                                        <div key={i} className="text-sm">
                                                                            <p className="font-medium block truncate">{report.title}</p>
                                                                            <span className="text-xs text-muted-foreground">{formatDate(report.reportedAt)}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {!data.pressReleases?.length && !data.reports?.length && (
                                                            <p className="text-sm text-muted-foreground">No recent news available.</p>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Social & Activity */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg flex items-center">
                                                        <Globe className="h-5 w-5 mr-2 text-primary" />
                                                        Social & Activity
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                        <span className="text-sm text-muted-foreground flex items-center">
                                                            <Users className="h-4 w-4 mr-2" /> Total Followers
                                                        </span>
                                                        <span className="font-bold text-lg">
                                                            {data.socialAccounts?.reduce((acc, curr) => acc + (curr.followers || 0), 0).toLocaleString() || '-'}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="p-3 bg-gray-50 rounded-lg">
                                                            <span className="text-xs text-muted-foreground block">Products</span>
                                                            <span className="font-bold">{data._count?.products || 0}</span>
                                                        </div>
                                                        <div className="p-3 bg-gray-50 rounded-lg">
                                                            <span className="text-xs text-muted-foreground block">Press Releases</span>
                                                            <span className="font-bold">{data._count?.pressReleases || 0}</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
