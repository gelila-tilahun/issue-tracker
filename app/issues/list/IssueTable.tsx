import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@/app/generated/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { Link } from '@radix-ui/themes';

export interface IssueQuery {
  status?: string;
  orderBy?: keyof Issue;
  page?: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const resolvedParams = await searchParams;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <div className="inline-flex items-center gap-1">
                <NextLink
                  href={{ query: { ...resolvedParams, orderBy: column.value } }}
                  className="hover:text-green-600 transition-colors"
                >
                  {column.label}
                </NextLink>
                {column.value === resolvedParams.orderBy && (
                  <ArrowUpIcon className="inline-block text-green-600" />
                )}
              </div>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={3} className="text-center text-gray-400 py-8">
              No issues found.
            </Table.Cell>
          </Table.Row>
        )}
        {issues.map((issue) => (
          <Table.Row key={issue.id} className="hover:bg-gray-50 transition-colors">
            <Table.Cell>
              <Link href={`/issues/${issue.id}`} className="font-medium hover:text-green-600">
                {issue.title}
              </Link>
              <div className="block md:hidden mt-1">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell text-gray-500 text-sm">
              {issue.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
