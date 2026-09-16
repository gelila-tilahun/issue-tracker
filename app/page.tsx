import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import { getIssueCounts } from "./IssueCount";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View a summary of project issues",
};

export default async function Home() {
  const counts = await getIssueCounts();
  const total = counts.open + counts.inProgress + counts.closed;

  // Fetch latest issues sequentially after counts to stay within
  // the free DB's max_user_connections limit (connection_limit=1)
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 7,
    include: {
      assignedToUser: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
  });

  return (
    <Flex direction="column" gap="6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Ethio-telecome Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {total} total issue{total !== 1 ? "s" : ""} tracked
        </p>
      </div>

      {/* Summary cards */}
      <IssueSummary {...counts} />

      {/* Chart + Latest Issues */}
      <Grid columns={{ initial: "1", lg: "5" }} gap="5">
        <div className="lg:col-span-3">
          <IssueChart {...counts} />
        </div>
        <div className="lg:col-span-2">
          <LatestIssues issues={latestIssues} />
        </div>
      </Grid>

    </Flex>
  );
}
