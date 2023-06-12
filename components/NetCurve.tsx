'use client';

import { FC } from 'react';
import { AreaChart, Tooltip, Area, ResponsiveContainer, YAxis } from 'recharts';

import {
  usdValue24h,
  percentageChange,
  formatUSDValue,
  getDateAndTime,
} from '@utils';

const CustomTooltip: FC<{
  active?: boolean;
  payload?: any;
  label?: String | Number;
}> = ({ active, payload, label }) => {
  let usdValue = usdValue24h[usdValue24h.length - 1].usdValue;
  let percentage = percentageChange(usdValue, usdValue24h[0].usdValue);
  let amountChange = formatUSDValue(usdValue - usdValue24h[0].usdValue);
  let dateAndTime = getDateAndTime(
    usdValue24h[usdValue24h.length - 1].timestamp
  );

  if (active && payload && payload.length) {
    usdValue = payload[0].value;
    percentage = percentageChange(usdValue, usdValue24h[0].usdValue);
    amountChange = formatUSDValue(usdValue - usdValue24h[0].usdValue);
    dateAndTime = getDateAndTime(usdValue24h[Number(label)].timestamp);
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex gap-1 align-items-center">
        <p className="fs-6 fw-bold m-0">{`$${usdValue}`}</p>
        <p
          className={`fw-semibold ${
            percentage.isNegative ? 'text-danger' : 'text-success'
          }  m-0`}
          style={{ fontSize: '14px' }}
        >
          {`${percentage.changeString} (${amountChange})`}
        </p>
      </div>
      <p className="text-primary fw-semibold m-0" style={{ fontSize: '12px' }}>
        {dateAndTime}
      </p>
    </div>
  );
};

const NetCurve: FC = () => {
  const isNegative = percentageChange(
    usdValue24h[usdValue24h.length - 1].usdValue,
    usdValue24h[0].usdValue
  ).isNegative;

  return (
    <ResponsiveContainer width="100%" height={128}>
      <AreaChart data={usdValue24h} margin={{ left: 10 }}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={isNegative ? '#F05352' : '#9DC644'}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={isNegative ? '#F05352' : '#9DC644'}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{ visibility: 'visible' }}
          cursor={{ strokeDasharray: '3 3' }}
          position={{
            x: 10,
            y: 0,
          }}
        />
        <YAxis hide={true} type="number" domain={['auto', 'auto']} />
        <Area
          type="monotone"
          dataKey="usdValue"
          stroke={isNegative ? '#F05352' : '#9DC644'}
          fillOpacity={1}
          fill="url(#colorPv)"
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NetCurve;
