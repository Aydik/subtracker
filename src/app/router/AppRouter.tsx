import { type FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from '@app/layouts/AuthLayout';

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
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <div>LoginPage</div>,
      },
      {
        path: 'register',
        element: <div>RegisterPage</div>,
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
