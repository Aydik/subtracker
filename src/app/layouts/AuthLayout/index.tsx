import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const AuthLayout: FC = () => {
  return (
    <div className={styles.authLayout}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
