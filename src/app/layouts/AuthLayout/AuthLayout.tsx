import { useEffect, useRef, useState } from 'react';

import { App, Spin } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { useLazyGetCurrentUserProfileQuery } from '@src/store/api/services/userService.ts';

import type { FC } from 'react';

import styles from './AuthLayout.module.scss';

export const AuthLayout: FC = () => {
  const messageShown = useRef(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [getUser] = useLazyGetCurrentUserProfileQuery({});

  useEffect(() => {
    getUser({})
      .unwrap()
      .then(() => {
        if (!messageShown.current) {
          message.info('Вы уже прошли аутентификацию');
          messageShown.current = true;
        }
        navigate('/home');
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Spin fullscreen />;

  return (
    <div className={styles.authLayout}>
      <Outlet />
    </div>
  );
};
