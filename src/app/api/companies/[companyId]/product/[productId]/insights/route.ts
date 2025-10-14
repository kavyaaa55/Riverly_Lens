// app/api/v1/companies/[companyId]/products/[productId]/insights/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { Decimal } from '@prisma/client/runtime/library';

// GET all insights for a product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; productId: string }> }
) {
  try {
    const { companyId, productId } = await params;

    // Verify product belongs to company
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        companyId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const insights = await prisma.productInsight.findMany({
      where: { productId },
      orderBy: { capturedAt: 'desc' },
    });

    return NextResponse.json({ data: insights }, { status: 200 });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}

// POST - Create a new product insight
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; productId: string }> }
) {
  try {
    const { companyId, productId } = await params;
    const body = await request.json();

    // Verify product belongs to company
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        companyId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const { source, starsOutOf5, likesSummary, dislikesSummary } = body;

    const insight = await prisma.productInsight.create({
      data: {
        productId,
        source,
        starsOutOf5: starsOutOf5 ? new Decimal(starsOutOf5) : null,
        likesSummary,
        dislikesSummary,
        capturedAt: new Date(),
      },
    });

    return NextResponse.json({ data: insight }, { status: 201 });
  } catch (error) {
    console.error('Error creating insight:', error);
    return NextResponse.json(
      { error: 'Failed to create insight' },
      { status: 500 }
    );
  }
}

