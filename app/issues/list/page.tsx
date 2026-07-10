import { IssueStatusBadge, Link } from '@/app/components';
import NextLink from 'next/link';
import prisma from '@/prisma/client';
import { Table, Flex } from '@radix-ui/themes';
import IssuesActions from './IssuesActions';
import { Status, issue } from '@/app/generated/client'; // Fixed typo capitalization 'Issue'
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination  from '@/app/components/Pagination'; // Make sure this path matches your file tree

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ 
    status?: string; 
    orderBy?: keyof issue;
    page?: string; // Optional because initial page visits don't have it
  }>;
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

  // 4. Validate against the enum array
  const status = rawStatus && (statuses as string[]).includes(rawStatus)
    ? (rawStatus as Status)
    : undefined;

  // 5. Safely validate the orderBy value against your allowed columns array
  const isValidOrderBy = columns.map(c => c.value).includes(resolvedParams.orderBy!);
  
  const orderBy = isValidOrderBy 
    ? { [resolvedParams.orderBy!]: 'asc' } 
    : undefined;
    
  const where = { status }; 

  // FIXED: Reference resolvedParams instead of the raw un-resolved Promise
  const page = parseInt(resolvedParams.page || '1', 10) || 1;
  const pageSize = 10;

  // 6. Query the database using both status filtering and pagination variables
  const issues = await prisma.issue.findMany({
    where,
    orderBy, // FIXED: Added missing comma terminator
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="4">
      <IssuesActions />
      
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => ( 
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  query: { ...resolvedParams, orderBy: column.value }
                }}>
                  {column.label}
                </NextLink>
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

      {/* FIXED: Repaired broken JSX syntax elements, properties, and spellings here */}
      <Pagination 
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuesPage;