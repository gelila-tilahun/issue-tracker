'use client';
import { Card } from '@radix-ui/themes';
import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  // Map the incoming props into the array format Recharts requires
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          {/* Using a Radix accent color variable for clean styling */}
          <Bar dataKey="value" barSize={60} style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;