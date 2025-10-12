import { type FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

const IndexPage = lazy(() => import('@pages/IndexPage'));

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <IndexPage />
      </Suspense>
    ),
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
