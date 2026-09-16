import prisma from "@/prisma/client";
import { unstable_cache } from "next/cache";

export interface IssueCounts {
  open: number;
  inProgress: number;
  closed: number;
}

export const getIssueCounts = unstable_cache(
  async (): Promise<IssueCounts> => {
    const rows = await prisma.issue.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const counts = { open: 0, inProgress: 0, closed: 0 };
    for (const row of rows) {
      if (row.status === "OPEN") counts.open = row._count.status;
      else if (row.status === "IN_PROGRESS") counts.inProgress = row._count.status;
      else if (row.status === "CLOSED") counts.closed = row._count.status;
    }
    return counts;
  },
  ["issue-counts"],
  { revalidate: 60 }
);
