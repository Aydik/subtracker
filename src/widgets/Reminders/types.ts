export const REMINDER_DAYS = [1, 3, 7] as const;
export type ReminderDays = (typeof REMINDER_DAYS)[number];

export interface Reminder {
  daysBefore: ReminderDays;
  isEnabled: boolean;
}
