import type { FC } from 'react';
import { useState } from 'react';
import styles from './index.module.scss';
import { ReminderItem } from '@entities/Notification';
import { NotificationChannel } from '@entities/Notification';
import { mockChannels, mockReminders } from '@widgets/Payments/constants';
import { Payments } from '@widgets/Payments';

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
      <Payments />

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
