import { useEffect } from 'react';

export const useLockScroll = (active: boolean = true) => {
  useEffect(() => {
    if (!active) {
      return;
    }

    const { style } = document.body;
    const originalOverflow = style.overflow;

    style.overflow = 'hidden';

    return () => {
      style.overflow = originalOverflow;
    };
  }, [active]);
};

