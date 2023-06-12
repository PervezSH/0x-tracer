import { FC } from 'react';
import { Hero, Search } from '@components';

const Home: FC = () => {
  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3">
      <Hero />
      <Search />
    </main>
  );
};

export default Home;
