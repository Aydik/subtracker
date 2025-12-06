import type { Subscription } from '@entities/Subscription';

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    service: {
      name: 'Netflix',
      imageUrl: 'public/assets/images/services/netflix.png',
      category: 'STREAMING',
    },
    price: 799,
    chargeDate: '19 октября',
  },
  {
    id: '2',
    service: {
      name: 'Spotify',
      imageUrl: 'public/assets/images/services/spotify.png',
      category: 'MUSIC',
    },
    price: 799,
    chargeDate: '19 октября',
  },
  {
    id: '3',
    service: {
      name: 'Кинопоиск',
      imageUrl: 'public/assets/images/services/kinopoisk.png',
      category: 'STREAMING',
    },
    price: 799,
    chargeDate: '19 октября',
  },
];
