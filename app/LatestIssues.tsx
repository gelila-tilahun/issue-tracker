import prisma from '@/prisma/client';
import Link from 'next/link';
import { IssueStatusBadge } from './components';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 7,
    include: {
      assignedToUser: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Latest Issues</h2>
          <p className="text-xs text-gray-400 mt-0.5">Most recently created</p>
        </div>
        <Link
          href="/issues/list"
          className="text-xs text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
        >
          View all →
        </Link>
      </div>

      {issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <svg className="w-10 h-10 mb-2 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm">No issues yet</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {issues.map((issue) => (
            <div key={issue.id} className="py-3 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/issues/${issue.id}`}
                  className="text-sm font-medium text-gray-800 hover:text-green-600 transition-colors line-clamp-1"
                >
                  {issue.title}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <IssueStatusBadge status={issue.status} />
                  <span className="text-xs text-gray-400">
                    {issue.createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              {issue.assignedToUser ? (
                <div
                  className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700 shrink-0"
                  title={issue.assignedToUser.name ?? issue.assignedToUser.email ?? ''}
                >
                  {issue.assignedToUser.name?.[0]?.toUpperCase() ??
                    issue.assignedToUser.email?.[0]?.toUpperCase() ?? '?'}
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestIssues;
