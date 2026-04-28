import { Icon } from '@shared/ui/Icon/Icon.tsx';

import type { NavItem } from '@widgets/navigation';
import type { FC } from 'react';
import type { NavigateFunction } from 'react-router-dom';

import styles from './NavigationDesktop.module.scss';

export type NavigationDesktopProps = {
  navItems: NavItem[];
  navigate: NavigateFunction;
};

export const NavigationDesktop: FC<NavigationDesktopProps> = ({ navItems, navigate }) => {
  return (
    <nav className={styles.navigationDesktop}>
      {navItems.map((item) => (
        <button
          key={item.path}
          className={styles.navButton}
          onClick={() => navigate(item.path)}
          title={item.label}
        >
          <Icon name={item.icon} size={{ width: 20, height: 20 }} />
          <span className={styles.navButton__label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
