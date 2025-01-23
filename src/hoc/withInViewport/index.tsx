'use client';

import { ComponentType, useMemo, useRef } from 'react';

import useIsInViewport from '@/hooks/useIsInViewport';

// 컴포넌트가 Viewport 내에 존재할 때만 렌더링하는 HOC
const withInViewport = <T extends { ref?: React.RefObject<HTMLElement | null> }>(
  WrapperComponent: ComponentType<T>,
) => {
  const InViewportComponent = (props: T) => {
    const ref = useRef<HTMLElement>(null);
    const { isInViewport } = useIsInViewport(props.ref || ref);

    const memo = useMemo(() => {
      if (isInViewport) {
        return;
      }

      return <WrapperComponent ref={ref} {...props} />;
      // eslint-disable-next-line
    }, [isInViewport]);

    if (!isInViewport) {
      return memo;
    }

    return <WrapperComponent ref={ref} {...props} />;
  };

  return InViewportComponent;
};

export default withInViewport;
