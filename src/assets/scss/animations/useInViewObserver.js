// useInViewOnceObserver.js
import { useEffect, useRef, useState } from 'react';

export const useInViewOnceObserver = ({ threshold = 0.5 } = {}) => {
  const ref = useRef(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold, hasBeenInView]);

  return [ref, hasBeenInView];
};
