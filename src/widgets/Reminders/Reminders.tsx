import { useCallback, useEffect, useState } from 'react';

import {
  useLazyGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from '@src/store/api/services/userService.ts';
import { REMINDER_DAYS } from '@widgets/Reminders/types.ts';
import { ReminderItem } from '@widgets/Reminders/ui/ReminderItem';

import type { NotificationSettingsResponse } from '@src/api/models';
import type { Reminder } from '@widgets/Reminders/types.ts';
import type { FC } from 'react';

import styles from './Reminders.module.scss';

export const Reminders: FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>(
    REMINDER_DAYS.map((days) => ({
      daysBefore: days,
      isEnabled: false,
    })),
  );

  const [getNotifications] = useLazyGetNotificationSettingsQuery({});
  const [updateNotifications] = useUpdateNotificationSettingsMutation({});

  const fetchReminders = useCallback(
    (notifications: NotificationSettingsResponse) => {
      setReminders([
        {
          daysBefore: 1,
          isEnabled: !!notifications.notify1Day,
        },
        {
          daysBefore: 3,
          isEnabled: !!notifications.notify3Days,
        },
        {
          daysBefore: 7,
          isEnabled: !!notifications.notify7Days,
        },
      ]);
    },
    [setReminders],
  );

  useEffect(() => {
    getNotifications({})
      .unwrap()
      .then((res) => {
        if (res) fetchReminders(res);
      });
  }, []);

  const handleReminderToggle = useCallback(
    async (days: number, enabled: boolean) => {
      try {
        const res = await updateNotifications({
          notify1Day:
            days === 1
              ? enabled
              : !!reminders.find((reminder) => reminder.daysBefore === 1)?.isEnabled,
          notify3Days:
            days === 3
              ? enabled
              : !!reminders.find((reminder) => reminder.daysBefore === 3)?.isEnabled,
          notify7Days:
            days === 7
              ? enabled
              : !!reminders.find((reminder) => reminder.daysBefore === 7)?.isEnabled,
        }).unwrap();

        if (res) fetchReminders(res);
      } catch {}
    },
    [fetchReminders, reminders, updateNotifications],
  );

  return (
    <div className={styles.reminders}>
      {reminders.map((reminder) => (
        <ReminderItem
          key={reminder.daysBefore}
          reminder={reminder}
          onToggle={handleReminderToggle}
        />
      ))}
    </div>
  );
};
