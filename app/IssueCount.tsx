import prisma from "@/prisma/client";
import { unstable_cache } from "next/cache";

export interface IssueCounts {
  open: number;
  inProgress: number;
  closed: number;
}

export const getIssueCounts = unstable_cache(
  async (): Promise<IssueCounts> => {
    const [open, inProgress, closed] = await Promise.all([
      prisma.issue.count({ where: { status: "OPEN" } }),
      prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
      prisma.issue.count({ where: { status: "CLOSED" } }),
    ]);
    return { open, inProgress, closed };
  },
  ["issue-counts"],
  { revalidate: 60 } // refresh every 60 seconds
);
