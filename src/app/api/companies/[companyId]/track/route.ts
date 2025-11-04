// app/api/companies/[companyId]/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

// GET - Check if company is tracked by user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const tracking = await prisma.userCompany.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
    });

    return NextResponse.json(
      {
        isTracking: !!tracking,
        data: tracking || null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking tracking status:', error);
    return NextResponse.json(
      { error: 'Failed to check tracking status' },
      { status: 500 }
    );
  }
}

// POST - Add company to user's rivalries
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if company exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Check if already tracking
    const existingTracking = await prisma.userCompany.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
    });

    if (existingTracking) {
      return NextResponse.json(
        {
          message: 'Company is already in your rivalries',
          data: existingTracking,
        },
        { status: 200 }
      );
    }

    // Add to tracking
    const tracking = await prisma.userCompany.create({
      data: {
        userId,
        companyId,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            type: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: `${company.name} added to your rivalries`,
        data: tracking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding company to rivalries:', error);
    return NextResponse.json(
      {
        error: 'Failed to add company to rivalries',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// DELETE - Remove company from user's rivalries
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Delete the tracking relationship
    const deletedTracking = await prisma.userCompany.deleteMany({
      where: {
        userId,
        companyId,
      },
    });

    if (deletedTracking.count === 0) {
      return NextResponse.json(
        { error: 'Company was not in your rivalries' },
        { status: 404 }
      );
    }

    // Get company name for response
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { name: true },
    });

    return NextResponse.json(
      {
        message: `${company?.name || 'Company'} removed from your rivalries`,
        count: deletedTracking.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error removing company from rivalries:', error);
    return NextResponse.json(
      {
        error: 'Failed to remove company from rivalries',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

