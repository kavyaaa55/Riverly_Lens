// app/api/companies/[companyId]/products/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ companyId: string; productId: string }> }
) {
  try {
    const { companyId, productId } = await context.params;

    console.log('🔍 API called with:', { companyId, productId });

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        companyId,
      },
      include: {
        insights: {
          orderBy: { capturedAt: 'desc' },
        },
      },
    });

    console.log('📦 Product found:', product ? 'Yes' : 'No');

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Serialize the product data
    const serializedProduct = {
      ...product,
      releaseDate: product.releaseDate?.toISOString(),
      insights: product.insights.map(insight => ({
        ...insight,
        capturedAt: insight.capturedAt.toISOString(),
        starsOutOf5: insight.starsOutOf5 ? insight.starsOutOf5.toString() : null,
      })),
    };

    console.log('✅ Returning product data');

    return NextResponse.json({ data: serializedProduct }, { status: 200 });
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

