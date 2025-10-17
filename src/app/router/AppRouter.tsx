import { type FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AuthLayout } from '@app/layouts/AuthLayout';

const IndexPage = lazy(() => import('@pages/IndexPage'));
const LoginForm = lazy(() =>
  import('@features/auth').then((module) => ({ default: module.LoginForm })),
);
const RegisterForm = lazy(() =>
  import('@features/auth').then((module) => ({ default: module.RegisterForm })),
);

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm />
          </Suspense>
        ),
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
