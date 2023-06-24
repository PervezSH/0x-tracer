'use client';
import Image from 'next/image';
import { FC, useRef, FormEvent, useState, useMemo } from 'react';
import { isAddress } from 'ethers';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Search: FC = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputVal = inputRef.current?.value;
    if (!inputVal) return;
    if (!isAddress(inputVal)) return;
    setSubmitted(true);
    router.push(`/${inputVal}`);
  };

  const searchIconPath = useMemo(() => {
    return inputValue === ''
      ? '/assets/icons/search.svg'
      : isAddress(inputValue)
      ? '/assets/icons/check.svg'
      : '/assets/icons/warning.svg';
  }, [inputValue]);

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
        <div
          className="position-relative"
          style={{ width: '24px', height: '24px' }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0.3, 0.7, 1], scale: [1, 0.7, 0.9, 1.2] }}
              className="position-absolute"
              style={{ width: 24, height: 24 }}
              transition={{ repeat: Infinity }}
            >
              <Image
                src={'/assets/icons/search.svg'}
                alt={'search'}
                width={24}
                height={24}
              />
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                key={searchIconPath}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="position-absolute"
                style={{ width: 24, height: 24 }}
                transition={{
                  x: { type: 'spring', stiffness: 500, damping: 20 },
                  opacity: { duration: 0.2 },
                }}
              >
                <Image
                  src={searchIconPath}
                  alt={'search'}
                  width={24}
                  height={24}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </button>
    </form>
  );
};

export default Search;
