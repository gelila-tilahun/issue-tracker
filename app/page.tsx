import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import { getIssueCounts } from "./IssueCount";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View a summary of project issues",
};

export default async function Home() {
  const counts = await getIssueCounts();
  const total = counts.open + counts.inProgress + counts.closed;

  return (
    <Flex direction="column" gap="6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
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
          <LatestIssues />
        </div>
      </Grid>

    </Flex>
  );
}
