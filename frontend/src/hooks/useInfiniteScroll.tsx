import {useEffect, useRef} from 'react';

export default function useInfiniteScroll(callback: Function) {
  const rootElementRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lastElementRef.current || !rootElementRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      {root: rootElementRef.current, threshold: .5},
    );
    observer.observe(lastElementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [callback]);

  return {rootElementRef, lastElementRef};
}