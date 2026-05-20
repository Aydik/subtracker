import { useMemo } from 'react';

import { Calendar, Tooltip } from 'antd';
import dayjs from 'dayjs';

import type { SubscriptionResponse } from '@src/api/models';
import type { Dayjs } from 'dayjs';
import type { FC } from 'react';

import styles from './SubscriptionCalendar.module.scss';

interface SubscriptionCalendarProps {
  subscriptions?: SubscriptionResponse[];
}

export const SubscriptionCalendar: FC<SubscriptionCalendarProps> = ({ subscriptions = [] }) => {
  const dateMap = useMemo(() => {
    const map: Record<string, SubscriptionResponse[]> = {};

    subscriptions.forEach((sub) => {
      if (!sub.timeToPay) return;

      const key = dayjs(sub.timeToPay).format('YYYY-MM-DD');
      if (!map[key]) map[key] = [];
      map[key].push(sub);
    });

    return map;
  }, [subscriptions]);

  const getIconElement = (sub: SubscriptionResponse) => {
    const firstLetter = sub.serviceName?.charAt(0).toUpperCase() || '?';

    return sub.logoUrl ? (
      <img src={sub.logoUrl} alt={sub.serviceName || ''} className={styles.iconImage} />
    ) : (
      <div className={styles.iconFallback}>{firstLetter}</div>
    );
  };

  const dateCellRender = (date: Dayjs) => {
    const key = date.format('YYYY-MM-DD');
    const items = dateMap[key];
    if (!items?.length) return null;

    const MAX_VISIBLE = 3;
    const visibleItems = items.slice(0, MAX_VISIBLE);
    const remainingCount = items.length - MAX_VISIBLE;

    return (
      <div className={styles.subscriptionsIcons}>
        {visibleItems.map((sub) => (
          <Tooltip
            key={sub.subscriptionId}
            title={sub.serviceName || 'Оплата подписки'}
            placement="top"
            mouseEnterDelay={0.3}
          >
            <div className={styles.iconWrapper}>{getIconElement(sub)}</div>
          </Tooltip>
        ))}

        {remainingCount > 0 && <div className={styles.moreBadge}>+{remainingCount}</div>}
      </div>
    );
  };

  return (
    <div className={styles.calendar}>
      <Calendar cellRender={dateCellRender} />
    </div>
  );
};
