'use client';

import { Status } from "@/app/generated/client";
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

// Strict local array definition mapping strings explicitly
const statuses: { label: string; value: string }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root 
      // Fallback to 'ALL' if no status query exists in the URL
      defaultValue={searchParams.get('status') || 'ALL'}
      onValueChange={(status) => {
        const queryParams = new URLSearchParams();
        
        // Retain existing sorting/filtering values if present
        const currentOrderBy = searchParams.get('orderBy');
        if (currentOrderBy) queryParams.append('orderBy', currentOrderBy);
        
        // Append status only if it isn't the 'ALL' token
        if (status && status !== 'ALL') {
          queryParams.append('status', status);
        }

        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => (
          // FIXED: Guaranteed unique string keys prevent ScrollAreaViewport runtime drops
          <Select.Item key={`status-filter-${status.value}`} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;