import type { FC } from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface Props {
  className?: string;
}

export const LogoutButton: FC<Props> = ({ className = '' }) => {
  const handleLogout = () => {
    console.log('Выход из аккаунта');
  };
  return (
    <Button type="primary" className={className} icon={<LogoutOutlined />} onClick={handleLogout}>
      Выйти из аккаунта
    </Button>
  );
};
