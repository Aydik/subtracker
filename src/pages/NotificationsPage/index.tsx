import type { FC } from 'react';
import styles from './index.module.scss';
import { Payments } from '@widgets/Payments';
import { Channels } from '@widgets/Chanels';
import { Reminders } from '@widgets/Reminders';

export const NotificationsPage: FC = () => {
  return (
    <div className={styles.notificationsPage}>
      <Payments />

      <section className={styles.section}>
        <h2 className={styles.section__title}>Напоминания</h2>
        <Reminders />
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Уведомления каналов</h2>
        <Channels />
      </section>
    </div>
  );
};

export default NotificationsPage;
