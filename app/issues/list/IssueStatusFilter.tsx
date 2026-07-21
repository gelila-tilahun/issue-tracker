'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const statuses = [
  { label: 'All Issues', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('status') || 'ALL';

  const handleChange = (value: string) => {
    const params = new URLSearchParams();
    const orderBy = searchParams.get('orderBy');
    if (orderBy) params.append('orderBy', orderBy);
    if (value !== 'ALL') params.append('status', value);
    const query = params.toString() ? `?${params.toString()}` : '';
    router.push('/issues/list' + query);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 min-w-max sm:min-w-0">
        {statuses.map((s) => (
          <button
            key={s.value}
            onClick={() => handleChange(s.value)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              current === s.value
                ? 'bg-white text-green-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IssueStatusFilter;
