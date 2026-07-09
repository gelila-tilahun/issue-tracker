import { authOptions } from '@/app/lib/auth';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import delay from 'delay';
// import { getServerSession } from '';
import { notFound } from 'next/navigation';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import AssigneeSelect from './AssigneeSelect';

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

const IssueDetailPage = async ({ params }: Props) => {
 // const session = await getServerSession(authOptions);

  const { id } = await params
  const issueId = parseInt(id, 10)
  console.log('IssueDetailPage params.id =', id, 'parsed id =', issueId)

  if (!Number.isInteger(issueId) || issueId <= 0) {
    console.error('IssueDetailPage invalid id', (await params).id)
    notFound()
  }

  let issue
  try {
    issue = await prisma.issue.findUnique({
      where: { id: issueId }, //fetching issuse -->database
    })
  } catch (error) {
    console.error('IssueDetailPage prisma error', error)
    throw error
  }

  console.log('IssueDetailPage issue from DB', issue)

  if (!issue) {
    console.error('IssueDetailPage issue not found', issueId)
    notFound()
  }

await delay(2000);

  return (
  <Grid columns={{ initial: "1", sm: "5" }} gap="5">
    <Box className ='md:col-span-4'>
      <IssueDetails issue={issue}/>
    </Box>
      <Box>
      <Flex direction="column" gap="4">
        <AssigneeSelect issue={issue} />
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id}/>
      </Flex>
    </Box>
  </Grid>

  )
}
export default IssueDetailPage


