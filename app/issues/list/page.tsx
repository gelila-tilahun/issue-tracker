import { IssueStatusBadge, Link } from '@/app/components';
import NextLink from 'next/link';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssuesActions from './IssuesActions';
import { Status, issue } from '@/app/generated/client'; // Notice capital 'Issue'
import { ArrowUpIcon } from '@radix-ui/react-icons';

export const dynamic = 'force-dynamic';

interface Props {
  // searchParams is an asynchronous Promise in newer Next.js versions
  searchParams: Promise<{ status?: string; orderBy?: keyof issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // 1. Resolve the searchParams promise safely
  const resolvedParams = await searchParams;

  const columns: { 
    label: string; 
    value: keyof issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: "hidden md:table-cell" },
    { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" },
  ];

  // 2. Fetch all valid status enum values from your custom client
  const statuses = Object.values(Status);
  
  // 3. Convert query value to uppercase to prevent case-sensitivity filtering bypasses
  const rawStatus = resolvedParams.status?.toUpperCase();

  // 4. Validate against the enum array by casting statuses to a string array to clear the TS red line
  const status = rawStatus && (statuses as string[]).includes(rawStatus)
    ? (rawStatus as Status)
    : undefined;

  // 5. Safely validate the orderBy value against your allowed columns array
  const isValidOrderBy = columns.map(c => c.value).includes(resolvedParams.orderBy!);
  
  const orderBy = isValidOrderBy 
    ? { [resolvedParams.orderBy!]: 'asc' } 
    : undefined;

  // 6. Query the database using both status filtering and your verified orderBy column
  const issues = await prisma.issue.findMany({
    where: {
      status
    },
    orderBy
  });

  return (
    <div>
      <IssuesActions />
      <Table.Root variant="surface" className="mt-4">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => ( 
              // Added className to apply responsive hiding rules to the headers
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  // FIXED: Spread the resolved query object instead of the unresolved Promise
                  query: { ...resolvedParams, orderBy: column.value }
                }}>
                  {column.label}
                </NextLink>
                {/* FIXED: Compares against resolved properties */}
                {column.value === resolvedParams.orderBy && (
                  <ArrowUpIcon className="inline ml-1" />
                )}
              </Table.ColumnHeaderCell>          
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} >
                  {issue.title}
                </Link>
                {/* Mobile view fallback badge layout */}
                <div className='block md:hidden mt-1'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;