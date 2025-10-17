import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

export const AuthLayout: FC = () => {
  return (
    <div className={styles.authLayout}>
      <Outlet />
    </div>
  );
};
