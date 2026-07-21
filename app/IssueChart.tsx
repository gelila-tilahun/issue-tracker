'use client';

import { Card, Heading } from '@radix-ui/themes';
import {
  Bar,
  BarChart,
  Cell,
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

const COLORS = ['#ef4444', '#8b5cf6', '#22c55e'];

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
    <Card>
      <Heading size="4" mb="4">Issues Overview</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} barSize={50}>
          <XAxis dataKey="label" tick={{ fontSize: 13 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
          <Tooltip
            contentStyle={{ borderRadius: '8px', fontSize: '13px' }}
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
