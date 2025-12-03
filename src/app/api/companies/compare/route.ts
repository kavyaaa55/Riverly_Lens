import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const idsParam = searchParams.get('ids');

        if (!idsParam) {
            return NextResponse.json({ data: [] });
        }

        const ids = idsParam.split(',').filter(Boolean);

        if (ids.length === 0) {
            return NextResponse.json({ data: [] });
        }

        const companies = await prisma.company.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            include: {
                socialAccounts: {
                    select: {
                        platform: true,
                        followers: true,
                        handle: true,
                    },
                },
                revenueRecords: {
                    orderBy: {
                        periodEnd: 'desc',
                    },
                    take: 1,
                },
                growthMetrics: {
                    orderBy: {
                        date: 'desc',
                    },
                    take: 2, // Get latest MoM and YoY if available
                },
                profitability: {
                    orderBy: {
                        periodEnd: 'desc',
                    },
                    take: 1,
                },
                revenueBreakdowns: {
                    orderBy: {
                        periodEnd: 'desc',
                    },
                    take: 5,
                },
                pressReleases: {
                    orderBy: {
                        publishedAt: 'desc',
                    },
                    take: 3,
                },
                reports: {
                    orderBy: {
                        reportedAt: 'desc',
                    },
                    take: 3,
                },
                businessModel: true,
                audience: true, // Fetch audience demographics
                products: {     // Fetch top products
                    take: 3,
                    orderBy: {
                        releaseDate: 'desc'
                    }
                },
                _count: {
                    select: {
                        products: true,
                        pressReleases: true,
                        reports: true,
                    },
                },
            },
        });

        return NextResponse.json({ data: companies });
    } catch (error) {
        console.error('Error fetching comparison data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comparison data' },
            { status: 500 }
        );
    }
}
