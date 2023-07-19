import { FC } from 'react';

const Hero: FC = () => {
  return (
    <article>
      <h2 className="fw-bold">The Web3 Address Explorer</h2>
      <p className="fs-6 fw-semibold">
        <span className="text-secondary">Ultimate tool to </span>explore
        <span className="text-secondary">, and</span> trace
        <span className="text-secondary">
          {' '}
          your decentralized assets across 8 blockchain networks
        </span>
      </p>
    </article>
  );
};

export default Hero;
