import React from 'react';
import Image from 'next/image';
import { OverviewChart } from '@components';

const OverviewCard = () => {
  return (
    <div
      className="card m-0 gap-5 border-0 shadow-lg rounded-4"
      style={{ padding: '40px', width: 'fit-content' }}
    >
      <div className="card-body p-0 m-0">
        <div className="d-flex justify-content-between">
          <p className="card-text fs-5 fw-semibold p-0 m-0">Overview</p>
          <Image
            src="assets/icons/open.svg"
            alt="open-icon"
            width={24}
            height={24}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <h4 className="card-title m-0 pt-1 fw-bold">
          <span className="fs-5">$</span>
          {`18,966,580`}
        </h4>
      </div>
      <div className="d-flex justify-content-center align-items-center px-4">
        <div className="d-flex position-relative" style={{ width: '196px' }}>
          <OverviewChart />
          <div
            className="m-3 me-0 rounded-4 overflow-hidden bg-primary position-absolute"
            style={{
              width: '50px',
              height: '50px',
              bottom: '0',
              right: '0',
            }}
          >
            <Image
              src={'assets/logos/ethereum.svg'}
              alt={'netowrk-logo'}
              width={40}
              height={40}
              style={{
                objectFit: 'cover',
                transform: 'translate(15px, 12.5px)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
