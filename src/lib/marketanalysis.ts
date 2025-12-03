// lib/finance-utils.ts
import { PrismaClient, PeriodType } from "@prisma/client";

const prisma = new PrismaClient();

interface FinancialMetric {
  companyId: string;
  value: number;
  periodStart: Date;
  periodEnd: Date;
  metricType: "revenue" | "profit" | "growth";
  companyName?: string;
}

interface DashboardData {
  keyFinancialMetrics: {
    totalRevenue: string;
    revenueGrowth: string;
    grossMargin: string;
    netMargin: string;
  };
  performanceIndicators: {
    revenueGrowthPct: number;
    grossMarginPct: number;
    netMarginPct: number;
  };
}

interface CompanyRanking {
  companyId: string;
  companyName: string;
  revenue: number;
  netMargin: number;
  rank: number;
}


// Main Finance Utilities Class

export class FinanceUtils {
  // Get dashboard data for a company
  async getDashboardData(companyId: string): Promise<DashboardData> {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        revenueRecords: {
          orderBy: { periodEnd: "desc" },
          take: 2,
        },
        profitability: {
          orderBy: { periodEnd: "desc" },
          take: 1,
        },
        growthMetrics: {
          orderBy: { date: "desc" },
          take: 1,
        },
      },
    });

    if (!company || company.revenueRecords.length === 0) {
      return {
        keyFinancialMetrics: {
          totalRevenue: "$0",
          revenueGrowth: "+0%",
          grossMargin: "0%",
          netMargin: "0%",
        },
        performanceIndicators: {
          revenueGrowthPct: 0,
          grossMarginPct: 0,
          netMarginPct: 0,
        },
      };
    }

    const latest = company.revenueRecords[0];
    const prev = company.revenueRecords[1];

    const revenueNow = Number(latest.amount || 0);
    const revenuePrev = Number(prev?.amount || 0);
    const growthPct =
      revenuePrev > 0 ? ((revenueNow - revenuePrev) / revenuePrev) * 100 : 0;

    const grossMargin = Number(company.profitability[0]?.grossMarginPct || 0);
    const netMargin = Number(company.profitability[0]?.netMarginPct || 0);

    return {
      keyFinancialMetrics: {
        totalRevenue: this.formatCurrency(revenueNow),
        revenueGrowth: this.formatPercentage(growthPct),
        grossMargin: `${grossMargin.toFixed(1)}%`,
        netMargin: `${netMargin.toFixed(1)}%`,
      },
      performanceIndicators: {
        revenueGrowthPct: growthPct,
        grossMarginPct: grossMargin,
        netMarginPct: netMargin,
      },
    };
  }

  // Get top companies by total revenue
  async getTopRevenueCompanies(limit = 10): Promise<CompanyRanking[]> {
    const latestRecords = await prisma.revenueRecord.groupBy({
      by: ["companyId"],
      _sum: { amount: true },
      orderBy: { _sum: { amount: "desc" } },
      take: limit,
    });

    const companyIds = latestRecords.map((r) => r.companyId);
    const companies = await prisma.company.findMany({
      where: { id: { in: companyIds } },
      select: { id: true, name: true },
    });

    return latestRecords.map((rec, i) => {
      const c = companies.find((co) => co.id === rec.companyId);
      return {
        companyId: rec.companyId,
        companyName: c?.name ?? "Unknown",
        revenue: Number(rec._sum.amount ?? 0),
        netMargin: 0,
        rank: i + 1,
      };
    });
  }

  // Search revenue by range
  async searchRevenueRange(min: number, max: number): Promise<FinancialMetric[]> {
    const records = await prisma.revenueRecord.findMany({
      where: {
        amount: {
          gte: min,
          lte: max,
        },
      },
      include: { company: true },
      orderBy: { amount: "desc" },
    });

    return records.map((r) => ({
      companyId: r.companyId,
      companyName: r.company.name,
      value: Number(r.amount),
      periodStart: r.periodStart,
      periodEnd: r.periodEnd,
      metricType: "revenue",
    }));
  }

  // Compute growth trends for all companies
  async getRevenueGrowthTrends(): Promise<{
    companyName: string;
    growthPct: number;
  }[]> {
    const growthData = await prisma.growthMetric.findMany({
      where: { metric: "YOY" },
      include: { company: true },
      orderBy: { date: "desc" },
    });

    return growthData.map((g) => ({
      companyName: g.company.name,
      growthPct: Number(g.valuePct) * 100,
    }));
  }

  // Utility: Format currency
  private formatCurrency(value: number): string {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toLocaleString()}`;
  }

  // Utility: Format percentage
  private formatPercentage(value: number): string {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  }
}

// Export singleton instance
export const financeUtils = new FinanceUtils();

