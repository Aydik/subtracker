import type { FC } from 'react';
import { useState } from 'react';
import styles from './index.module.scss';
import { PaymentCard } from '@entities/Notification/ui/PaymentCard';
import { ReminderItem } from '@entities/Notification/ui/ReminderItem';
import { NotificationChannel } from '@entities/Notification/ui/NotificationChannel';
import { mockChannels, mockPayments, mockReminders } from '@widgets/Notification/constants';

export const NotificationsPage: FC = () => {
  const [channels, setChannels] = useState(mockChannels);
  const [reminders, setReminders] = useState(mockReminders);

  const handleChannelToggle = (id: string, enabled: boolean) => {
    setChannels((prevChannels) =>
      prevChannels.map((channel) =>
        channel.id === id ? { ...channel, isEnabled: enabled } : channel,
      ),
    );
  };

  const handleReminderToggle = (id: string, enabled: boolean) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, isEnabled: enabled } : reminder,
      ),
    );
  };

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.paymentsSection}>
        <h2 className={styles.sectionTitle}>Ближайшие платежи</h2>
        <div className={styles.paymentsContainer}>
          {mockPayments.map((payment, index) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
              index={index}
              isLast={index === mockPayments.length - 1}
            />
          ))}
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Напоминания</h2>
        <div className={styles.remindersList}>
          {reminders.map((reminder) => (
            <ReminderItem key={reminder.id} reminder={reminder} onToggle={handleReminderToggle} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Уведомления каналов</h2>
        <div className={styles.channelsList}>
          {channels.map((channel) => (
            <NotificationChannel
              key={channel.id}
              channel={channel}
              onChange={handleChannelToggle}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default NotificationsPage;
