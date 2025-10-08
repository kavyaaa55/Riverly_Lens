// app/companies/[companyId]/products/page.tsx
import prisma from '@/db';
import { ProductsDashboard } from '@/components/products-dashboard'
import { notFound } from 'next/navigation';

interface ProductsPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { companyId } = await params;

  // Fetch company with products
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      products: {
        orderBy: { releaseDate: 'desc' },
        include: {
          insights: {
            orderBy: { capturedAt: 'desc' },
            take: 1,
          },
        },
      },
    },
  });

  if (!company) {
    notFound();
  }

  // Serialize data
  const serializedCompany = {
    ...company,
    products: company.products.map((product) => ({
      ...product,
      insights: product.insights.map((insight) => ({
        ...insight,
        starsOutOf5: insight.starsOutOf5 ? insight.starsOutOf5.toString() : null,
      })),
    })),
  };

  return <ProductsDashboard company={serializedCompany} />;
}

