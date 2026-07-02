import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueStatusBadge from '@/app/api/components/IssueStatusBadge'
import Link from 'next/link'
import React from 'react'

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

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-border bg-background p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{issue.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Issue #{issue.id}</p>
        </div>
        <IssueStatusBadge status={issue.status} />
      </div>

      <section className="space-y-6">
        <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="mt-4 whitespace-pre-line text-base leading-7 text-foreground">{issue.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Created</p>
            <p className="mt-2 text-base">{issue.createdAt.toDateString()}</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Updated</p>
            <p className="mt-2 text-base">{issue.updatedAt.toDateString()}</p>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <Link href="/issues" className="text-primary underline">
          Back to issues
        </Link>
      </div>
    </div>
  )
}

export default IssueDetailPage