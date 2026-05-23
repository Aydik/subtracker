import { Spin } from 'antd';

import { useGetAnalyticsQuery } from '@src/store/api/services/analyticsService.ts';
import { useGetSubscriptionsQuery } from '@src/store/api/services/subscriptionService.ts';
import { Statistics } from '@widgets/Statistics';
import { SubscriptionCalendar } from '@widgets/SubscriptionCalendar';

import type { FC } from 'react';

export const CalendarPage: FC = () => {
  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useGetSubscriptionsQuery({
    categoryId: undefined,
    pageable: { size: 1000, page: 0 },
  });
  const { data: analytics, isLoading: isLoadingAnalytics } = useGetAnalyticsQuery({
    categoryId: undefined,
    pageable: { size: 1000, page: 0 },
  });

  if (isLoadingSubscriptions || isLoadingAnalytics) return <Spin />;

  return (
    <div>
      <SubscriptionCalendar subscriptions={subscriptions?.content} />
      <Statistics analytics={analytics} />
    </div>
  );
};
