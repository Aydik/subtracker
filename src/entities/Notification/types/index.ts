import type { Service } from '@entities/Service';

export const REMINDER_DAYS = [1, 3, 7] as const;
export type ReminderDays = (typeof REMINDER_DAYS)[number];

export const PAYMENT_STATUSES = ['upcoming', 'pending', 'completed'] as const;
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export const PAYMENT_STATUS_LOCALIZATION: Record<PaymentStatus, string> = {
  upcoming: 'Предстоящий',
  pending: 'Ожидается',
  completed: 'Выполнено',
};

export const NOTIFICATION_CHANNELS = ['push'] as const;
export type NotificationChannelName = (typeof NOTIFICATION_CHANNELS)[number];
export const CHANNEL_LOCALIZATION: Record<NotificationChannelName, string> = {
  push: 'Push-уведомления',
};

export interface PaymentNotification {
  id: string;
  title: string;
  date: string;
  amount: number;
  service: Service;
  description: string;
  status: PaymentStatus;
}

export interface Reminder {
  id: string;
  daysBefore: ReminderDays;
  isEnabled: boolean;
}

export interface NotificationChannelType {
  id: string;
  name: NotificationChannelName;
  isEnabled: boolean;
}
