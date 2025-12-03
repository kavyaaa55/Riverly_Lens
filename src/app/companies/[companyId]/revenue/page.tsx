import prisma from '@/db';
import { notFound } from 'next/navigation';
import { RevenueDashboard } from '@/components/revenue-dashboardd';

interface RevenuePageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function RevenuePage({ params }: RevenuePageProps) {
  const { companyId } = await params;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      revenueRecords: { orderBy: { periodStart: 'desc' } },
      revenueBreakdowns: { orderBy: { periodStart: 'desc' } },
      growthMetrics: { orderBy: { date: 'desc' }, take: 10 },
      profitability: { orderBy: { periodStart: 'desc' } }, // Correct: "profitability"
    },
  });

  if (!company) {
    notFound();
  }

  // Serialization: all Decimals to string, all Objects to plain objects (stringify if Date is needed)
  const serializedCompany = {
    ...company,
    revenueRecords: company.revenueRecords.map(r => ({
      ...r,
      periodStart: r.periodStart.toISOString(),
      periodEnd: r.periodEnd.toISOString(),
      amount: r.amount.toString(),
    })),
    revenueBreakdowns: company.revenueBreakdowns.map(b => ({
      ...b,
      periodStart: b.periodStart.toISOString(),
      periodEnd: b.periodEnd.toISOString(),
      amount: b.amount.toString(),
    })),
    growthMetrics: company.growthMetrics.map(g => ({
      ...g,
      date: g.date.toISOString(),
      valuePct: g.valuePct.toString(),
    })),
    profitability: company.profitability.map(p => ({
      ...p,
      periodStart: p.periodStart.toISOString(),
      periodEnd: p.periodEnd.toISOString(),
      grossMarginPct: p.grossMarginPct ? p.grossMarginPct.toString() : null,
      netMarginPct: p.netMarginPct ? p.netMarginPct.toString() : null,
      ebitdaMarginPct: p.ebitdaMarginPct ? p.ebitdaMarginPct.toString() : null,
    })),
  };

  return <RevenueDashboard />;
  // return <RevenueDashboard company={serializedCompany} />;
}

