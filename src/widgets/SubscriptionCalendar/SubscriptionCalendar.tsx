import { useMemo } from 'react';

import { Calendar, Tooltip } from 'antd';
import dayjs from 'dayjs';

import { AsyncImage } from '@shared/ui/AsyncImage';

import type { SubscriptionResponse } from '@src/api/models';
import type { Dayjs } from 'dayjs';
import type { FC } from 'react';

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

  const dateCellRender = (date: Dayjs) => {
    const key = date.format('YYYY-MM-DD');
    const items = dateMap[key];
    if (!items?.length) return null;

    const MAX_VISIBLE = 3;
    const visibleItems = items.slice(0, MAX_VISIBLE);
    const remainingCount = items.length - MAX_VISIBLE;

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
          marginTop: 6,
        }}
      >
        {visibleItems.map((sub) => (
          <Tooltip
            key={sub.subscriptionId}
            title={sub.serviceName || 'Оплата подписки'}
            placement="top"
          >
            <AsyncImage src={sub.logoUrl || ''} alt={sub.serviceName || ''} />
            {/*<img*/}
            {/*  src={sub.logoUrl}*/}
            {/*  alt={sub.serviceName || ''}*/}
            {/*  style={{*/}
            {/*    width: 28,*/}
            {/*    height: 28,*/}
            {/*    borderRadius: 6,*/}
            {/*    objectFit: 'cover',*/}
            {/*    border: '1px solid #f0f0f0',*/}
            {/*    cursor: 'pointer',*/}
            {/*  }}*/}
            {/*/>*/}
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: '#f5f5f5',
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 500,
              cursor: 'default',
            }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  };

  return <Calendar cellRender={dateCellRender} />;
};
