// app/api/v1/companies/[companyId]/revenue/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { Decimal } from '@prisma/client/runtime/library';

// GET all revenue records for a company
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;

    const records = await prisma.revenueRecord.findMany({
      where: { companyId },
      orderBy: { periodStart: 'desc' },
      take: limit,
    });

    const serialized = records.map((r) => ({
      ...r,
      amount: r.amount.toString(),
    }));

    return NextResponse.json({ data: serialized }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
  }
}

// POST add a revenue record
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const body = await request.json();

    const { periodType, periodStart, periodEnd, amount } = body;

    if (!periodType || !periodStart || !periodEnd || !amount) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const record = await prisma.revenueRecord.create({
      data: {
        companyId,
        periodType,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        amount: new Decimal(amount),
      },
    });

    return NextResponse.json({ data: { ...record, amount: record.amount.toString() } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create record' }, { status: 500 });
  }
}

