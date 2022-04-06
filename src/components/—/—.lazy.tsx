import React, { lazy, Suspense } from 'react';

const Lazy— = lazy(() => import('./—'));

const — = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <Lazy— {...props} />
  </Suspense>
);

export default —;
