// app/api/v1/companies/[companyId]/press-releases/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

// GET all press releases for a company
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;

    const pressReleases = await prisma.pressRelease.findMany({
      where: { companyId },
      orderBy: { publishedAt: 'desc' },
    });

    return NextResponse.json({ data: pressReleases }, { status: 200 });
  } catch (error) {
    console.error('Error fetching press releases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch press releases' },
      { status: 500 }
    );
  }
}

// POST - Create a new press release
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const body = await request.json();

    const { title, aiSummary, sourceUrl, publishedAt, priority } = body;

    // Validation
    if (!title || !sourceUrl || !publishedAt) {
      return NextResponse.json(
        { error: 'Missing required fields: title, sourceUrl, publishedAt' },
        { status: 400 }
      );
    }

    const pressRelease = await prisma.pressRelease.create({
      data: {
        companyId,
        title,
        aiSummary,
        sourceUrl,
        publishedAt: new Date(publishedAt),
        priority: priority || 'MEDIUM',
      },
    });

    return NextResponse.json({ data: pressRelease }, { status: 201 });
  } catch (error) {
    console.error('Error creating press release:', error);
    return NextResponse.json(
      { error: 'Failed to create press release' },
      { status: 500 }
    );
  }
}

