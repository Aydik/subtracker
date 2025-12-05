import type { Service } from '@entities/Service';

export const SUBSCRIPTION_CATEGORIES = ['music', 'streaming', 'other'] as const;
export const SUBSCRIPTION_CATEGORY_OPTIONS = ['all', ...SUBSCRIPTION_CATEGORIES] as const;

export type SubscriptionCategory = (typeof SUBSCRIPTION_CATEGORIES)[number];
export type SubscriptionCategoryOption = (typeof SUBSCRIPTION_CATEGORY_OPTIONS)[number];

export const SUBSCRIPTION_CATEGORY_OPTIONS_LOCALIZATION: Record<
  SubscriptionCategoryOption,
  string
> = {
  all: 'Все',
  music: 'Музыка',
  streaming: 'Стриминги',
  other: 'Другое',
};

export interface Subscription {
  id: string;
  service: Service;
  price: number;
  chargeDate: string;
  category: SubscriptionCategory;
}
