import { LogoutOutlined } from '@ant-design/icons';
import { App, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@src/store/api/services/userService.ts';

import type { FC } from 'react';

export type LogoutButtonProps = {
  className?: string;
};

export const LogoutButton: FC<LogoutButtonProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      message.destroy();
      message.success(t('auth.logoutSuccess'));
      navigate('/');
    } catch (error) {
      console.log(error);
      message.destroy();
      message.error(t('auth.logoutError'));
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
      {t('auth.logout')}
    </Button>
  );
};
