// app/api/news/[newsId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  try {
    const { newsId } = await params;

    // newsId is actually companyId
    // Fetch latest report for this company
    const report = await prisma.report.findFirst({
      where: { companyId: newsId },
      orderBy: { reportedAt: 'desc' },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            type: true,
            description: true,
          },
        },
        sources: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found for this company' },
        { status: 404 }
      );
    }

    // Serialize dates
    const serializedReport = {
      ...report,
      reportedAt: report.reportedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: serializedReport,
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

