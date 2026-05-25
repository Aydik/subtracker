import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { daysFromToday } from '@shared/utils/formatDate';
import { useGetSubscriptionsQuery } from '@src/store/api/services/subscriptionService';
import { useLazyGetNotificationSettingsQuery } from '@src/store/api/services/userService';

export const useReminderNotifications = () => {
  const { t } = useTranslation();
  const notifiedRef = useRef<Set<string>>(new Set());

  const [getSettings, { data: settings }] = useLazyGetNotificationSettingsQuery({});
  const { data: subscriptionsData } = useGetSubscriptionsQuery({
    pageable: { size: 1000, page: 0 },
  });

  useEffect(() => {
    getSettings({});
  }, [getSettings]);

  useEffect(() => {
    if (!settings || !subscriptionsData?.content) return;

    const enabledDays: number[] = [];
    if (settings.notify1Day) enabledDays.push(1);
    if (settings.notify3Days) enabledDays.push(3);
    if (settings.notify7Days) enabledDays.push(7);

    if (enabledDays.length === 0) return;

    subscriptionsData.content.forEach((subscription) => {
      const daysUntil = daysFromToday(subscription.timeToPay);
      if (daysUntil === null) return;

      const shouldNotify = enabledDays.includes(daysUntil);
      const notificationKey = `${subscription.subscriptionId}-${daysUntil}`;

      if (shouldNotify && !notifiedRef.current.has(notificationKey)) {
        notifiedRef.current.add(notificationKey);

        // Получаем текст уведомления заранее
        let body = '';
        if (daysUntil === 0) {
          body = t('notifications.todayCharge', { name: subscription.serviceName });
        } else if (daysUntil === 1) {
          body = t('notifications.tomorrowCharge', { name: subscription.serviceName });
        } else {
          body = t('notifications.daysCharge', { days: daysUntil, name: subscription.serviceName });
        }

        // Показываем уведомление
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(t('notifications.reminderTitle'), {
            body,
            icon: '/subtracker/assets/icons/icon-192x192.png',
            badge: '/subtracker/assets/icons/icon-96x96.png',
            tag: `subscription-${subscription.subscriptionId}`,
            requireInteraction: true,
          });
        }
      }
    });
  }, [settings, subscriptionsData, t]);
};
