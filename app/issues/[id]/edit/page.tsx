import { auth } from '@/app/lib/auth';
import prisma from '@/prisma/client';
import { notFound, redirect } from 'next/navigation';
import IssueForm from '@/app/issues/_components/IssueFormClient';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = async ({ params }: Props) => {
  const session = await auth();
  if (!session) redirect('/login');

  const { id } = await params;
  const issueId = parseInt(id, 10);

  if (isNaN(issueId)) notFound();

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id, 10) } });
  return { title: issue ? `Edit: ${issue.title}` : 'Edit Issue' };
}

export default EditIssuePage;
