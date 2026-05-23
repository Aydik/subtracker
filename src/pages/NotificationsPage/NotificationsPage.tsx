import { Channels } from '@widgets/Chanels/Channels.tsx';
import { Payments } from '@widgets/Payments/Payments.tsx';
import { Reminders } from '@widgets/Reminders/Reminders.tsx';

import type { FC } from 'react';

import styles from './NotificationsPage.module.scss';

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
