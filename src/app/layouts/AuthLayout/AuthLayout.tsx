import { type FC, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { App, Spin } from 'antd';
import { useLazyGetCurrentUserProfileQuery } from '@src/store/api/services/userService.ts';

const AuthLayout: FC = () => {
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

export default AuthLayout;
