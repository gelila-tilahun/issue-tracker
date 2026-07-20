import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { issueSchema } from '@/app/ValidationSchemas';
import { auth } from "@/app/lib/auth";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
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
    } 
    catch (error) {
        console.error('Prisma create issue failed:', error);
        return NextResponse.json(
            { error: 'Unable to create issue right now. Please try again later.' },
            { status: 500 }
        );
    }
}



