import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssuesActions from './IssuesActions';
import { Status } from '@/app/generated/client';

export const dynamic = 'force-dynamic';

interface Props {
  // searchParams is an asynchronous Promise in newer Next.js versions
  searchParams: Promise<{ status?: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // 1. Resolve the searchParams promise safely
  const resolvedParams = await searchParams;

  // 2. Fetch all valid status enum values from your custom client
  const statuses = Object.values(Status);
  
  // 3. Convert query value to uppercase to prevent case-sensitivity filtering bypasses
  const rawStatus = resolvedParams.status?.toUpperCase();

  // 4. Validate against the enum array by casting statuses to a string array to clear the TS red line
  const status = rawStatus && (statuses as string[]).includes(rawStatus)
    ? (rawStatus as Status)
    : undefined;

  // 5. Query the database (Prisma safely ignores 'undefined' keys and returns all items)
  const issues = await prisma.issue.findMany({
    where: {
      status
    }
  });

  return (
    <div>
      <IssuesActions />
      <Table.Root variant="surface" className="mt-4">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
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