import prisma from '@/prisma/client'
import IssueForm from '../../_components/IssueForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {  
  params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
  // Get the route parameter
  const { id } = await params
  const issueId = parseInt(id, 10)

  console.log('EditIssuePage params.id =', id, 'parsed id =', issueId)

  // Validate the ID
  if (!Number.isInteger(issueId) || issueId <= 0) {
    console.error('EditIssuePage invalid id:', id)
    notFound()
  }

  let issue

  try {
    issue = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
    })
  } catch (error) {
    console.error('EditIssuePage Prisma error:', error)
    throw error
  }

  console.log('EditIssuePage issue from DB:', issue)

  if (!issue) {
    console.error('EditIssuePage issue not found:', issueId)
    notFound()
  }

  return <IssueForm issue={issue} />
}

export default Page

