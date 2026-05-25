import { useTranslation } from 'react-i18next';

import { UserCard } from '@entities/User';
import { LogoutButton } from '@features/auth';
import { ToggleThemeButton } from '@shared/theme';
import { LanguageSwitcher } from '@shared/ui/LanguageSwitcher/LanguageSwitcher.tsx';

import type { FC } from 'react';

import styles from './ProfilePage.module.scss';

export const ProfilePage: FC = () => {
  const { t } = useTranslation();

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
          <span className={styles.themeLabel}>{t('profile.darkTheme')}</span>
          <ToggleThemeButton />
        </div>

        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>{t('profile.loginMethods')}</span>
          <button className={styles.configureButton} onClick={handleConfigure}>
            {t('common.configure')}
          </button>
        </div>

        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>{t('profile.currency')}</span>
          <button className={styles.configureButton} onClick={handleValue}>
            {t('profile.currencyRub')}
          </button>
        </div>

        <div className={styles.settingItem}>
          <span className={styles.settingLabel}>{t('profile.language')}</span>
          <LanguageSwitcher />
        </div>
      </div>

      <LogoutButton className={styles.logoutButton} />
    </div>
  );
};

export default ProfilePage;
