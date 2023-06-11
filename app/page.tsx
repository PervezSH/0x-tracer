'use client';
import Image from 'next/image';
import { useRef, FormEvent, useState } from 'react';
import { isAddress } from 'ethers';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputVal = inputRef.current?.value;
    if (!inputVal) return;
    if (!isAddress(inputVal)) return;
    router.push(`/${inputVal}`);
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          <Image
            src={
              inputValue === ''
                ? '/assets/icons/search.svg'
                : isAddress(inputValue)
                ? '/assets/icons/check.svg'
                : '/assets/icons/warning.svg'
            }
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
