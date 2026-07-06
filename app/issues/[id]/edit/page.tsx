
import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
// 1. Change this to a standard static import
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

// Dynamically import IssueForm and provide a loading fallback 
const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'), 
  { 
   
    loading: () => <IssueFormSkeleton/>
    
  }
);



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