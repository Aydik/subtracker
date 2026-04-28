import { useState } from 'react';

import { ReminderItem } from '@entities/Notification';
import { mockReminders } from '@widgets/Payments/constants';

import type { FC } from 'react';

import styles from './Reminders.module.scss';

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
