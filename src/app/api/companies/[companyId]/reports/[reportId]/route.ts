// app/api/v1/companies/[companyId]/reports/[reportId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

// GET single report
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; reportId: string }> }
) {
  try {
    const { companyId, reportId } = await params;

    const report = await prisma.report.findFirst({
      where: {
        id: reportId,
        companyId,
      },
      include: {
        sources: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ data: report }, { status: 200 });
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}

// PATCH - Update report
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; reportId: string }> }
) {
  try {
    const { companyId, reportId } = await params;
    const body = await request.json();

    const { title, summary, marketImpact, reportedAt } = body;

    const updatedReport = await prisma.report.updateMany({
      where: {
        id: reportId,
        companyId,
      },
      data: {
        ...(title && { title }),
        ...(summary && { summary }),
        ...(marketImpact && { marketImpact }),
        ...(reportedAt && { reportedAt: new Date(reportedAt) }),
      },
    });

    if (updatedReport.count === 0) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: {
        sources: true,
      },
    });

    return NextResponse.json({ data: report }, { status: 200 });
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json(
      { error: 'Failed to update report' },
      { status: 500 }
    );
  }
}

// DELETE report
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; reportId: string }> }
) {
  try {
    const { companyId, reportId } = await params;

    await prisma.report.deleteMany({
      where: {
        id: reportId,
        companyId,
      },
    });

    return NextResponse.json(
      { message: 'Report deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { error: 'Failed to delete report' },
      { status: 500 }
    );
  }
}

