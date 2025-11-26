import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import { Icon } from '@shared/ui/Icon';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.mainLayout}>
      <main className={styles.mainLayoutContent}>
        <Outlet />
      </main>

      <nav className={styles.mainLayoutNav}>
        <button className={styles.navButton}>
          <Icon name="home" />
        </button>
        <button className={styles.navButton}>
          <Icon name="calendar" />
        </button>
        <button className={styles.navButton}>
          <Icon name="bell" />
        </button>
        <button className={styles.navButton}>
          <Icon name="account" />
        </button>
      </nav>
    </div>
  );
};
