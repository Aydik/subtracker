export const SERVICE_CATEGORIES = ['MUSIC', 'STREAMING', 'OTHER'] as const;
export const SERVICE_CATEGORY_OPTIONS = ['ALL', ...SERVICE_CATEGORIES] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];
export type ServiceCategoryOption = (typeof SERVICE_CATEGORY_OPTIONS)[number];

export const SERVICE_CATEGORY_OPTIONS_LOCALIZATION: Record<ServiceCategoryOption, string> = {
  ALL: 'Все',
  MUSIC: 'Музыка',
  STREAMING: 'Стриминги',
  OTHER: 'Другое',
};

export interface Service {
  name: string;
  imageUrl: string;
  category: ServiceCategory;
}
