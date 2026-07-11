import { IssueStatusBadge } from '@/app/components';
import { issue } from '@/app/generated/client'; // Fixed typo capitalization 'Issue'
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import  Link  from '@/app/components/Link';
import  NextLink  from 'next/link';

export interface IssueQuery {
  status?: string; 
  orderBy?: keyof issue;
  page?: string; // Optional because initial page visits don't have it
}

interface Props {
  searchParams: IssueQuery,
  issues:issue[]
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const resolvedParams = await searchParams;


  return (
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
    
          
  )
}

  const columns: { 
    label: string; 
    value: keyof issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: "hidden md:table-cell" },
    { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" },
  ];

export const columnNames = columns.map(column => column.value);




export default IssueTable