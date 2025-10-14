// app/api/v1/companies/[companyId]/products/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db';

// GET single product with all insights
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; productId: string }> }
) {
  try {
    const { companyId, productId } = await params;

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

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PATCH - Update product
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; productId: string }> }
) {
  try {
    const { companyId, productId } = await params;
    const body = await request.json();

    const { name, imageUrl, releaseDate, productUrl, description } = body;

    const updatedProduct = await prisma.product.updateMany({
      where: {
        id: productId,
        companyId,
      },
      data: {
        ...(name && { name }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(releaseDate && { releaseDate: new Date(releaseDate) }),
        ...(productUrl !== undefined && { productUrl }),
        ...(description !== undefined && { description }),
      },
    });

    if (updatedProduct.count === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    return NextResponse.json({ data: product }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; productId: string }> }
) {
  try {
    const { companyId, productId } = await params;

    await prisma.product.deleteMany({
      where: {
        id: productId,
        companyId,
      },
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

