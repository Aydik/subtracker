import type { PaymentNotification } from '@entities/Notification';

export const mockPayments: PaymentNotification[] = [
  {
    id: '1',
    title: 'Завтра - Spotify 799 ₽',
    date: 'Завтра',
    amount: 799,
    service: {
      id: '1',
      name: 'Spotify',
      imageUrl: 'public/assets/images/services/spotify.png',
      category: 'STREAMING',
    },
    description: 'Не забудьте о платеже',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Через 3 дня - Кинопоиск 799 ₽',
    date: 'Через 3 дня',
    amount: 799,
    service: {
      id: '2',
      name: 'Кинопоиск',
      imageUrl: 'public/assets/images/services/kinopoisk.png',
      category: 'MUSIC',
    },
    description: 'Спишется с карты',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Сегодня - Netflix 799 ₽',
    date: 'Сегодня',
    amount: 799,
    service: {
      id: '3',
      name: 'Netflix',
      imageUrl: 'public/assets/images/services/netflix.png',
      category: 'STREAMING',
    },
    description: 'Уже списано',
    status: 'completed',
  },
];
