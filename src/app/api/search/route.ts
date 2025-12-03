// app/api/search/route.ts (simpler path)
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q');

    if (!q || q.trim().length < 2) {
      return NextResponse.json({
        companies: [],
        count: 0,
        message: 'Query too short',
      });
    }

    const companies = await prisma.company.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q.trim(),
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: q.trim(),
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        type: true,
        description: true,
      },
      take: 10,
    });

    return NextResponse.json({
      companies,
      count: companies.length,
      query: q,
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { companies: [], error: 'Search failed' },
      { status: 500 }
    );
  }
}

