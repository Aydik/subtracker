import { t } from 'i18next';

import { PAGES_LOCALIZATION } from '@widgets/navigation/constants.ts';

export const getPageTitle = (pathname: string): string => {
  if (PAGES_LOCALIZATION[pathname as keyof typeof PAGES_LOCALIZATION]) {
    return t(PAGES_LOCALIZATION[pathname as keyof typeof PAGES_LOCALIZATION]);
  }

  if (pathname.startsWith('/subscription/') && pathname !== '/subscription/create') {
    return t('subscriptions.editSubscription');
  }

  return t('common.page');
};
