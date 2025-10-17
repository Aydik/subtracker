import { type FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { PageLoader } from '@shared/ui/PageLoader';

const IndexPage = lazy(() => import('@pages/IndexPage'));
const AuthLayout = lazy(() => import('@app/layouts/AuthLayout'));
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
      <Suspense fallback={<PageLoader />}>
        <IndexPage />
      </Suspense>
    ),
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginForm />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<PageLoader />}>
            <RegisterForm />
          </Suspense>
        ),
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
