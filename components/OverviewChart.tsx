'use client';
import React, { FC, useState } from 'react';
import { Sector, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { pieChartData } from '@utils';

const COLORS = ['#F37E64', '#DAE17E', '#78CBBA', '#7492FC', '#B8ABEF'];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fill={'#080e14'}
        style={{ fontSize: '24px', fontWeight: 'bold' }}
      >
        {`${(percent * 100).toFixed()}%`}
      </text>
      <text
        x={cx}
        y={cy}
        dy={16}
        textAnchor="middle"
        fill={'#080e14'}
        style={{ fontWeight: 'bold' }}
      >
        {payload.symbol}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius - 30 - percent * 30}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius - (1 - percent) * 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius - (1 - percent) * 10 + 6}
        outerRadius={outerRadius - (1 - percent) * 10 + 10}
        fill={fill}
      />
    </g>
  );
};

const renderInActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
  } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius - 30 - percent * 30}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius - (1 - percent) * 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const OverviewChart: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width={196} height={196}>
      <PieChart>
        <defs>
          {COLORS.map((color, index) => (
            <linearGradient
              key={`colorUv${index}`}
              id={`colorUv${index}`}
              x1="0"
              y1="0"
              x2="1"
              y2="1"
              spreadMethod="reflect"
            >
              <stop offset="0" stopColor={color} stopOpacity={0.5} />
              <stop offset="1" stopColor={color} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          inactiveShape={renderInActiveShape}
          data={pieChartData}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={85}
          fill="url(#colorUv)"
          dataKey="value"
          paddingAngle={1}
          onMouseEnter={onPieEnter}
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#colorUv${index})`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;
