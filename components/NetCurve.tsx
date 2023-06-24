'use client';

import { FC } from 'react';
import {
  AreaChart,
  Tooltip,
  Area,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from 'recharts';

import { percentageChange, formatCurrencyValue, getDateAndTime } from '@utils';

interface IData {
  timestamp: number;
  value: number;
}

const CustomTooltip: FC<{
  data: IData[];
  active?: boolean;
  payload?: any;
  label?: String | Number;
}> = ({ data, active, payload, label }) => {
  let value = data[data.length - 1].value;
  let percentage = percentageChange(value, data[0].value);
  let amountChange = formatCurrencyValue(value - data[0].value);
  let dateAndTime = getDateAndTime(data[data.length - 1].timestamp);

  if (active && payload && payload.length) {
    value = payload[0].value;
    percentage = percentageChange(value, data[0].value);
    amountChange = formatCurrencyValue(value - data[0].value);
    dateAndTime = getDateAndTime(Number(label));
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-1 align-items-center">
        <p
          className="fs-6 fw-bold m-0"
          style={{ textShadow: '0px 2.5px 5px rgba(8, 14, 20, 0.25)' }}
        >{`${formatCurrencyValue(value, 2)}`}</p>
        <p
          className={`fw-semibold ${
            percentage.isNegative ? 'text-danger' : 'text-success'
          }  m-0`}
          style={{
            fontSize: '14px',
            textShadow: '0px 2.5px 5px rgba(8, 14, 20, 0.25)',
          }}
        >
          {`${percentage.changeString} (${amountChange})`}
        </p>
      </div>
      <p
        className="text-primary fw-semibold m-0"
        style={{
          fontSize: '12px',
          textShadow: '0px 2.5px 5px rgba(8, 14, 20, 0.25)',
        }}
      >
        {dateAndTime}
      </p>
    </div>
  );
};

const CustomizedXAxisTick: FC<{
  x?: number;
  y?: number;
  payload?: any;
}> = ({ x, y, payload }) => {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="#94a6b3"
      style={{
        fontSize: '12px',
      }}
    >
      {getDateAndTime(payload.value)}
    </text>
  );
};

interface INetCurveProps {
  data: IData[];
  tooltip?: boolean;
  xAxis?: boolean;
  height?: number;
}

const NetCurve: FC<INetCurveProps> = ({
  data,
  tooltip = true,
  xAxis = true,
  height,
}) => {
  const isNegative = percentageChange(
    data[data.length - 1].value,
    data[0].value
  ).isNegative;

  return (
    <ResponsiveContainer width="100%" height={height ? height : 128}>
      <AreaChart data={data} style={{ cursor: 'pointer' }}>
        <defs>
          <linearGradient id="color-pos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={'#9DC644'} stopOpacity={0.8} />
            <stop offset="95%" stopColor={'#9DC644'} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="color-neg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={'#F05352'} stopOpacity={0.8} />
            <stop offset="95%" stopColor={'#F05352'} stopOpacity={0} />
          </linearGradient>
        </defs>
        {xAxis && (
          <XAxis
            dataKey="timestamp"
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            ticks={[data[0].timestamp, data[data.length - 1].timestamp]}
            tick={<CustomizedXAxisTick />}
            height={10}
          />
        )}
        <YAxis hide={true} type="number" domain={['auto', 'auto']} />
        {tooltip && (
          <Tooltip
            content={<CustomTooltip data={data} />}
            wrapperStyle={{ visibility: 'visible' }}
            cursor={{ strokeDasharray: '3 3' }}
            position={{
              x: 0,
              y: 0,
            }}
          />
        )}
        <Area
          type="monotone"
          dataKey="value"
          stroke={isNegative ? '#F05352' : '#9DC644'}
          fillOpacity={1}
          fill={isNegative ? 'url(#color-neg)' : 'url(#color-pos)'}
          animationDuration={1000}
          strokeWidth={1.5}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NetCurve;
