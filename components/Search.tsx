'use client';
import Image from 'next/image';
import { FC, useRef, FormEvent, useState } from 'react';
import { isAddress } from 'ethers';
import { useRouter } from 'next/navigation';

const Search: FC = () => {
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
  );
};

export default Search;
