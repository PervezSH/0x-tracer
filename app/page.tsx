'use client';
import Image from 'next/image';
import { useRef, FormEvent } from 'react';

const Home: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputVal = inputRef.current?.value;
    if (!inputVal) return;

    console.log(inputVal);
  };

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
      <form
        className="d-flex bg-primary rounded-4 px-4 py-1 w-75"
        style={{ boxShadow: ' 0px 10px 20px #B1E6FF' }}
        onSubmit={handleSubmit}
      >
        <input
          id="search-panel"
          ref={inputRef}
          type="text"
          className="form-control border-0"
          autoComplete="off"
          spellCheck="false"
          placeholder="Search Address"
          maxLength={42}
        />
        <button className="btn btn-primary" type="submit">
          <Image
            src={'assets/icons/search.svg'}
            alt={'search'}
            width={24}
            height={24}
          />
        </button>
      </form>
    </main>
  );
};

export default Home;
