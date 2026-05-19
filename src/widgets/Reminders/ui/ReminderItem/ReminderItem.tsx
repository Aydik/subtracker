import { ToggleSwitch } from '@shared/ui/ToggleSwitch';

import type { Reminder } from '../../types.ts';
import type { FC } from 'react';

import styles from './ReminderItem.module.scss';

type ReminderItemProps = {
  reminder: Reminder;
  onToggle: (days: number, enabled: boolean) => Promise<void>;
};

export const ReminderItem: FC<ReminderItemProps> = ({ reminder, onToggle }) => {
  const getDaysText = (days: number): string => {
    if (days === 1) return 'день';
    if (days >= 2 && days <= 4) return 'дня';
    return 'дней';
  };

  return (
    <div className={styles.reminderItem}>
      <span className={styles.reminderText}>
        За {reminder.daysBefore} {getDaysText(reminder.daysBefore)} до списания
      </span>

      <ToggleSwitch
        id={`reminder-${reminder.daysBefore}`}
        checked={reminder.isEnabled}
        onChange={(checked) => onToggle(reminder.daysBefore, checked)}
        ariaLabel={`Напоминание за ${reminder.daysBefore} дней`}
      />
    </div>
  );
};
