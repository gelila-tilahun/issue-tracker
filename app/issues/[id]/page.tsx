import { auth } from '@/app/lib/auth';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

const fetchIssue = cache(async (issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await auth();
  const { id } = await params;
  const issueId = parseInt(id, 10);

  if (!Number.isInteger(issueId) || issueId <= 0) notFound();

  const issue = await fetchIssue(issueId);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          {session && <AssigneeSelect issue={issue} />}
          {session && <EditIssueButton issueId={issue.id} />}
          {session && <DeleteIssueButton issueId={issue.id} />}
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id, 10));
  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}

export default IssueDetailPage;


