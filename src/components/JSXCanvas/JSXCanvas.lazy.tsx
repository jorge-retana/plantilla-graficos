import React, { lazy, Suspense } from 'react';

const LazyJSXCanvas = lazy(() => import('./JSXCanvas'));

const JSXCanvas = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyJSXCanvas {...props} />
  </Suspense>
);

export default JSXCanvas;
