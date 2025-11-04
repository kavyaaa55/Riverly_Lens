// app/api/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Get user's tracked companies
    const userCompanies = userId
      ? await prisma.userCompany.findMany({
        where: { userId },
        include: {
          company: {
            include: {
              socialAccounts: true,
              pressReleases: {
                orderBy: { publishedAt: 'desc' },
                take: 3,
              },
              reports: {
                orderBy: { reportedAt: 'desc' },
                take: 3,
              },
              revenueRecords: {
                orderBy: { periodStart: 'desc' },
                take: 1,
              },
              products: {
                orderBy: { releaseDate: 'desc' },
                take: 2,
              },
            },
          },
        },
        orderBy: { addedAt: 'desc' },
        take: 10,
      })
      : [];

    // Fallback: get all companies if no user or no tracked companies
    let companies = userCompanies.map((uc) => uc.company);

    if (companies.length === 0) {
      companies = await prisma.company.findMany({
        include: {
          socialAccounts: true,
          pressReleases: {
            orderBy: { publishedAt: 'desc' },
            take: 3,
          },
          reports: {
            orderBy: { reportedAt: 'desc' },
            take: 3,
          },
          revenueRecords: {
            orderBy: { periodStart: 'desc' },
            take: 1,
          },
          products: {
            orderBy: { releaseDate: 'desc' },
            take: 2,
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    }

    // Get recent news/reports
    const companyIds = companies.map((c) => c.id);

    const [recentPressReleases, recentReports] = await Promise.all([
      prisma.pressRelease.findMany({
        where: {
          companyId: { in: companyIds },
        },
        include: {
          company: { select: { id: true, name: true, logoUrl: true } },
        },
        orderBy: { publishedAt: 'desc' },
        take: 5,
      }),
      prisma.report.findMany({
        where: {
          companyId: { in: companyIds },
        },
        include: {
          company: { select: { id: true, name: true, logoUrl: true } },
        },
        orderBy: { reportedAt: 'desc' },
        take: 5,
      }),
    ]);

    // Get recent social activity
    const recentSocialActivity = await prisma.socialFollowerSnapshot.findMany({
      where: {
        socialAccount: {
          companyId: { in: companyIds },
        },
      },
      include: {
        socialAccount: {
          select: {
            platform: true,
            handle: true,
            followers: true,
          },
        },
      },
      orderBy: { date: 'desc' },
      take: 10,
    });

    // Calculate metrics
    const totalTrackedCompanies = companies.length;
    const totalNewsUpdates = recentPressReleases.length + recentReports.length;
    const totalSocialMentions = recentSocialActivity.length;

    // Revenue estimate
    const latestRevenues = await prisma.revenueRecord.findMany({
      where: {
        companyId: { in: companyIds },
        periodStart: {
          gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        },
      },
      select: { amount: true },
      orderBy: { periodStart: 'desc' },
      take: 10,
    });

    const totalRevenueEstimate = latestRevenues.reduce((sum, record) => {
      const amount = record.amount ? parseFloat(record.amount.toString()) : 0;
      return sum + amount;
    }, 0);

    // Serialize data with null safety
    const serializedUserCompanies = companies.map((company) => ({
      id: company.id,
      name: company.name || 'Unknown Company',
      description: company.description || null,
      type: company.type || null,
      logoUrl: company.logoUrl || null,
      createdAt: company.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: company.updatedAt?.toISOString() || new Date().toISOString(),
      revenueRecords: (company.revenueRecords || []).map((r) => ({
        id: r.id,
        companyId: r.companyId,
        periodType: r.periodType,
        periodStart: r.periodStart.toISOString(),
        periodEnd: r.periodEnd.toISOString(),
        amount: r.amount?.toString() || '0',
      })),
      socialAccounts: (company.socialAccounts || []).map((sa) => ({
        id: sa.id,
        companyId: sa.companyId,
        platform: sa.platform,
        handle: sa.handle || null,
        url: sa.url || null,
        followers: sa.followers?.toString() || null,
      })),
      pressReleases: (company.pressReleases || []).map((pr) => ({
        id: pr.id,
        companyId: pr.companyId,
        title: pr.title || 'Untitled',
        aiSummary: pr.aiSummary || null,
        sourceUrl: pr.sourceUrl || '',
        publishedAt: pr.publishedAt.toISOString(),
        priority: pr.priority,
      })),
      reports: (company.reports || []).map((r) => ({
        id: r.id,
        companyId: r.companyId,
        title: r.title || 'Untitled',
        summary: r.summary || null,
        marketImpact: r.marketImpact || null,
        reportedAt: r.reportedAt.toISOString(),
      })),
      products: (company.products || []).map((p) => ({
        id: p.id,
        companyId: p.companyId,
        name: p.name || 'Unknown Product',
        imageUrl: p.imageUrl || null,
        releaseDate: p.releaseDate?.toISOString() || null,
        productUrl: p.productUrl || null,
        description: p.description || null,
      })),
      _count: {
        pressReleases: company.pressReleases?.length || 0,
        socialAccounts: company.socialAccounts?.length || 0,
        products: company.products?.length || 0,
      },
    }));

    // Combine and serialize news with null safety
    const allNews = [...recentPressReleases, ...recentReports];
    const serializedNews = allNews.map((n) => {
      const isPressRelease = 'aiSummary' in n;
      return {
        id: n.id,
        title: n.title || 'Untitled',
        summary: ('summary' in n ? n.summary : n.aiSummary) || 'No summary available',
        marketImpact: ('marketImpact' in n ? n.marketImpact : null) || '',
        publishedAt: ('publishedAt' in n ? n.publishedAt : n.reportedAt).toISOString(),
        priority: ('priority' in n ? n.priority : 'MEDIUM') || 'MEDIUM',
        type: isPressRelease ? 'PRESS' : 'REPORT',
        company: {
          id: n.company.id,
          name: n.company.name || 'Unknown Company',
          logoUrl: n.company.logoUrl || null,
        },
      };
    });

    const todaysHotTopic = serializedNews.length > 0 ? serializedNews[0] : null;

    const dashboardData = {
      metrics: {
        totalTrackedCompanies,
        totalNewsUpdates,
        totalSocialMentions,
        totalRevenueEstimate: totalRevenueEstimate.toFixed(2),
        totalRevenueBillion: (totalRevenueEstimate / 1000000000).toFixed(1),
      },
      userCompanies: serializedUserCompanies,
      recentNews: serializedNews,
      recentSocialActivity: recentSocialActivity.map((sa) => ({
        id: sa.id,
        socialAccountId: sa.socialAccountId,
        date: sa.date.toISOString(),
        count: sa.count,
        socialAccount: {
          platform: sa.socialAccount.platform,
          handle: sa.socialAccount.handle || null,
          followers: sa.socialAccount.followers || null,
        },
      })),
      todaysHotTopic,
    };

    return NextResponse.json({ data: dashboardData }, { status: 200 });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to load dashboard data',
        details: error instanceof Error ? error.message : 'Unknown error',
        data: {
          metrics: {
            totalTrackedCompanies: 0,
            totalNewsUpdates: 0,
            totalSocialMentions: 0,
            totalRevenueEstimate: '0.00',
            totalRevenueBillion: '0.0',
          },
          userCompanies: [],
          recentNews: [],
          recentSocialActivity: [],
          todaysHotTopic: null,
        },
      },
      { status: 500 }
    );
  }
}

// POST - Add company to tracking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, companyName, companyId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let company;

    if (companyId) {
      // Find by ID
      company = await prisma.company.findUnique({ where: { id: companyId } });
      if (!company) {
        return NextResponse.json({ error: 'Company not found' }, { status: 404 });
      }
    } else if (companyName) {
      // Try to find by name
      company = await prisma.company.findFirst({
        where: {
          name: {
            equals: companyName.trim(),
            mode: 'insensitive',
          },
        },
      });

      // Create if not found
      if (!company) {
        company = await prisma.company.create({
          data: {
            name: companyName.trim(),
            description: 'New competitor added to tracking',
            type: 'B2C',
          },
        });
      }
    } else {
      return NextResponse.json(
        { error: 'Either companyId or companyName is required' },
        { status: 400 }
      );
    }

    // Check if already tracking
    const existingTracking = await prisma.userCompany.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId: company.id,
        },
      },
    });

    if (existingTracking) {
      return NextResponse.json(
        {
          message: 'Company is already being tracked',
          data: { companyId: company.id, companyName: company.name },
        },
        { status: 200 }
      );
    }

    // Add to tracking
    const tracking = await prisma.userCompany.create({
      data: {
        userId,
        companyId: company.id,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            logoUrl: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Company added to tracking successfully',
        data: {
          userId: tracking.userId,
          companyId: tracking.companyId,
          company: tracking.company,
          addedAt: tracking.addedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding company to tracking:', error);
    return NextResponse.json(
      {
        error: 'Failed to add company to tracking',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE - Remove company from tracking
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, companyId } = body;

    if (!userId || !companyId) {
      return NextResponse.json(
        { error: 'userId and companyId are required' },
        { status: 400 }
      );
    }

    const deletedTracking = await prisma.userCompany.deleteMany({
      where: {
        userId,
        companyId,
      },
    });

    if (deletedTracking.count === 0) {
      return NextResponse.json(
        { error: 'Tracking relationship not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Company removed from tracking successfully',
        count: deletedTracking.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing company from tracking:', error);
    return NextResponse.json(
      {
        error: 'Failed to remove company from tracking',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

