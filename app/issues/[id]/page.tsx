import { auth } from '@/app/lib/auth';
import prisma from '@/prisma/client';
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
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main content */}
        <div className="lg:col-span-4 min-w-0">
          <IssueDetails issue={issue} />
        </div>

        {/* Sidebar — below on mobile, right column on desktop */}
        {session && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-5 lg:sticky lg:top-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Manage
              </p>
              <AssigneeSelect issue={issue} />
              <StatusSelect issue={issue} />
              <div className="pt-2 border-t border-gray-100 flex flex-row lg:flex-col gap-2">
                <EditIssueButton issueId={issue.id} />
                <DeleteIssueButton issueId={issue.id} />
              </div>
            </div>
          </div>
        )}
      </div>
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
