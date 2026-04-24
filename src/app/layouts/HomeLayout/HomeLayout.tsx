import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './HomeLayout.module.scss';
import { Navigation } from '@widgets/navigation';

export type HomeLayoutProps = {
  children?: React.ReactNode;
};

export const HomeLayout: FC<HomeLayoutProps> = () => {
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
