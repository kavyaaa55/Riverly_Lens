// app/companies/[companyId]/page.tsx
import prisma from '@/db';
import OverviewDashboard from '@/components/overview-dashboard';
import { notFound } from 'next/navigation';

interface OverviewPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function OverviewPage({ params }: OverviewPageProps) {
  const { companyId } = await params;

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

  // Serialize company data - convert Decimal to string
  const serializedCompany = {
    ...company,
    revenueRecords: company.revenueRecords.map((record) => ({
      ...record,
      amount: record.amount.toString(), // Convert Decimal to string
    })),
  };

  return <OverviewDashboard company={serializedCompany} />;
}

