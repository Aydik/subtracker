import type { Service } from '@entities/Service';

const services: Service[] = [
  {
    name: 'Spotify',
    imageUrl: 'public/assets/images/services/spotify.png',
  },
  {
    name: 'Apple Music',
    imageUrl: 'public/assets/images/services/apple-music.png',
  },
  {
    name: 'Netflix',
    imageUrl: 'public/assets/images/services/netflix.png',
  },
  {
    name: 'Instagram',
    imageUrl: 'public/assets/images/services/instagram.png',
  },
  {
    name: 'ВКонтакте',
    imageUrl: 'public/assets/images/services/vk.png',
  },
  {
    name: 'Яндекс Музыка',
    imageUrl: 'public/assets/images/services/yandex-music.png',
  },
  {
    name: 'Кинопоиск',
    imageUrl: 'public/assets/images/services/kinopoisk.png',
  },
  {
    name: 'Ivi',
    imageUrl: 'public/assets/images/services/ivi.png',
  },
  {
    name: 'Twitter',
    imageUrl: 'public/assets/images/services/twitter.png',
  },
  {
    name: 'YouTube',
    imageUrl: 'public/assets/images/services/youtube.png',
  },
  {
    name: 'Duolingo',
    imageUrl: 'public/assets/images/services/duolingo.png',
  },
  {
    name: 'Telegram',
    imageUrl: 'public/assets/images/services/telegram.png',
  },
  {
    name: 'Roblox',
    imageUrl: 'public/assets/images/services/roblox.png',
  },
  {
    name: 'WeChat',
    imageUrl: 'public/assets/images/services/wechat.png',
  },
  {
    name: 'МТС',
    imageUrl: 'public/assets/images/services/mts.png',
  },
];

export const getServices = async (): Promise<Service[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 500);
  });
};
