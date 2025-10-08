// app/dashboard/company/[companyId]/page.tsx (Social Media Tab)
import prisma from '@/db';
import { SocialMediaDashboard } from '@/components/social-media-dashboard';
import { notFound } from 'next/navigation';

interface SocialMediaPageProps {
  params: {
    companyId: string;
  };
}

export default async function SocialMediaPage({ params }: SocialMediaPageProps) {
  const { companyId } = params;

  // Fetch company with social accounts
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      socialAccounts: {
        include: {
          followerSnapshots: {
            orderBy: { date: 'asc' },
            take: 5, // Last 5 months
          },
          topPosts: {
            orderBy: { postedAt: 'desc' },
            take: 10,
          },
        },
      },
    },
  });

  if (!company) {
    notFound();
  }

  return <SocialMediaDashboard company={company} />;
}

