import { useEffect } from 'react';

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // if the ref is null, return
      if (!ref.current) return;

      // if the ref does not contain the target, execute the callback
      if (!ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [ref, callback]);
};
