// app/api/v1/companies/[companyId]/social-accounts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
    const { companyId } = params;

    const socialAccounts = await prisma.socialAccount.findMany({
      where: { companyId },
      include: {
        followerSnapshots: {
          orderBy: { date: 'asc' },
        },
        topPosts: {
          orderBy: { postedAt: 'desc' },
          take: 10,
        },
      },
    });

    return NextResponse.json({ data: socialAccounts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching social accounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch social accounts' },
      { status: 500 }
    );
  }
}

