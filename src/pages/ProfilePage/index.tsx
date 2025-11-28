import React from 'react';
import styles from './index.module.scss';

export const ProfilePage: React.FC = () => {
  const handleLogout = () => {
    console.log('Выход из аккаунта');
  };

  const handleConfigure = () => {
    console.log('Настроить способы входа');
  };

  const handleValue = () => {
    console.log('Настроить способ валюты');
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.userInfo}>
        <div className={styles.userAvatar}></div>
        <div className={styles.userDetails}>
          <h2 className={styles.userName}>Пользователь</h2>
          <p className={styles.userEmail}>user@gmail.com</p>
        </div>
      </div>

      <div className={styles.settingsSection}>
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

      <button className={styles.logoutButton} onClick={handleLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ProfilePage;
