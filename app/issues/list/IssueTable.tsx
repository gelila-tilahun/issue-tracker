import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@/app/generated/client';
//import Link from '@/app/components/Link';
import { ButtonDemo } from '@/components/ButtonUsage';

import { Button, Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import {Link} from '@radix-ui/themes';
import { ArrowUpIcon } from '@radix-ui/react-icons';


export interface IssueQuery {
  status?: string; 
  orderBy?: keyof Issue;
  page?: string; 
}

interface Props {
  searchParams: IssueQuery,
  issues: Issue[]
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const resolvedParams = await searchParams;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => ( 
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              {/* Flex alignment layout to keep text and icon perfectly inline */}
              <div className="inline-flex items-center gap-1">
                <NextLink href={{
                  query: { ...resolvedParams, orderBy: column.value }
                }}>
                  {column.label}
                </NextLink>
                
                
               {column.value === resolvedParams.orderBy && (
                  //<ArrowUpIcon className="inline-block" />,
                  <ButtonDemo/>
                )}
               
              </div>
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
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: "hidden md:table-cell" },
  { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" },
];

export const columnNames = columns.map(column => column.value);

export default IssueTable;