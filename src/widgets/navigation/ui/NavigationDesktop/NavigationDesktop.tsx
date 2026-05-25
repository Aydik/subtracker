import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <nav className={styles.navigationDesktop}>
      {navItems.map((item) => (
        <button
          key={item.path}
          className={styles.navButton}
          onClick={() => navigate(item.path)}
          title={t(item.label)}
        >
          <Icon name={item.icon} className={styles.navIcon} />
          <span className={styles.navButton__label}>{t(item.label)}</span>
        </button>
      ))}
    </nav>
  );
};
