import { auth } from '@/app/lib/auth';
import prisma from '@/prisma/client';
import { Box, Card, Flex, Grid, Heading } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { Toaster } from 'react-hot-toast';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import StatusSelect from './StatusSelect';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

const fetchIssue = cache((issueId: number) =>
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
    <>
      <Toaster position="bottom-right" />
      <Grid columns={{ initial: '1', sm: '5' }} gap="6">
        <Box className="sm:col-span-4">
          <IssueDetails issue={issue} />
        </Box>

        {session && (
          <Box>
            <Card variant="surface">
              <Flex direction="column" gap="4">
                <Heading size="2" color="gray">Manage Issue</Heading>
                <AssigneeSelect issue={issue} />
                <StatusSelect issue={issue} />
                <Flex direction="column" gap="2" mt="2">
                  <EditIssueButton issueId={issue.id} />
                  <DeleteIssueButton issueId={issue.id} />
                </Flex>
              </Flex>
            </Card>
          </Box>
        )}
      </Grid>
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchIssue(parseInt(id, 10));
  return {
    title: issue?.title ?? 'Issue',
    description: 'Details of issue #' + issue?.id,
  };
}

export default IssueDetailPage;
