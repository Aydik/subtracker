import { UserCard } from '@entities/User';
import { LogoutButton } from '@features/auth';
import { ToggleThemeButton } from '@shared/theme';

import type { FC } from 'react';

import styles from './ProfilePage.module.scss';

export const ProfilePage: FC = () => {
  const handleConfigure = () => {
    console.log('Настроить способы входа');
  };

  const handleValue = () => {
    console.log('Настроить способ валюты');
  };

  return (
    <div className={styles.profilePage}>
      <UserCard />

      <div className={styles.settingsSection}>
        <div className={styles.themeToggle}>
          <span className={styles.themeLabel}>Темная тема</span>
          <ToggleThemeButton />
        </div>

        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Способы входа</span>
          <button className={styles.configureButton} onClick={handleConfigure}>
            Настроить
          </button>
        </div>

        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>Валюта</span>
          <button className={styles.configureButton} onClick={handleValue}>
            Рубли [₽]
          </button>
        </div>
      </div>
      <LogoutButton className={styles.logoutButton} />
    </div>
  );
};

export default ProfilePage;
