import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();


interface FinancialMetric {
  companyId: string;
  value: number;
  quarter: number;
  year: number;
  metricType: 'revenue' | 'marketCap' | 'grossProfit' | 'netProfit';
  companyName?: string;
}

interface DashboardData {
  keyFinancialMetrics: {
    marketCap: string;
    quarterlyRevenue: string;
    revenueGrowth: string;
    storeCount: number;
  };
  performanceIndicators: {
    revenueGrowth: number;
    marketShare: number;
    customerSatisfaction: number;
  };
}

interface CompanyRanking {
  companyId: string;
  companyName: string;
  revenue: number;
  marketCap: number;
  netProfit: number;
  rank: number;
}

// BST Node for efficient searching and sorting
class MetricNode {
  value: number;
  companyId: string;
  quarter: number;
  year: number;
  metricType: string;
  left: MetricNode | null = null;
  right: MetricNode | null = null;

  constructor(value: number, companyId: string, quarter: number, year: number, metricType: string) {
    this.value = value;
    this.companyId = companyId;
    this.quarter = quarter;
    this.year = year;
    this.metricType = metricType;
  }
}

// BST Implementation for O(log n) operations
class FinancialBST {
  root: MetricNode | null = null;

  insert(node: MetricNode): void {
    if (!this.root) {
      this.root = node;
      return;
    }
    this.insertRecursive(this.root, node);
  }

  private insertRecursive(current: MetricNode, newNode: MetricNode): void {
    if (newNode.value < current.value) {
      if (!current.left) current.left = newNode;
      else this.insertRecursive(current.left, newNode);
    } else {
      if (!current.right) current.right = newNode;
      else this.insertRecursive(current.right, newNode);
    }
  }

  // Range search for filtering
  findInRange(min: number, max: number): MetricNode[] {
    const result: MetricNode[] = [];
    this.rangeSearch(this.root, min, max, result);
    return result;
  }

  private rangeSearch(node: MetricNode | null, min: number, max: number, result: MetricNode[]): void {
    if (!node) return;
    if (node.value >= min && node.value <= max) result.push(node);
    if (node.value > min) this.rangeSearch(node.left, min, max, result);
    if (node.value < max) this.rangeSearch(node.right, min, max, result);
  }

  // In-order traversal for sorted results
  getSortedNodes(): MetricNode[] {
    const result: MetricNode[] = [];
    this.inorderTraversal(this.root, result);
    return result;
  }

  private inorderTraversal(node: MetricNode | null, result: MetricNode[]): void {
    if (!node) return;
    this.inorderTraversal(node.left, result);
    result.push(node);
    this.inorderTraversal(node.right, result);
  }

  // Find top K performers
  getTopK(k: number): MetricNode[] {
    const sorted = this.getSortedNodes();
    return sorted.slice(-k).reverse();
  }

  // Find companies above threshold
  findAboveThreshold(threshold: number): MetricNode[] {
    const result: MetricNode[] = [];
    this.thresholdSearch(this.root, threshold, result);
    return result;
  }

  private thresholdSearch(node: MetricNode | null, threshold: number, result: MetricNode[]): void {
    if (!node) return;
    if (node.value > threshold) {
      result.push(node);
      this.thresholdSearch(node.left, threshold, result);
    }
    this.thresholdSearch(node.right, threshold, result);
  }
}

// Main Finance Utilities Class
export class FinanceUtils {
  private revenueBST: FinancialBST = new FinancialBST();
  private marketCapBST: FinancialBST = new FinancialBST();
  private profitBST: FinancialBST = new FinancialBST();
  private isInitialized: boolean = false;

  // Initialize BSTs with database data
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    const revenues = await prisma.revenue.findMany({
      include: { company: true }
    });

    revenues.forEach(revenue => {
      if (revenue.revenue) {
        this.revenueBST.insert(new MetricNode(
          Number(revenue.revenue), revenue.companyId, revenue.quarter, revenue.year, 'revenue'
        ));
      }
      if (revenue.marketCap) {
        this.marketCapBST.insert(new MetricNode(
          Number(revenue.marketCap), revenue.companyId, revenue.quarter, revenue.year, 'marketCap'
        ));
      }
      if (revenue.netProfit) {
        this.profitBST.insert(new MetricNode(
          Number(revenue.netProfit), revenue.companyId, revenue.quarter, revenue.year, 'netProfit'
        ));
      }
    });

    this.isInitialized = true;
  }

  // Dashboard data exactly matching your screenshot
  async getDashboardData(companyId: string): Promise<DashboardData> {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        revenues: {
          orderBy: [{ year: 'desc' }, { quarter: 'desc' }],
          take: 2
        },
        overview: true
      }
    });

    if (!company || company.revenues.length === 0) {
      return {
        keyFinancialMetrics: {
          marketCap: '$0B',
          quarterlyRevenue: '$0B',
          revenueGrowth: '+0%',
          storeCount: 0
        },
        performanceIndicators: {
          revenueGrowth: 0,
          marketShare: 0,
          customerSatisfaction: 0
        }
      };
    }

    const latest = company.revenues[0];
    const previous = company.revenues[1];

    // Calculate revenue growth
    let growthPercent = 0;
    if (previous && Number(previous.revenue) > 0) {
      growthPercent = ((Number(latest.revenue) - Number(previous.revenue)) / Number(previous.revenue)) * 100;
    }

    // Mock performance indicators (you can implement real logic)
    const marketShare = Math.min(95, Math.max(10, Math.abs(growthPercent) + 60));
    const customerSatisfaction = Math.min(95, Math.max(70, 85 + (Math.abs(growthPercent) / 10)));

    return {
      keyFinancialMetrics: {
        marketCap: this.formatCurrency(Number(latest.marketCap || 0)),
        quarterlyRevenue: this.formatCurrency(Number(latest.revenue)),
        revenueGrowth: growthPercent >= 0 ? `+${Math.round(growthPercent)}%` : `${Math.round(growthPercent)}%`,
        storeCount: 0 // Add your store logic here
      },
      performanceIndicators: {
        revenueGrowth: Math.max(0, Math.round(Math.abs(growthPercent))),
        marketShare: Math.round(marketShare),
        customerSatisfaction: Math.round(customerSatisfaction)
      }
    };
  }

  // Search by revenue range using BST
  async searchByRevenue(minRevenue: number, maxRevenue: number): Promise<FinancialMetric[]> {
    await this.initialize();
    const nodes = this.revenueBST.findInRange(minRevenue, maxRevenue);
    return this.nodesToMetrics(nodes);
  }

  // Search by market cap range using BST
  async searchByMarketCap(minMarketCap: number, maxMarketCap: number): Promise<FinancialMetric[]> {
    await this.initialize();
    const nodes = this.marketCapBST.findInRange(minMarketCap, maxMarketCap);
    return this.nodesToMetrics(nodes);
  }

  // Get top performers using BST sorting
  async getTopPerformers(metric: 'revenue' | 'marketCap' | 'netProfit', limit: number): Promise<CompanyRanking[]> {
    await this.initialize();

    let bst = this.revenueBST;
    if (metric === 'marketCap') bst = this.marketCapBST;
    if (metric === 'netProfit') bst = this.profitBST;

    const topNodes = bst.getTopK(limit);
    const companyIds = topNodes.map(node => node.companyId);

    const companies = await prisma.company.findMany({
      where: { id: { in: companyIds } },
      include: {
        revenues: {
          orderBy: [{ year: 'desc' }, { quarter: 'desc' }],
          take: 1
        }
      }
    });

    return topNodes.map((node, index) => {
      const company = companies.find(c => c.id === node.companyId);
      const latestRevenue = company?.revenues[0];

      return {
        companyId: node.companyId,
        companyName: company?.name || 'Unknown',
        revenue: metric === 'revenue' ? node.value : Number(latestRevenue?.revenue || 0),
        marketCap: metric === 'marketCap' ? node.value : Number(latestRevenue?.marketCap || 0),
        netProfit: metric === 'netProfit' ? node.value : Number(latestRevenue?.netProfit || 0),
        rank: index + 1
      };
    });
  }

  // Advanced search and sort with multiple filters
  async advancedSearch(filters: {
    minRevenue?: number;
    maxRevenue?: number;
    minMarketCap?: number;
    maxMarketCap?: number;
    industry?: string;
    sortBy?: 'revenue' | 'marketCap' | 'netProfit';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
  }): Promise<CompanyRanking[]> {
    await this.initialize();

    let filteredNodes: MetricNode[] = [];

    // Apply filters using BST range queries
    if (filters.minRevenue !== undefined || filters.maxRevenue !== undefined) {
      const min = filters.minRevenue || 0;
      const max = filters.maxRevenue || Number.MAX_SAFE_INTEGER;
      filteredNodes = this.revenueBST.findInRange(min, max);
    } else {
      filteredNodes = this.revenueBST.getSortedNodes();
    }

    // Get company details
    const companyIds = filteredNodes.map(node => node.companyId);
    const companies = await prisma.company.findMany({
      where: {
        id: { in: companyIds },
        ...(filters.industry && { industry: filters.industry })
      },
      include: {
        revenues: {
          orderBy: [{ year: 'desc' }, { quarter: 'desc' }],
          take: 1
        }
      }
    });

    // Build ranking data
    let rankings = companies.map(company => {
      const latestRevenue = company.revenues[0];
      return {
        companyId: company.id,
        companyName: company.name,
        revenue: Number(latestRevenue?.revenue || 0),
        marketCap: Number(latestRevenue?.marketCap || 0),
        netProfit: Number(latestRevenue?.netProfit || 0),
        rank: 0
      };
    });

    // Sort using merge sort for stability
    const sortBy = filters.sortBy || 'revenue';
    rankings = this.mergeSort(rankings, sortBy, filters.sortOrder || 'desc');

    // Assign ranks
    rankings.forEach((item, index) => {
      item.rank = index + 1;
    });

    return filters.limit ? rankings.slice(0, filters.limit) : rankings;
  }

  // Get companies above threshold using BST
  async getCompaniesAboveThreshold(
    metric: 'revenue' | 'marketCap' | 'netProfit',
    threshold: number
  ): Promise<FinancialMetric[]> {
    await this.initialize();

    let bst = this.revenueBST;
    if (metric === 'marketCap') bst = this.marketCapBST;
    if (metric === 'netProfit') bst = this.profitBST;

    const nodes = bst.findAboveThreshold(threshold);
    return this.nodesToMetrics(nodes);
  }

  // Get financial analytics
  async getAnalytics(): Promise<{
    totalCompanies: number;
    averageRevenue: number;
    averageMarketCap: number;
    topRevenueCompany: string;
    companiesAbove1B: number;
    marketCapDistribution: { range: string; count: number }[];
  }> {
    await this.initialize();

    const totalCompanies = await prisma.company.count();
    const allRevenues = await prisma.revenue.findMany();

    const avgRevenue = allRevenues.reduce((sum, r) => sum + Number(r.revenue), 0) / allRevenues.length;
    const avgMarketCap = allRevenues.reduce((sum, r) => sum + Number(r.marketCap || 0), 0) / allRevenues.length;

    const topRevenue = this.revenueBST.getTopK(1)[0];
    const topCompany = await prisma.company.findUnique({
      where: { id: topRevenue?.companyId }
    });

    const companiesAbove1B = this.revenueBST.findAboveThreshold(1e9).length;

    // Market cap distribution
    const distribution = [
      { range: '0-1B', count: this.marketCapBST.findInRange(0, 1e9).length },
      { range: '1B-10B', count: this.marketCapBST.findInRange(1e9, 1e10).length },
      { range: '10B-100B', count: this.marketCapBST.findInRange(1e10, 1e11).length },
      { range: '100B+', count: this.marketCapBST.findAboveThreshold(1e11).length }
    ];

    return {
      totalCompanies,
      averageRevenue: avgRevenue,
      averageMarketCap: avgMarketCap,
      topRevenueCompany: topCompany?.name || 'Unknown',
      companiesAbove1B,
      marketCapDistribution: distribution
    };
  }

  // Utility: Merge Sort for stable sorting
  private mergeSort(arr: CompanyRanking[], key: keyof CompanyRanking, order: 'asc' | 'desc'): CompanyRanking[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid), key, order);
    const right = this.mergeSort(arr.slice(mid), key, order);

    return this.merge(left, right, key, order);
  }

  private merge(left: CompanyRanking[], right: CompanyRanking[], key: keyof CompanyRanking, order: 'asc' | 'desc'): CompanyRanking[] {
    const result: CompanyRanking[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      const leftVal = left[i][key] as number;
      const rightVal = right[j][key] as number;

      if (order === 'asc' ? leftVal <= rightVal : leftVal >= rightVal) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  // Utility: Convert nodes to metrics
  private nodesToMetrics(nodes: MetricNode[]): FinancialMetric[] {
    return nodes.map(node => ({
      companyId: node.companyId,
      value: node.value,
      quarter: node.quarter,
      year: node.year,
      metricType: node.metricType as 'revenue' | 'marketCap' | 'grossProfit' | 'netProfit'
    }));
  }

  // Utility: Format currency
  private formatCurrency(amount: number): string {
    if (amount >= 1e12) return `$${(amount / 1e12).toFixed(1)}T`;
    if (amount >= 1e9) return `$${(amount / 1e9).toFixed(0)}B`;
    if (amount >= 1e6) return `$${(amount / 1e6).toFixed(0)}M`;
    if (amount >= 1e3) return `$${(amount / 1e3).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  }
}

// Export singleton instance
export const financeUtils = new FinanceUtils();

// Export additional utility functions
export const formatPercentage = (value: number): string => {
  return value >= 0 ? `+${value.toFixed(1)}%` : `${value.toFixed(1)}%`;
};

export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const getPerformanceColor = (percentage: number): string => {
  if (percentage >= 80) return '#22c55e'; // Green
  if (percentage >= 60) return '#eab308'; // Yellow
  return '#ef4444'; // Red
};

