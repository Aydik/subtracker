export const CATEGORIES_LOCALIZATION: Record<string, string> = {
  ALL: 'Все',
  STREAMING_VIDEO: 'Видео',
  STREAMING_MUSIC: 'Музыка',
  CLOUD_STORAGE: 'Хранилища',
  PRODUCTIVITY: 'Продуктивность',
  GAMING: 'Игры',
  NEWS: 'Новости',
  EDUCATION: 'Образование',
  SOCIAL_MEDIA: 'Социальные сети',
  SHOPPING: 'Шопинг',
  HEALTH_FITNESS: 'Здоровье и фитнес',
  FINANCE: 'Финансы',
  TRAVEL: 'Путешествия',
  OTHER: 'Другое',
};

export interface Service {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
}
