import { useAppSelector } from '@src/store/hooks.ts';

import type { FC } from 'react';

import styles from './UserCard.module.scss';

export const UserCard: FC = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className={styles.userCard}>
      <div className={styles.avatar}>{user?.username?.charAt(0).toUpperCase()}</div>
      <div className={styles.details}>
        <h2 className={`${styles.name} text-ellipsis`}>{user?.username}</h2>
        <p className={`${styles.email} text-ellipsis`}>{user?.email}</p>
      </div>
    </div>
  );
};
