import type { Subscription } from '@entities/Subscription';

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    service: { name: 'Netflix', imageUrl: 'public/assets/images/services/netflix.png' },
    price: 799,
    chargeDate: '19 октября',
    category: 'streaming',
  },
  {
    id: '2',
    service: { name: 'Spotify', imageUrl: 'public/assets/images/services/spotify.png' },
    price: 799,
    chargeDate: '19 октября',
    category: 'music',
  },
  {
    id: '3',
    service: { name: 'Кинопоиск', imageUrl: 'public/assets/images/services/kinopoisk.png' },
    price: 799,
    chargeDate: '19 октября',
    category: 'streaming',
  },
];
