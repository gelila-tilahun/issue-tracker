'use client';

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const BARS = [
  { label: 'Open', color: '#ef4444' },
  { label: 'In Progress', color: '#8b5cf6' },
  { label: 'Closed', color: '#22c55e' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const bar = BARS.find((b) => b.label === label);
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-lg px-4 py-2 text-sm">
      <p className="font-semibold" style={{ color: bar?.color }}>{label}</p>
      <p className="text-gray-600">{payload[0].value} issue{payload[0].value !== 1 ? 's' : ''}</p>
    </div>
  );
};

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-full">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Issues Overview</h2>
        <p className="text-xs text-gray-400 mt-0.5">Distribution by status</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={48} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={BARS[index].color} fillOpacity={0.9} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssueChart;
