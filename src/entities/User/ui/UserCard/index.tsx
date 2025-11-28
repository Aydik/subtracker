import { type FC } from 'react';
import styles from './index.module.scss';
import type { User } from '@entities/User';

export const UserCard: FC = () => {
  const user: User = {
    name: 'Пользователь',
    email: 'user@gmail.com',
  };
  return (
    <div className={styles.userCard}>
      <div className={styles.avatar}>{user.name.charAt(0).toUpperCase()}</div>
      <div className={styles.details}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.email}</p>
      </div>
    </div>
  );
};
