'use client';
import { useRef, useEffect } from 'react';

const useHorizontalScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        element.scrollTo({
          left: element.scrollLeft + e.deltaY,
          behavior: 'smooth',
        });
      };
      element.addEventListener('wheel', onWheel);
      return () => {
        element.removeEventListener('wheel', onWheel);
      };
    }
  }, []);

  return ref;
};

export default useHorizontalScroll;
