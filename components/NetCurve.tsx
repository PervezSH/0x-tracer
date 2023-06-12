'use client';

import { FC } from 'react';
import { AreaChart, Tooltip, Area, ResponsiveContainer, YAxis } from 'recharts';

import { price24h } from '@utils';

const NetCurve: FC = () => {
  return (
    <ResponsiveContainer width="100%" height={96}>
      <AreaChart data={price24h} margin={{ left: 10 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          position={{
            x: 10,
            y: 0,
          }}
        />
        <YAxis hide={true} type="number" domain={['auto', 'auto']} />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NetCurve;
