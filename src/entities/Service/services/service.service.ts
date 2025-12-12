import type { Service } from '@entities/Service';

const services: Service[] = [
  {
    name: 'Spotify',
    imageUrl: 'public/assets/images/services/spotify.png',
    category: 'MUSIC',
  },
  {
    name: 'Apple Music',
    imageUrl: 'public/assets/images/services/apple-music.png',
    category: 'MUSIC',
  },
  {
    name: 'Netflix',
    imageUrl: 'public/assets/images/services/netflix.png',
    category: 'STREAMING',
  },
  {
    name: 'Instagram',
    imageUrl: 'public/assets/images/services/instagram.png',
    category: 'OTHER',
  },
  {
    name: 'ВКонтакте',
    imageUrl: 'public/assets/images/services/vk.png',
    category: 'OTHER',
  },
  {
    name: 'Яндекс Музыка',
    imageUrl: 'public/assets/images/services/yandex-music.png',
    category: 'MUSIC',
  },
  {
    name: 'Кинопоиск',
    imageUrl: 'public/assets/images/services/kinopoisk.png',
    category: 'STREAMING',
  },
  {
    name: 'Ivi',
    imageUrl: 'public/assets/images/services/ivi.png',
    category: 'STREAMING',
  },
  {
    name: 'Twitter',
    imageUrl: 'public/assets/images/services/twitter.png',
    category: 'OTHER',
  },
  {
    name: 'YouTube',
    imageUrl: 'public/assets/images/services/youtube.png',
    category: 'STREAMING',
  },
  {
    name: 'Duolingo',
    imageUrl: 'public/assets/images/services/duolingo.png',
    category: 'OTHER',
  },
  {
    name: 'Telegram',
    imageUrl: 'public/assets/images/services/telegram.png',
    category: 'OTHER',
  },
  {
    name: 'Roblox',
    imageUrl: 'public/assets/images/services/roblox.png',
    category: 'OTHER',
  },
  {
    name: 'WeChat',
    imageUrl: 'public/assets/images/services/wechat.png',
    category: 'OTHER',
  },
  {
    name: 'МТС',
    imageUrl: 'public/assets/images/services/mts.png',
    category: 'OTHER',
  },
];

export const getServices = async (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 500);
  });
};
