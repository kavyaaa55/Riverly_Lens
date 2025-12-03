import { NextResponse } from 'next/server';
import prisma from '@/db';

export async function GET() {
    try {
        const companies = await prisma.company.findMany({
            select: {
                id: true,
                name: true,
                logoUrl: true,
                type: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return NextResponse.json({ data: companies });
    } catch (error) {
        console.error('Error fetching companies list:', error);
        return NextResponse.json(
            { error: 'Failed to fetch companies' },
            { status: 500 }
        );
    }
}
