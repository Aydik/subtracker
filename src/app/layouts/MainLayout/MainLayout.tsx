import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getPageTitle } from '@widgets/navigation';

import type { FC } from 'react';

import styles from './MainLayout.module.scss';

export const MainLayout: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const titleKey = getPageTitle(location.pathname);

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
          <h2 className={styles.title}>{t(titleKey)}</h2>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
