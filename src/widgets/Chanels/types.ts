export const NOTIFICATION_CHANNELS = ['push'] as const;
export type NotificationChannelName = (typeof NOTIFICATION_CHANNELS)[number];
export const CHANNEL_LOCALIZATION: Record<NotificationChannelName, string> = {
  push: 'Push-уведомления',
};

export interface NotificationChannelType {
  name: NotificationChannelName;
  isEnabled: boolean;
}
