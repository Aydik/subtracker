import { lazy, Suspense } from 'react';

import { useRoutes } from 'react-router-dom';

import { PageLoader } from '@shared/ui/PageLoader';

import type { FC } from 'react';
import type { RouteObject } from 'react-router-dom';

const AuthLayout = lazy(() => import('@app/layouts/AuthLayout'));
const UserLayout = lazy(() => import('@app/layouts/UserLayout'));
const HomeLayout = lazy(() => import('@app/layouts/HomeLayout'));

const IndexPage = lazy(() => import('@pages/IndexPage'));
const HomePage = lazy(() => import('@pages/HomePage'));
const SubscriptionPage = lazy(() => import('@pages/SubscriptionPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const NotificationsPage = lazy(() => import('@pages/NotificationsPage'));
const CalendarPage = lazy(() => import('@pages/CalendarPage'));

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
  {
    element: (
      <Suspense fallback={<PageLoader />}>
        <UserLayout />
      </Suspense>
    ),
    children: [
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomeLayout />
          </Suspense>
        ),
        children: [
          {
            path: '/home',
            element: (
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: '/calendar',
            element: (
              <Suspense fallback={<PageLoader />}>
                <CalendarPage />
              </Suspense>
            ),
          },
          {
            path: '/notifications',
            element: (
              <Suspense fallback={<PageLoader />}>
                <NotificationsPage />
              </Suspense>
            ),
          },
          {
            path: '/profile',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: '/subscription/:id',
            element: (
              <Suspense fallback={<PageLoader />}>
                <SubscriptionPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export const AppRouter: FC = () => useRoutes(routeConfig);
