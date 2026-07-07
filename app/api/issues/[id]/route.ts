import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { issueSchema } from '@/app/ValidationSchemas';
import delay from "delay";

export async function PATCH(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    // 1. Resolve params (Required for Next.js 15+)
    const { id } = await params;
    const issueId = parseInt(id, 10);

    if (isNaN(issueId)) {
        return NextResponse.json({ error: 'Invalid issue ID format' }, { status: 400 });
    }

    // 2. Validate request body
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { title, description } = validation.data;

    // 3. Check if the issue exists
    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
    }

    // 4. Update the issue
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: { title, description }
    });

    return NextResponse.json(updatedIssue);
}




export async function DELETE(
    request: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    await delay (2000);
    // 1. Resolve params (Required for Next.js 15+)
    const { id } = await params;
    const issueId = parseInt(id, 10);

    if (isNaN(issueId)) {
        return NextResponse.json({ error: 'Invalid issue ID format' }, { status: 400 }); // 400 is more accurate for a bad format
    }

    // 2. Check if the issue exists
    const issue = await prisma.issue.findUnique({
        where: { id: issueId }
    });

    if (!issue) {
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    // 3. Delete the issue
    await prisma.issue.delete({
        where: { id: issueId }
    });

    // Return a 200 OK with a success message or empty object
    return NextResponse.json({ message: "Issue deleted successfully" });
}