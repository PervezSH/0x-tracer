import React from 'react';
import Image from 'next/image';
import { Hero } from '@components';

const loading = () => {
  return (
    <main className="d-flex flex-column mt-5 mb-3 gap-3 ">
      <Hero />
      <form
        className="d-flex bg-primary rounded-4 px-4 py-1 w-75"
        style={{ boxShadow: ' 0px 10px 20px #B1E6FF' }}
      >
        <input
          id="search-panel"
          type="text"
          className="form-control border-0"
          autoComplete="off"
          spellCheck="false"
          placeholder="Search Address"
          maxLength={42}
        />
        <button className="btn btn-primary" type="submit">
          <div
            className="position-relative"
            style={{ width: '24px', height: '24px' }}
          >
            <Image
              src={'/assets/icons/search.svg'}
              alt={'search'}
              width={24}
              height={24}
            />
          </div>
        </button>
      </form>
      <div className="anim-loading mt-5 align-self-center"></div>
    </main>
  );
};

export default loading;
