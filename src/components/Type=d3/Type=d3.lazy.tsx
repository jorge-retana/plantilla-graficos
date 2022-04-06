import React, { lazy, Suspense } from 'react';

const LazyType=d3 = lazy(() => import('./Type=d3'));

const Type=d3 = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyType=d3 {...props} />
  </Suspense>
);

export default Type=d3;
