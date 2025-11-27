import type { NavItem } from '@widgets/navigation';

export const NAV_ITEMS: NavItem[] = [
  { path: '/home', icon: 'home', label: 'Главная' },
  { path: '/calendar', icon: 'calendar', label: 'Календарь' },
  { path: '/notifications', icon: 'bell', label: 'Уведомления' },
  { path: '/profile', icon: 'account', label: 'Профиль' },
];

export const PAGES_LOCALIZATION = {
  '/calendar': 'Календарь платежей',
  '/notifications': 'Уведомления',
  '/profile': 'Профиль',
  '/subscription/create': 'Добавить подписку',
  '/subscription/:id': 'Редактировать подписку',
};
