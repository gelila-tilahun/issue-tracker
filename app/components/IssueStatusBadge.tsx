import { Badge } from '@radix-ui/themes';
import { Status } from '@/app/generated/client';

const statusMap: Record<Status, { label: string; color: 'red' | 'violet' | 'green' }> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => (
  <Badge color={statusMap[status].color} radius="full" size="1">
    {statusMap[status].label}
  </Badge>
);

export default IssueStatusBadge;
