// app/api/v1/companies/[companyId]/products/[productId]/insights/[insightId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';
import { Decimal } from '@prisma/client/runtime/library';

// GET single insight
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; productId: string; insightId: string }> }
) {
  try {
    const { companyId, productId, insightId } = await params;

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

    const insight = await prisma.productInsight.findUnique({
      where: { id: insightId },
    });

    if (!insight || insight.productId !== productId) {
      return NextResponse.json(
        { error: 'Insight not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: insight }, { status: 200 });
  } catch (error) {
    console.error('Error fetching insight:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insight' },
      { status: 500 }
    );
  }
}

// PATCH - Update insight
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; productId: string; insightId: string }> }
) {
  try {
    const { companyId, productId, insightId } = await params;
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

    const insight = await prisma.productInsight.update({
      where: { id: insightId },
      data: {
        ...(source !== undefined && { source }),
        ...(starsOutOf5 !== undefined && { starsOutOf5: starsOutOf5 ? new Decimal(starsOutOf5) : null }),
        ...(likesSummary !== undefined && { likesSummary }),
        ...(dislikesSummary !== undefined && { dislikesSummary }),
      },
    });

    return NextResponse.json({ data: insight }, { status: 200 });
  } catch (error) {
    console.error('Error updating insight:', error);
    return NextResponse.json(
      { error: 'Failed to update insight' },
      { status: 500 }
    );
  }
}

// DELETE insight
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; productId: string; insightId: string }> }
) {
  try {
    const { companyId, productId, insightId } = await params;

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

    await prisma.productInsight.delete({
      where: { id: insightId },
    });

    return NextResponse.json(
      { message: 'Insight deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting insight:', error);
    return NextResponse.json(
      { error: 'Failed to delete insight' },
      { status: 500 }
    );
  }
}

