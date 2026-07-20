import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patchIssueSchema } from "@/app/ValidationSchemas";
import delay from "delay";
import { auth } from "@/app/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 1. Resolve params (Required for Next.js 15+)
  const { id } = await params;
  const issueId = parseInt(id, 10);

  if (isNaN(issueId)) {
    return NextResponse.json(
      { error: "Invalid issue ID format" },
      { status: 400 },
    );
  }

  // 2. Validate request body
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // Extracted everything safely from validation.data once
  const { assignedToUserId, title, description } = validation.data;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid user." }, 
        { status: 400 });
    }
  }

  // 3. Check if the issue exists
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json(
        { error: "Invalid issue" }, 
        { status: 404 });
  }

  // 4. Update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { 
        title, 
        description, 
        assignedToUserId },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await delay(2000);
  
  // 1. Resolve params (Required for Next.js 15+)
  const { id } = await params;
  const issueId = parseInt(id, 10);

  if (isNaN(issueId)) {
    return NextResponse.json(
      { error: "Invalid issue ID format" },
      { status: 400 },
    ); 
  }

  // 2. Check if the issue exists
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  // 3. Delete the issue
  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({ message: "Issue deleted successfully" });
}