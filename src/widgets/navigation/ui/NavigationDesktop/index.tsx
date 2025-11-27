import type { FC } from 'react';
import styles from './index.module.scss';
import { Icon } from '@shared/ui/Icon';
import { type NavigateFunction } from 'react-router-dom';
import type { NavItem } from '@widgets/navigation';

interface Props {
  navItems: NavItem[];
  navigate: NavigateFunction;
}

export const NavigationDesktop: FC<Props> = ({ navItems, navigate }) => {
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
