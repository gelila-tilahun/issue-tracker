
import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '@/app/issues/_components/IssueFormClient';



interface Props {  
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const issueId = parseInt(id, 10);

  if (isNaN(issueId)) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    notFound();
  }

  // 2. Just pass the data into the statically imported form
  return <IssueForm issue={issue} />;
};

export default Page;