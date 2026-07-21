import Pagination from '@/app/components/Pagination';
import { Status } from '@/app/generated/client';
import prisma from '@/prisma/client';
import { Metadata } from 'next';
import IssuesActions from './IssuesActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const statuses = Object.values(Status);
  const rawStatus = resolvedParams.status?.toUpperCase();
  const status = rawStatus && (statuses as string[]).includes(rawStatus)
    ? (rawStatus as Status)
    : undefined;

  const isValidOrderBy = columnNames.includes(resolvedParams.orderBy!);
  const orderBy = isValidOrderBy ? { [resolvedParams.orderBy!]: 'asc' } : undefined;
  const where = { status };
  const page = parseInt(resolvedParams.page || '1', 10) || 1;
  const pageSize = 10;

  const [issues, issueCount] = await Promise.all([
    prisma.issue.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        assignedToUser: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    }),
    prisma.issue.count({ where }),
  ]);

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Issues</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {issueCount} issue{issueCount !== 1 ? 's' : ''}
            {status ? ` · ${status.replace('_', ' ').toLowerCase()}` : ' total'}
          </p>
        </div>
      </div>

      <IssuesActions />
      <IssueTable searchParams={resolvedParams} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={page} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issues',
  description: 'View all project issues',
};

export default IssuesPage;
