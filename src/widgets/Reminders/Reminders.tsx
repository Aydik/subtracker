import { type FC, useState } from 'react';
import styles from './Reminders.module.scss';
import { ReminderItem } from '@entities/Notification';
import { mockReminders } from '@widgets/Payments/constants';

export const Reminders: FC = () => {
  const [reminders, setReminders] = useState(mockReminders);

  const handleReminderToggle = (id: string, enabled: boolean) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, isEnabled: enabled } : reminder,
      ),
    );
  };
  return (
    <div className={styles.reminders}>
      {reminders.map((reminder) => (
        <ReminderItem key={reminder.id} reminder={reminder} onToggle={handleReminderToggle} />
      ))}
    </div>
  );
};
