import type { Subscription } from '@entities/Subscription';

export const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    price: 799,
    nextCharge: 799,
    chargeDate: '19 октября',
    category: 'streaming',
    logoUrl: 'netflix',
  },
  {
    id: '2',
    name: 'Spotify',
    price: 799,
    nextCharge: 799,
    chargeDate: '19 октября',
    category: 'music',
    logoUrl: 'spotify',
  },
  {
    id: '3',
    name: 'Кинопоиск',
    price: 799,
    nextCharge: 799,
    chargeDate: '19 октября',
    category: 'streaming',
    logoUrl: 'kinopoisk',
  },
];
