'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, BarChart2, DollarSign, Users, TrendingUp, Globe, Building2, PieChart, Newspaper, Target, ShoppingBag, MapPin } from 'lucide-react';
import Link from 'next/link';
import { COMPANY_CATEGORIES } from '@/lib/company-categories';

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
        whyChooseUs: string | null;
        keyPartners: string | null;
        costStructure: string | null;
    } | null;
    audience: {
        ageBuckets: any;
        gender: any;
        locations: any;
    } | null;
    products: Array<{
        name: string;
        description: string | null;
        imageUrl: string | null;
    }>;
    _count: {
        products: number;
        pressReleases: number;
        reports: number;
    };
}

export default function ComparePage() {
    const { data: session } = useSession();
    const [companies, setCompanies] = useState<CompanyList[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

    // Handle category selection
    const handleCategorySelect = (categoryId: string) => {
        setActiveCategory(categoryId);
        const category = COMPANY_CATEGORIES.find(c => c.id === categoryId);
        if (!category) return;

        // Map slugs to IDs
        const ids = category.companies.map(slug => {
            // Try exact match first, then loose match
            const company = companies.find(c => {
                const cSlug = c.name.toLowerCase().replace(/ /g, '-');
                return cSlug === slug || cSlug.includes(slug) || slug.includes(cSlug);
            });
            return company?.id;
        }).filter(Boolean) as string[];

        setSelectedIds(ids);
    };

    // Fetch comparison data when selections change
    useEffect(() => {
        const fetchComparison = async () => {
            if (selectedIds.length === 0) {
                setComparisonData([]);
                return;
            }

            const ids = selectedIds.join(',');

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
    }, [selectedIds]);

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

                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <SidebarTrigger />
                            <h1 className="text-lg font-semibold">Compare Companies</h1>
                        </div>
                    </header>

                    <main className="flex-1 p-6 overflow-y-auto">
                        {/* Category Selection Dropdown */}
                        <div className="mb-6">
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-sm font-medium text-muted-foreground">Select Category:</span>
                                <Select
                                    value={activeCategory || ""}
                                    onValueChange={(val) => {
                                        if (val) {
                                            handleCategorySelect(val);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Choose a category..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {COMPANY_CATEGORIES.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Manual Selection Fallback */}
                        <div className="mb-6">
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-sm text-muted-foreground">Or select manually:</span>
                                <Select
                                    value=""
                                    onValueChange={(val) => {
                                        if (!selectedIds.includes(val)) {
                                            setSelectedIds([...selectedIds, val]);
                                            setActiveCategory(null);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Add company..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companies.map((c) => (
                                            <SelectItem key={c.id} value={c.id} disabled={selectedIds.includes(c.id)}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {selectedIds.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedIds([]);
                                            setActiveCategory(null);
                                        }}
                                        className="text-muted-foreground"
                                    >
                                        Clear All
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Comparison Grid with Horizontal Scroll */}
                        {selectedIds.length > 0 ? (
                            <div className="overflow-x-auto pb-4 -mx-6 px-6">
                                <div className="flex gap-6 min-w-max pb-2">
                                    {selectedIds.map((id) => {
                                        const data = getCompanyData(id);

                                        if (!data && loading) return (
                                            <Card key={id} className="animate-pulse w-[340px] shrink-0">
                                                <CardHeader className="h-20 bg-gray-100" />
                                                <CardContent className="h-48 bg-gray-50" />
                                            </Card>
                                        );

                                        if (!data) return null;

                                        return (
                                            <div key={id} className="space-y-4 w-[340px] shrink-0">
                                                <Card className="border-t-4 border-t-primary">
                                                    <CardHeader className="pb-3">
                                                        <div className="flex items-start gap-3">
                                                            {data.logoUrl ? (
                                                                <Avatar className="h-12 w-12 shrink-0">
                                                                    <AvatarImage src={data.logoUrl} alt={data.name} />
                                                                    <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                                                                </Avatar>
                                                            ) : (
                                                                <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                                                                    <Building2 className="h-6 w-6 text-primary" />
                                                                </div>
                                                            )}
                                                            <div className="min-w-0 flex-1">
                                                                <Link href={`/companies/${data.id}`}>
                                                                    <CardTitle className="text-base leading-tight truncate hover:text-primary cursor-pointer transition-colors">
                                                                        {data.name}
                                                                    </CardTitle>
                                                                </Link>
                                                                <CardDescription className="text-xs truncate">{data.type || 'Company'}</CardDescription>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="pt-0 space-y-3">
                                                        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2rem]">
                                                            {data.description || 'No description available.'}
                                                        </p>

                                                        {/* Financials */}
                                                        <div className="space-y-2 pt-2 border-t">
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                                    <DollarSign className="h-3 w-3" /> Revenue
                                                                </span>
                                                                <span className="font-bold text-sm">
                                                                    {data.revenueRecords?.[0] ? formatCurrency(data.revenueRecords[0].amount) : '-'}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs text-muted-foreground">YoY Growth</span>
                                                                <span className={`font-bold text-sm ${Number(data.growthMetrics?.find(m => m.metric === 'YOY')?.valuePct) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                    {formatPercent(data.growthMetrics?.find(m => m.metric === 'YOY')?.valuePct)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Metrics Grid */}
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="p-2 bg-gray-50 rounded text-center">
                                                                <span className="text-[9px] text-muted-foreground block uppercase mb-0.5">Margin</span>
                                                                <span className="font-semibold text-xs">
                                                                    {data.profitability?.[0]?.grossMarginPct ? `${data.profitability[0].grossMarginPct}%` : '-'}
                                                                </span>
                                                            </div>
                                                            <div className="p-2 bg-gray-50 rounded text-center">
                                                                <span className="text-[9px] text-muted-foreground block uppercase mb-0.5">Followers</span>
                                                                <span className="font-semibold text-xs">
                                                                    {data.socialAccounts?.reduce((acc, curr) => acc + (curr.followers || 0), 0) > 0
                                                                        ? (data.socialAccounts.reduce((acc, curr) => acc + (curr.followers || 0), 0) / 1000000).toFixed(1) + 'M'
                                                                        : '-'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                <Card className="h-[180px] flex flex-col">
                                                    <CardHeader className="pb-2 shrink-0">
                                                        <CardTitle className="text-sm flex items-center gap-1.5">
                                                            <ShoppingBag className="h-4 w-4 text-primary" />
                                                            Top Products
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="pt-0 flex-1 overflow-y-auto">
                                                        {data.products?.length > 0 ? (
                                                            <div className="space-y-2">
                                                                {data.products.slice(0, 3).map((product, i) => (
                                                                    <div key={i} className="py-1.5 border-b last:border-0">
                                                                        <p className="text-xs font-medium truncate">{product.name}</p>
                                                                        <p className="text-[10px] text-muted-foreground line-clamp-2">{product.description || 'No description'}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-muted-foreground">No products listed.</p>
                                                        )}
                                                    </CardContent>
                                                </Card>

                                                {/* Business Model - Fixed Height */}
                                                <Card className="h-[200px] flex flex-col">
                                                    <CardHeader className="pb-2 shrink-0">
                                                        <CardTitle className="text-sm flex items-center gap-1.5">
                                                            <Target className="h-4 w-4 text-primary" />
                                                            Business Model
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="pt-0 space-y-2 flex-1 overflow-y-auto">
                                                        <div>
                                                            <h4 className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase">Value Prop</h4>
                                                            <p className="text-xs line-clamp-2">{data.businessModel?.valueProp || 'Not available'}</p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-[10px] font-semibold text-muted-foreground mb-0.5 uppercase">Why Choose Us</h4>
                                                            <p className="text-xs line-clamp-2">{data.businessModel?.whyChooseUs || 'Not available'}</p>
                                                        </div>
                                                    </CardContent>
                                                </Card>

                                                {/* Audience - Fixed Height */}
                                                <Card className="h-[160px] flex flex-col">
                                                    <CardHeader className="pb-2 shrink-0">
                                                        <CardTitle className="text-sm flex items-center gap-1.5">
                                                            <Users className="h-4 w-4 text-primary" />
                                                            Audience
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="pt-0 space-y-2 flex-1 overflow-y-auto">
                                                        {data.audience ? (
                                                            <>
                                                                <div>
                                                                    <h4 className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase">Gender</h4>
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="flex-1 bg-blue-100 rounded-full h-1.5 overflow-hidden">
                                                                            <div className="bg-blue-500 h-full" style={{ width: `${data.audience.gender?.male || 50}%` }} />
                                                                        </div>
                                                                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                                                            {data.audience.gender?.male || 0}% M
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-[10px] font-semibold text-muted-foreground mb-1 uppercase">Top Locations</h4>
                                                                    <div className="space-y-1">
                                                                        {Object.entries(data.audience.locations || {}).slice(0, 2).map(([loc, pct]: [string, any], i) => (
                                                                            <div key={i} className="flex justify-between text-[11px]">
                                                                                <span className="flex items-center gap-1 truncate"><MapPin className="h-2.5 w-2.5 shrink-0" /> {loc}</span>
                                                                                <span className="font-medium shrink-0">{pct}%</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <p className="text-xs text-muted-foreground">No audience data available.</p>
                                                        )}
                                                    </CardContent>
                                                </Card>

                                                {/* Latest News - Fixed Height */}
                                                <Card className="h-[180px] flex flex-col">
                                                    <CardHeader className="pb-2 shrink-0">
                                                        <CardTitle className="text-sm flex items-center gap-1.5">
                                                            <Newspaper className="h-4 w-4 text-primary" />
                                                            Latest News
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="pt-0 flex-1 overflow-y-auto">
                                                        {data.pressReleases?.length > 0 ? (
                                                            <div className="space-y-2">
                                                                {data.pressReleases.slice(0, 2).map((pr, i) => (
                                                                    <div key={i}>
                                                                        <a href={pr.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium hover:underline line-clamp-2 block">
                                                                            {pr.title}
                                                                        </a>
                                                                        <span className="text-[10px] text-muted-foreground">{formatDate(pr.publishedAt)}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs text-muted-foreground">No recent news available.</p>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                                <BarChart2 className="h-12 w-12 mb-4 opacity-20" />
                                <h3 className="text-lg font-medium text-gray-900">Select a category to compare</h3>
                                <p className="text-sm">Choose a category above or manually select companies to see insights.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
