import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from '@/prisma/client';

// Reuse the shared Prisma client singleton defined in prisma/client.ts

const createIssueSchema = z.object({
    title: z.string().min(1, 'Title is required.').max(255, 'Title must be less than 256 characters'),
    description: z.string().min(1, 'Description is required.'),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    try {
        const issue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description,
            },
        });

        return NextResponse.json(issue, { status: 201 });
    } catch (error) {
        console.error('Prisma create issue failed:', error);
        return NextResponse.json(
            { error: 'Unable to create issue right now. Please try again later.' },
            { status: 500 }
        );
    }
}



