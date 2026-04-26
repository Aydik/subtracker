import { PAGES_LOCALIZATION } from '@widgets/navigation';

export const getPageTitle = (pathname: string): string => {
  if (PAGES_LOCALIZATION[pathname as keyof typeof PAGES_LOCALIZATION]) {
    return PAGES_LOCALIZATION[pathname as keyof typeof PAGES_LOCALIZATION];
  }

  if (pathname.startsWith('/subscription/') && pathname !== '/subscription/create') {
    return 'Редактировать подписку';
  }

  return 'Страница';
};
