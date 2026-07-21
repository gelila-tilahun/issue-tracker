import { Card, Flex, Text } from '@radix-ui/themes';
import { Status } from './generated/client';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    color: string;
  }[] = [
    { label: 'Open', value: open, status: 'OPEN', color: 'text-red-500' },
    { label: 'In Progress', value: inProgress, status: 'IN_PROGRESS', color: 'text-violet-500' },
    { label: 'Closed', value: closed, status: 'CLOSED', color: 'text-green-600' },
  ];

  return (
    <Flex gap="3">
      {containers.map((container) => (
        <Card key={container.label} className="flex-1">
          <Flex direction="column" gap="1" align="center" p="2">
            <Text size="6" weight="bold" className={container.color}>
              {container.value}
            </Text>
            <Link
              href={`/issues/list?status=${container.status}`}
              className="text-xs text-gray-500 hover:text-green-600 transition-colors text-center"
            >
              {container.label}
            </Link>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
