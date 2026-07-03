
import { IssueStatusBadge, Skeleton } from '@/app/components/';
import prisma from '@/prisma/client';
import { Card, Flex, Grid, Heading, Text, Box, Button, Link } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import {Pencil2Icon} from '@radix-ui/react-icons';


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
      where: { id: issueId },
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
  <Grid columns="2">
    <Box>
    <Heading>{issue.title}</Heading>
    <Flex className="space-x-3" my="2">
      <IssueStatusBadge status ={issue.status}/>
     <Text> {issue.createdAt.toDateString()} </Text>
    </Flex>
    <Card className='mt-4'>
      <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
    </Box>
    <Box>
      <Button> 
        <Pencil2Icon/>
         <Link>Edit Issue</Link> 
      </Button>
    </Box>
  </Grid>

  )
}
export default IssueDetailPage
