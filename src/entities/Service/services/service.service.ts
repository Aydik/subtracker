import type { Service } from '@entities/Service';

const services: Service[] = [
  {
    id: '1',
    name: 'Spotify',
    imageUrl: 'public/assets/images/services/spotify.png',
    category: 'MUSIC',
  },
  {
    id: '2',
    name: 'Apple Music',
    imageUrl: 'public/assets/images/services/apple-music.png',
    category: 'MUSIC',
  },
  {
    id: '3',
    name: 'Netflix',
    imageUrl: 'public/assets/images/services/netflix.png',
    category: 'STREAMING',
  },
  {
    id: '4',
    name: 'Instagram',
    imageUrl: 'public/assets/images/services/instagram.png',
    category: 'OTHER',
  },
  {
    id: '5',
    name: 'ВКонтакте',
    imageUrl: 'public/assets/images/services/vk.png',
    category: 'OTHER',
  },
  {
    id: '6',
    name: 'Яндекс Музыка',
    imageUrl: 'public/assets/images/services/yandex-music.png',
    category: 'MUSIC',
  },
  {
    id: '7',
    name: 'Кинопоиск',
    imageUrl: 'public/assets/images/services/kinopoisk.png',
    category: 'STREAMING',
  },
  {
    id: '8',
    name: 'Ivi',
    imageUrl: 'public/assets/images/services/ivi.png',
    category: 'STREAMING',
  },
  {
    id: '9',
    name: 'Twitter',
    imageUrl: 'public/assets/images/services/twitter.png',
    category: 'OTHER',
  },
  {
    id: '10',
    name: 'YouTube',
    imageUrl: 'public/assets/images/services/youtube.png',
    category: 'STREAMING',
  },
  {
    id: '11',
    name: 'Duolingo',
    imageUrl: 'public/assets/images/services/duolingo.png',
    category: 'OTHER',
  },
  {
    id: '12',
    name: 'Telegram',
    imageUrl: 'public/assets/images/services/telegram.png',
    category: 'OTHER',
  },
  {
    id: '13',
    name: 'Roblox',
    imageUrl: 'public/assets/images/services/roblox.png',
    category: 'OTHER',
  },
  {
    id: '14',
    name: 'WeChat',
    imageUrl: 'public/assets/images/services/wechat.png',
    category: 'OTHER',
  },
  {
    id: '15',
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
