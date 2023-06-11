import { FC } from 'react';
import { Search } from '@components';

const Home: FC = () => {
  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3">
      <article>
        <h2 className="fw-bold">The Web3 Portfolio Tracer</h2>
        <p className="fs-6 fw-semibold">
          <span className="text-secondary">Ultimate tool to </span>monitor
          <span className="text-secondary">, and</span> trace
          <span className="text-secondary">
            {' '}
            your decentralized assets across all blockchain networks
          </span>
        </p>
      </article>
      <Search />
    </main>
  );
};

export default Home;
