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
const HomeLayout = lazy(() => import('@app/layouts/HomeLayout'));
// const HomePage = lazy(() => import('@pages/HomePage'));

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
    path: '/home',
    element: (
      <Suspense fallback={<PageLoader />}>
        <HomeLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          // <Suspense fallback={<PageLoader />}>
          //   <HomePage />
          // </Suspense>
          <div style={{ minWidth: '100%', minHeight: 1800, backgroundColor: 'red', opacity: 0.3 }}>
            .
          </div>
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
