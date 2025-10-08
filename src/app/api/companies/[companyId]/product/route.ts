// app/api/v1/companies/[companyId]/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

// GET all products for a company
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;

    const products = await prisma.product.findMany({
      where: { companyId },
      include: {
        insights: {
          orderBy: { capturedAt: 'desc' },
          take: 1, // Get latest insight for each product
        },
      },
      orderBy: { releaseDate: 'desc' },
    });

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const { companyId } = await params;
    const body = await request.json();

    const { name, imageUrl, releaseDate, productUrl, description } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        { error: 'Missing required field: name' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        companyId,
        name,
        imageUrl,
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        productUrl,
        description,
      },
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

