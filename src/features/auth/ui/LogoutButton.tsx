import { LogoutOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@src/store/api/services/userService.ts';

import type { FC } from 'react';

export type LogoutButtonProps = {
  className?: string;
};

export const LogoutButton: FC<LogoutButtonProps> = ({ className = '' }) => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();

      message.destroy();
      message.success('Вы вышли из аккаунта!');
      navigate('/');
    } catch (error) {
      console.log(error);
      message.destroy();
      message.error('Ошибка выхода!');
    }
  };

  return (
    <Button
      type="primary"
      className={className}
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      loading={isLoading}
    >
      Выйти из аккаунта
    </Button>
  );
};
