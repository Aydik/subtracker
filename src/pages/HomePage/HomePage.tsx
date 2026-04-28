import { CURRENCY } from '@shared/types/Currency.ts';
import { useGetAnalyticsQuery } from '@src/store/api/services/analyticsService.ts';
import { useAppSelector } from '@src/store/hooks.ts';
import { Subscriptions } from '@widgets/Subscriptions';

import type { FC } from 'react';

import styles from './HomePage.module.scss';

const HomePage: FC = () => {
  const username = useAppSelector((state) => state.user?.user?.username);
  const currency = useAppSelector((state) => state.user?.user?.currency);

  const { data: analytics } = useGetAnalyticsQuery({}, { pollingInterval: 5000 });

  return (
    <div className={styles.homePage}>
      <div className={styles.caption}>
        <h1 className={styles.greeting}>Привет, {username}</h1>
        <p className={styles.total}>
          Общая сумма: {analytics?.totalAmount} {CURRENCY[currency || 'RUB']}/мес
        </p>
      </div>
      <Subscriptions />
    </div>
  );
};

export default HomePage;
