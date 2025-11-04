// app/companies/[companyId]/page.tsx
import prisma from '@/db';
import OverviewDashboard from '@/components/overview-dashboard';
import { notFound } from 'next/navigation';

interface OverviewPageProps {
  params: Promise<{
    companyId: string;
  }>;
  searchParams: Promise<{
    userId?: string;
  }>;
}

export default async function OverviewPage({ params, searchParams }: OverviewPageProps) {
  const { companyId } = await params;
  const { userId } = await searchParams;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      socialAccounts: true,
      businessModel: {
        include: {
          revenueStreams: true,
          salesChannels: true,
          acquisitionChannels: true,
        },
      },
      revenueRecords: {
        orderBy: { periodStart: 'desc' },
        take: 1,
      },
      products: {
        take: 10,
      },
    },
  });

  if (!company) {
    notFound();
  }

  // Check if user is tracking this company
  let isTracking = false;
  if (userId) {
    const tracking = await prisma.userCompany.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
    });
    isTracking = !!tracking;
  }

  // Serialize company data
  const serializedCompany = {
    ...company,
    revenueRecords: company.revenueRecords.map((record) => ({
      ...record,
      periodStart: record.periodStart.toISOString(),
      periodEnd: record.periodEnd.toISOString(),
      amount: record.amount.toString(),
    })),
  };

  return <OverviewDashboard company={serializedCompany} initialIsTracking={isTracking} />;
}

