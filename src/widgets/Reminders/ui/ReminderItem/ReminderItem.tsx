import { useTranslation } from 'react-i18next';

import { ToggleSwitch } from '@shared/ui/ToggleSwitch';

import type { Reminder } from '../../types.ts';
import type { FC } from 'react';

import styles from './ReminderItem.module.scss';

type ReminderItemProps = {
  reminder: Reminder;
  onToggle: (days: number, enabled: boolean) => Promise<void>;
};

export const ReminderItem: FC<ReminderItemProps> = ({ reminder, onToggle }) => {
  const { t } = useTranslation();

  const getReminderText = (days: number) => {
    if (days === 1) return t('notifications.dayBefore');
    if (days === 3) return t('notifications.threeDaysBefore');
    return t('notifications.sevenDaysBefore');
  };

  return (
    <div className={styles.reminderItem}>
      <span className={styles.reminderText}>{getReminderText(reminder.daysBefore)}</span>

      <ToggleSwitch
        id={`reminder-${reminder.daysBefore}`}
        checked={reminder.isEnabled}
        onChange={(checked) => onToggle(reminder.daysBefore, checked)}
        ariaLabel={getReminderText(reminder.daysBefore)}
      />
    </div>
  );
};
