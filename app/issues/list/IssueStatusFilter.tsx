'use client';

import { Status } from "@/app/generated/client";
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

// Changed 'value?' to an explicit 'ALL' string token for the fallback
const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
    const router = useRouter();

    return (
        <Select.Root onValueChange={(status) => {
            // If 'ALL' is chosen, omit the query entirely; otherwise, append the status
            const query = status && status !== 'ALL' ? `?status=${status}` : '';
            router.push('/issues/list' + query);
        }}>
            <Select.Trigger placeholder='Filter by status...' />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item key={status.value} value={status.value || ''}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default IssueStatusFilter;