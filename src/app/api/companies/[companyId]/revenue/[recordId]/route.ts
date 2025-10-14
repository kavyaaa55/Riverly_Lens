// app/api/v1/companies/[companyId]/revenue/[recordId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { Decimal } from '@prisma/client/runtime/library';

// GET single revenue record (from RevenueRecord)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; recordId: string }> }
) {
  try {
    const { companyId, recordId } = await params;

    const record = await prisma.revenueRecord.findFirst({
      where: {
        id: recordId,
        companyId,
      },
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Revenue record not found' },
        { status: 404 }
      );
    }

    // Serialize
    const serializedRecord = {
      ...record,
      amount: record.amount.toString(),
    };

    return NextResponse.json({ data: serializedRecord }, { status: 200 });
  } catch (error) {
    console.error('Error fetching revenue record:', error);
    return NextResponse.json(
      { error: 'Failed to fetch revenue record' },
      { status: 500 }
    );
  }
}

// PATCH - Update revenue record (from RevenueRecord)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; recordId: string }> }
) {
  try {
    const { companyId, recordId } = await params;
    const body = await request.json();

    const { periodType, periodStart, periodEnd, amount } = body;

    const updatedRecord = await prisma.revenueRecord.updateMany({
      where: {
        id: recordId,
        companyId,
      },
      data: {
        ...(periodType && { periodType }),
        ...(periodStart && { periodStart: new Date(periodStart) }),
        ...(periodEnd && { periodEnd: new Date(periodEnd) }),
        ...(amount !== undefined && { amount: new Decimal(amount) }),
      },
    });

    if (updatedRecord.count === 0) {
      return NextResponse.json(
        { error: 'Revenue record not found' },
        { status: 404 }
      );
    }

    // Fetch updated record
    const record = await prisma.revenueRecord.findUnique({
      where: { id: recordId },
    });

    const serializedRecord = {
      ...record,
      amount: record!.amount.toString(),
    };

    return NextResponse.json({ data: serializedRecord }, { status: 200 });
  } catch (error) {
    console.error('Error updating revenue record:', error);
    return NextResponse.json(
      { error: 'Failed to update revenue record' },
      { status: 500 }
    );
  }
}

// DELETE revenue record (from RevenueRecord)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; recordId: string }> }
) {
  try {
    const { companyId, recordId } = await params;

    const record = await prisma.revenueRecord.findUnique({
      where: { id: recordId },
    });

    if (!record || record.companyId !== companyId) {
      return NextResponse.json(
        { error: 'Revenue record not found' },
        { status: 404 }
      );
    }

    await prisma.revenueRecord.delete({
      where: { id: recordId },
    });

    return NextResponse.json(
      { message: 'Revenue record deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting revenue record:', error);
    return NextResponse.json(
      { error: 'Failed to delete revenue record' },
      { status: 500 }
    );
  }
}

