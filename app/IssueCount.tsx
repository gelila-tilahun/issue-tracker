import prisma from "@/prisma/client";

export interface IssueCounts {
  open: number;
  inProgress: number;
  closed: number;
}

export async function getIssueCounts(): Promise<IssueCounts> {
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: 'OPEN' } }),
    prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.issue.count({ where: { status: 'CLOSED' } }),
  ]);

  return { open, inProgress, closed };
}