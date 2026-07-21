import Link from 'next/link';
import { Status } from './generated/client';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const cards = [
  {
    label: 'Open',
    status: 'OPEN' as Status,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    icon: (
      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    label: 'In Progress',
    status: 'IN_PROGRESS' as Status,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    icon: (
      <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: 'Closed',
    status: 'CLOSED' as Status,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
    icon: (
      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const values = [open, inProgress, closed];
  const total = open + inProgress + closed;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((card, i) => (
        <Link
          key={card.label}
          href={`/issues/list?status=${card.status}`}
          className={`group rounded-xl border ${card.border} ${card.bg} p-4 hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {card.label}
            </span>
            {card.icon}
          </div>
          <div className={`text-3xl font-bold ${card.color}`}>
            {values[i]}
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/60 overflow-hidden">
            <div
              className={`h-full rounded-full ${card.color.replace('text-', 'bg-')}`}
              style={{ width: total > 0 ? `${Math.round((values[i] / total) * 100)}%` : '0%' }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {total > 0 ? Math.round((values[i] / total) * 100) : 0}% of total
          </p>
        </Link>
      ))}
    </div>
  );
};

export default IssueSummary;
