export interface Subscription {
  id: string;
  name: string;
  price: number;
  nextCharge: number;
  chargeDate: string;
  category: 'music' | 'streaming' | 'other';
  logoUrl?: string;
}

export type SubscriptionCategory = 'all' | 'music' | 'streaming';
