import type { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getPageTitle } from '@widgets/navigation';

export type MainLayoutProps = {
  children?: React.ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  return (
    <div className={styles.mainLayout}>
      <main className={styles.content}>
        <div className={styles.caption}>
          <Button
            className={styles.homeButton}
            type="text"
            icon={<ArrowLeftOutlined />}
            size="large"
            onClick={() => navigate('/home')}
          />
          <h2 className={styles.title}>{title}</h2>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
