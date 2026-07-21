import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@/app/generated/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';

export interface IssueQuery {
  status?: string;
  orderBy?: keyof Issue;
  page?: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell w-32' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell w-36' },
];

export const columnNames = columns.map((c) => c.value);

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Table header */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/70">
            {columns.map((col) => (
              <th
                key={col.value}
                className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide ${col.className ?? ''}`}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: col.value } }}
                  className="inline-flex items-center gap-1 hover:text-green-600 transition-colors"
                >
                  {col.label}
                  {col.value === searchParams.orderBy && (
                    <ArrowUpIcon className="text-green-600 w-3 h-3" />
                  )}
                </NextLink>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {issues.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm font-medium">No issues found</p>
                  <p className="text-xs">Try changing the filter or create a new issue</p>
                </div>
              </td>
            </tr>
          ) : (
            issues.map((issue) => (
              <tr key={issue.id} className="group hover:bg-green-50/40 transition-colors">
                <td className="px-4 py-3">
                  <NextLink
                    href={`/issues/${issue.id}`}
                    className="font-medium text-gray-800 group-hover:text-green-600 transition-colors line-clamp-1"
                  >
                    {issue.title}
                  </NextLink>
                  <div className="flex items-center gap-2 mt-1 md:hidden">
                    <IssueStatusBadge status={issue.status} />
                    <span className="text-xs text-gray-400">
                      {issue.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs whitespace-nowrap">
                  {issue.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;
