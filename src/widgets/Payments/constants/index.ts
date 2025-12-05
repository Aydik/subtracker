import type {
  NotificationChannelType,
  PaymentNotification,
  Reminder,
} from '@entities/Notification';

export const mockPayments: PaymentNotification[] = [
  {
    id: '1',
    title: 'Завтра - Spotify 799 ₽',
    date: 'Завтра',
    amount: 799,
    service: { name: 'Spotify', imageUrl: 'public/assets/images/services/spotify.png' },
    description: 'Не забудьте о платеже',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Через 3 дня - Кинопоиск 799 ₽',
    date: 'Через 3 дня',
    amount: 799,
    service: { name: 'Кинопоиск', imageUrl: 'public/assets/images/services/kinopoisk.png' },
    description: 'Спишется с карты',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Сегодня - Netflix 799 ₽',
    date: 'Сегодня',
    amount: 799,
    service: { name: 'Netflix', imageUrl: 'public/assets/images/services/netflix.png' },
    description: 'Уже списано',
    status: 'completed',
  },
];

export const mockReminders: Reminder[] = [
  { id: '1', daysBefore: 1, isEnabled: true },
  { id: '2', daysBefore: 3, isEnabled: true },
  { id: '3', daysBefore: 7, isEnabled: false },
];

export const mockChannels: NotificationChannelType[] = [
  {
    id: '1',
    name: 'push',
    isEnabled: true,
  },
];
