import { Icon } from '@shared/ui/Icon/Icon.tsx';

import type { NavItem } from '@widgets/navigation';
import type { FC } from 'react';
import type { NavigateFunction } from 'react-router-dom';

import styles from './NavigationMobile.module.scss';

export type NavigationMobileProps = {
  navItems: NavItem[];
  navigate: NavigateFunction;
};

export const NavigationMobile: FC<NavigationMobileProps> = ({ navItems, navigate }) => {
  return (
    <nav className={styles.navigationMobile}>
      {navItems.map((item) => (
        <button
          key={item.path}
          className={styles.navButton}
          onClick={() => navigate(item.path)}
          title={item.label}
        >
          <Icon name={item.icon} />
        </button>
      ))}
    </nav>
  );
};
