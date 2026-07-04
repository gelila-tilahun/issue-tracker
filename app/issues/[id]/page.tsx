import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';


export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ id: string }>
}

const IssueDetailPage = async ({ params }: Props) => {
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
  <Grid columns={{ initial: "1", md: "2" }} gap="5">
    <Box>
      <IssueDetails issue={issue}/>
    </Box>
    <Box>
      <EditIssueButton issueId={issue.id} />
    </Box>
  </Grid>

  )
}
export default IssueDetailPage
