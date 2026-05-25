import { t } from 'i18next';

import type { NavItem } from '@widgets/navigation';

export const NAV_ITEMS: NavItem[] = [
  { path: '/home', icon: 'home', label: 'navigation.home' },
  { path: '/calendar', icon: 'calendar', label: 'navigation.calendar' },
  { path: '/notifications', icon: 'bell', label: 'navigation.notifications' },
  { path: '/profile', icon: 'account', label: 'navigation.profile' },
];

export const getPageTitle = (pathname: string): string => {
  if (pathname.startsWith('/subscription/') && pathname !== '/subscription/create') {
    return 'subscriptions.editSubscription';
  }

  const titles: Record<string, string> = {
    '/calendar': t('calendar.title'),
    '/notifications': t('notifications.title'),
    '/profile': t('profile.title'),
    '/subscription/add': t('subscriptions.addSubscription'),
  };

  return titles[pathname] || t('common.page');
};

export const PAGES_LOCALIZATION = {
  '/calendar': 'calendar.title',
  '/notifications': 'notifications.title',
  '/profile': 'profile.title',
  '/subscription/add': 'subscriptions.addSubscription',
  '/subscription/:id': 'subscriptions.editSubscription',
};
