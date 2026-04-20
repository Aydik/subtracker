import type { SubscriptionResponse } from '@src/api/models';

export const mockSubscriptions: SubscriptionResponse[] = [
  {
    subscriptionId: '1',
    serviceName: 'Netflix',
    logoUrl: 'public/assets/images/services/netflix.png',
    amount: 799,
    timeToPay: '19 октября',
    category: 'STREAMING_VIDEO',
  },
  {
    subscriptionId: '2',
    serviceName: 'Spotify',
    logoUrl: 'public/assets/images/services/spotify.png',
    amount: 799,
    timeToPay: '19 октября',
    category: 'STREAMING_MUSIC',
  },
  {
    subscriptionId: '3',
    serviceName: 'Кинопоиск',
    logoUrl: 'public/assets/images/services/kinopoisk.png',
    amount: 799,
    timeToPay: '19 октября',
    category: 'STREAMING_VIDEO',
  },
];
