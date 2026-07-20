import Pagination from '@/app/components/Pagination'; // Make sure this path matches your file tree
import { Status } from '@/app/generated/client'; // Fixed typo capitalization 'Issue'
import prisma from '@/prisma/client';
import { Flex } from '@radix-ui/themes';
import IssuesActions from './IssuesActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Metadata } from 'next';

interface Props {
  searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
  // 1. Resolve the searchParams promise safely
  const resolvedParams = await searchParams;



  // 2. Fetch all valid status enum values from your custom client
  const statuses = Object.values(Status);
  
  // 3. Convert query value to uppercase to prevent case-sensitivity filtering bypasses
  const rawStatus = resolvedParams.status?.toUpperCase();

  // 4. Validate against the enum array
  const status = rawStatus && (statuses as string[]).includes(rawStatus)
    ? (rawStatus as Status)
    : undefined;

  // 5. Safely validate the orderBy value against your allowed columns array
  const isValidOrderBy = columnNames
  .includes(resolvedParams.orderBy!);
  
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
   < IssueTable searchParams={searchParams} issues={issues} />
  <Pagination 
        itemCount={issueCount} 
        pageSize={pageSize} 
        currentPage={page} 
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:'Issue Tracker - Issue List',
  description:'View all project issues'
};


export default IssuesPage;