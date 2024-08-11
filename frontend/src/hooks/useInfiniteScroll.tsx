import {useEffect, useRef} from 'react';

export default function useInfiniteScroll(callback: Function) {
  const rootElementRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lastElementRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      {root: rootElementRef.current, threshold: 0.2},
    );
    observer.observe(lastElementRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {rootElementRef, lastElementRef};
}