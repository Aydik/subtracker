import { type FC, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { App, Spin } from 'antd';
import { useLazyGetCurrentUserProfileQuery } from '@src/store/api/services/userService.ts';

const UserLayout: FC = () => {
  const messageShown = useRef(false);
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [getUser] = useLazyGetCurrentUserProfileQuery({});

  useEffect(() => {
    getUser({})
      .unwrap()
      .then(() => setIsLoading(false))
      .catch(() => {
        console.log('catch');
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
