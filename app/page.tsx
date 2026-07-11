import { Grid, Flex } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { getIssueCounts } from "./IssueCount"; // Adjust path as needed
import { Metadata } from "next";

export default async function Home() {
  // Single, clean encapsulation point
  const counts = await getIssueCounts();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...counts} />
        <IssueChart {...counts} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}


export const metadata: Metadata = {
  title:'Issue Tracker - Dashboard',
  description:'View a summary of project issues'
};