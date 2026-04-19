import type { FC } from 'react';
import { App, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@src/store/api/services/userService.ts';

interface Props {
  className?: string;
}

export const LogoutButton: FC<Props> = ({ className = '' }) => {
  const { message } = App.useApp();

  const navigate = useNavigate();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      logout({});

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
