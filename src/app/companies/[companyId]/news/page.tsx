// app/companies/[companyId]/news/page.tsx
import prisma from '@/db';
import { NewsPRDashboard } from '@/components/news-pr-dashboard';

interface NewsPRPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function NewsPRPage({ params }: NewsPRPageProps) {
  const { companyId } = await params;

  // Query by ID, not by name
  const company = await prisma.company.findUnique({
    where: {
      id: companyId, // Use ID instead of name
    },
    include: {
      pressReleases: {
        orderBy: { publishedAt: 'desc' },
        take: 20,
      },
      reports: {
        orderBy: { reportedAt: 'desc' },
        take: 20,
        include: {
          sources: true,
        },
      },
    },
  });

  if (!company) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Company Not Found</h1>
        <p>Looking for ID: {companyId}</p>
      </div>
    );
  }

  return <NewsPRDashboard company={company} />;
}

