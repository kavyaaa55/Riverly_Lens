// app/api/v1/companies/[companyId]/press-releases/[pressReleaseId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

// GET single press release
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; pressReleaseId: string }> }
) {
  try {
    const { companyId, pressReleaseId } = await params;

    const pressRelease = await prisma.pressRelease.findFirst({
      where: {
        id: pressReleaseId,
        companyId,
      },
    });

    if (!pressRelease) {
      return NextResponse.json(
        { error: 'Press release not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: pressRelease }, { status: 200 });
  } catch (error) {
    console.error('Error fetching press release:', error);
    return NextResponse.json(
      { error: 'Failed to fetch press release' },
      { status: 500 }
    );
  }
}

// PATCH - Update press release
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; pressReleaseId: string }> }
) {
  try {
    const { companyId, pressReleaseId } = await params;
    const body = await request.json();

    const updatedPressRelease = await prisma.pressRelease.updateMany({
      where: {
        id: pressReleaseId,
        companyId,
      },
      data: body,
    });

    if (updatedPressRelease.count === 0) {
      return NextResponse.json(
        { error: 'Press release not found' },
        { status: 404 }
      );
    }

    const pressRelease = await prisma.pressRelease.findUnique({
      where: { id: pressReleaseId },
    });

    return NextResponse.json({ data: pressRelease }, { status: 200 });
  } catch (error) {
    console.error('Error updating press release:', error);
    return NextResponse.json(
      { error: 'Failed to update press release' },
      { status: 500 }
    );
  }
}

// DELETE press release
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; pressReleaseId: string }> }
) {
  try {
    const { companyId, pressReleaseId } = await params;

    await prisma.pressRelease.deleteMany({
      where: {
        id: pressReleaseId,
        companyId,
      },
    });

    return NextResponse.json(
      { message: 'Press release deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting press release:', error);
    return NextResponse.json(
      { error: 'Failed to delete press release' },
      { status: 500 }
    );
  }
}

