import type { FC } from 'react';
import styles from './ReminderItem.module.scss';
import type { Reminder } from './types';
import { ToggleSwitch } from '@shared/ui/ToggleSwitch';

export type ReminderItemProps = {
  reminder: Reminder;
  onToggle: (id: string, enabled: boolean) => void;
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
        id={`reminder-${reminder.id}`}
        checked={reminder.isEnabled}
        onChange={(checked) => onToggle(reminder.id, checked)}
        ariaLabel={`Напоминание за ${reminder.daysBefore} дней`}
      />
    </div>
  );
};
