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
const HomePage = lazy(() =>
  import('@pages/HomePage').then((module) => ({ default: module.HomePage })),
);
const MainLayout = lazy(() =>
  import('@app/layouts/MainLayout').then((module) => ({ default: module.MainLayout })),
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
  {
    path: '/subscriptions',
    element: (
      <Suspense fallback={<PageLoader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: 'calendar',
    element: <Suspense fallback={<PageLoader />}>{/*<CalendarPage />*/}</Suspense>,
  },
  {
    path: 'notifications',
    element: <Suspense fallback={<PageLoader />}>{/*<NotificationsPage />*/}</Suspense>,
  },
  {
    path: 'profile',
    element: <Suspense fallback={<PageLoader />}>{/*<ProfilePage />*/}</Suspense>,
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
