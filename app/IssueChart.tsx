'use client';

import Link from 'next/link';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const SLICES = [
  { label: 'Open', color: '#ef4444', bg: 'bg-red-500', light: 'bg-red-50', text: 'text-red-600', status: 'OPEN' },
  { label: 'In Progress', color: '#8b5cf6', bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', status: 'IN_PROGRESS' },
  { label: 'Closed', color: '#22c55e', bg: 'bg-green-500', light: 'bg-green-50', text: 'text-green-600', status: 'CLOSED' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const slice = SLICES.find((s) => s.label === payload[0].name);
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-semibold" style={{ color: slice?.color }}>{payload[0].name}</p>
      <p className="text-gray-600">{payload[0].value} issue{payload[0].value !== 1 ? 's' : ''}</p>
    </div>
  );
};

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const values = [open, inProgress, closed];
  const total = open + inProgress + closed;
  const closedPct = total > 0 ? Math.round((closed / total) * 100) : 0;
  const openPct = total > 0 ? Math.round((open / total) * 100) : 0;

  const data = SLICES.map((s, i) => ({ name: s.label, value: values[i] }));

  // Fallback empty state for the donut
  const chartData = total === 0
    ? [{ name: 'No issues', value: 1 }]
    : data;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-full flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Issues Overview</h2>
          <p className="text-xs text-gray-400 mt-0.5">Distribution by status</p>
        </div>
        <Link
          href="/issues/list"
          className="text-xs text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Donut + legend */}
      <div className="flex flex-col sm:flex-row items-center gap-6">

        {/* Donut chart */}
        <div className="relative shrink-0 w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                paddingAngle={total === 0 ? 0 : 3}
                dataKey="value"
                strokeWidth={0}
              >
                {total === 0 ? (
                  <Cell fill="#f3f4f6" />
                ) : (
                  data.map((_, i) => (
                    <Cell key={i} fill={SLICES[i].color} fillOpacity={0.9} />
                  ))
                )}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-gray-800">{total}</span>
            <span className="text-xs text-gray-400">total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1 w-full">
          {SLICES.map((slice, i) => (
            <Link
              key={slice.label}
              href={`/issues/list?status=${slice.status}`}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${slice.bg}`} />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {slice.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* Mini bar */}
                <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                  <div
                    className={`h-full rounded-full ${slice.bg}`}
                    style={{ width: total > 0 ? `${Math.round((values[i] / total) * 100)}%` : '0%' }}
                  />
                </div>
                <span className={`text-sm font-semibold ${slice.text} min-w-[1.5rem] text-right`}>
                  {values[i]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats row */}
      {total > 0 && (
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50">
          <div className="bg-green-50 rounded-lg px-3 py-2.5">
            <p className="text-xs text-gray-400">Completion rate</p>
            <p className="text-xl font-bold text-green-600 mt-0.5">{closedPct}%</p>
          </div>
          <div className="bg-red-50 rounded-lg px-3 py-2.5">
            <p className="text-xs text-gray-400">Open rate</p>
            <p className="text-xl font-bold text-red-500 mt-0.5">{openPct}%</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div className="flex flex-col items-center justify-center py-4 text-gray-400 gap-1">
          <p className="text-sm">No issues tracked yet</p>
          <Link href="/issues/new" className="text-xs text-green-600 hover:underline">
            Create the first issue →
          </Link>
        </div>
      )}
    </div>
  );
};

export default IssueChart;
