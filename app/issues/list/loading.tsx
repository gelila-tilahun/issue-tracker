import { Skeleton } from '@/app/components';
import { Flex, Table } from '@radix-ui/themes';
import IssuesActions from './IssuesActions';

const LoadingIssuesPage = () => {
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Flex direction="column" gap="4">
      <IssuesActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={row}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden mt-1">
                  <Skeleton width="5rem" />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton width="6rem" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton width="8rem" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default LoadingIssuesPage;
