import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './index.module.scss';
import { Icon } from '@shared/ui/Icon';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/subscriptions', icon: 'home', label: 'Главная' },
    { path: '/calendar', icon: 'calendar', label: 'Календарь' },
    { path: '/notifications', icon: 'bell', label: 'Уведомления' },
    { path: '/profile', icon: 'account', label: 'Профиль' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={styles.mainLayout}>
      <main className={styles.mainLayoutContent}>
        <Outlet />
      </main>

      <nav className={styles.mainLayoutNav}>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`${styles.navButton} ${isActive(item.path) ? styles.navButtonActive : ''}`}
            onClick={() => navigate(item.path)}
            title={item.label}
          >
            <Icon name={item.icon} />
          </button>
        ))}
      </nav>
    </div>
  );
};
