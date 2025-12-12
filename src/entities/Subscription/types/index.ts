import type { Service } from '@entities/Service';

export interface Subscription {
  id: string;
  service: Service;
  price: number;
  chargeDate: string;
}
