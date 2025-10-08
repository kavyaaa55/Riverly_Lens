// app/api/v1/companies/[companyId]/reports/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

// GET all reports for a company
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;

    const reports = await prisma.report.findMany({
      where: { companyId },
      include: {
        sources: true,
        topics: {
          include: {
            topic: true,
          },
        },
      },
      orderBy: { reportedAt: 'desc' },
    });

    return NextResponse.json({ data: reports }, { status: 200 });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

// POST - Create a new report
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const body = await request.json();

    const { title, summary, marketImpact, reportedAt, sources, topics } = body;

    // Validation
    if (!title || !reportedAt) {
      return NextResponse.json(
        { error: 'Missing required fields: title, reportedAt' },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        companyId,
        title,
        summary,
        marketImpact,
        reportedAt: new Date(reportedAt),
        sources: {
          create: sources?.map((url: string) => ({ url })) || [],
        },
      },
      include: {
        sources: true,
      },
    });

    return NextResponse.json({ data: report }, { status: 201 });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
}

