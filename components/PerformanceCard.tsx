import { FC } from 'react';

import { NetCurve } from '@components';
import { usdValue24h } from '@utils';

const PerformanceCard: FC = () => {
  return (
    <div className="card shadow p-4 gap-4 border-0 rounded-5 m-0 w-100">
      <div className="card-body p-0 m-0">
        <h5 className="card-title m-0 fw-semibold">Performance</h5>
        <h4 className="card-title m-0 pt-1 fw-bold">{`Assets on Ethereum`}</h4>
      </div>
      <NetCurve data={usdValue24h} height={200} />
    </div>
  );
};

export default PerformanceCard;
