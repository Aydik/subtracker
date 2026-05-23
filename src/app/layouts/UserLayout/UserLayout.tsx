import { useEffect, useRef, useState } from 'react';

import { App, Spin } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { useLazyGetAnalyticsQuery } from '@src/store/api/services/analyticsService.ts';
import { useLazyGetCurrentUserProfileQuery } from '@src/store/api/services/userService.ts';

import type { FC } from 'react';

export const UserLayout: FC = () => {
  const messageShown = useRef(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [getUser] = useLazyGetCurrentUserProfileQuery({});
  const [getAnalytics] = useLazyGetAnalyticsQuery();

  useEffect(() => {
    getUser({})
      .unwrap()
      .then(() => {
        getAnalytics({})
          .unwrap()
          .then(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        if (!messageShown.current) {
          message.info('Пройдите аутентификацию');
          messageShown.current = true;
        }
        navigate('/auth/login');
      });
  }, []);

  if (isLoading) return <Spin fullscreen />;

  return <Outlet />;
};

export default UserLayout;
