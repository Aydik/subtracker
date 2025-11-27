import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import { Navigation } from '@widgets/navigation';

const HomeLayout: FC = () => {
  return (
    <div className={styles.homeLayout}>
      <div className={styles.navDesktopContainer}>
        <div className={styles.navDesktopWrapper}>
          <Navigation breakpoint="desktop" />
        </div>
      </div>
      <main className={styles.content}>
        <Outlet />
      </main>
      <div className={styles.navMobileWrapper}>
        <Navigation breakpoint="mobile" />
      </div>
    </div>
  );
};

export default HomeLayout;
