import type { AnalyticsSummaryResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './Statistics.module.scss';

type StatisticsProps = {
  analytics?: AnalyticsSummaryResponse;
};

export const Statistics: FC<StatisticsProps> = ({ analytics }) => {
  const stats = analytics?.upcomingCharges;
  const totalAmount = analytics?.totalAmount;

  const statsCards = [
    {
      label: 'Активных подписок',
      value: stats?.activeSubscriptionsCount ?? 0,
      unit: '',
      highlight: false,
    },
    {
      label: 'Сумма в месяц',
      value: totalAmount ?? 0,
      unit: '₽',
      highlight: true,
    },
    {
      label: 'На этой неделе',
      value: stats?.subscriptionsToPayThisWeekCount ?? 0,
      unit: '',
      highlight: false,
    },
    {
      label: 'В этом месяце',
      value: stats?.subscriptionsToPayThisMonthCount ?? 0,
      unit: '',
      highlight: false,
    },
    {
      label: 'К оплате на этой неделе',
      value: stats?.nextWeek ?? 0,
      unit: '₽',
      highlight: false,
    },
    {
      label: 'К оплате в этом месяце',
      value: stats?.nextMonth ?? 0,
      unit: '₽',
      highlight: false,
    },
  ];

  const firstRow = statsCards.slice(0, 3);
  const secondRow = statsCards.slice(3, 6);

  return (
    <div className={styles.statistics}>
      <div className={styles.grid}>
        <div className={styles.row}>
          {firstRow.map((stat, index) => (
            <div key={index} className={`${styles.card} ${stat.highlight ? styles.highlight : ''}`}>
              <div className={styles.cardLabel}>{stat.label}</div>
              <div className={styles.cardValue}>
                <span className={styles.valueNumber}>{stat.value}</span>
                {stat.unit && <span className={styles.valueUnit}>{stat.unit}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.row}>
          {secondRow.map((stat, index) => (
            <div key={index} className={`${styles.card} ${stat.highlight ? styles.highlight : ''}`}>
              <div className={styles.cardLabel}>{stat.label}</div>
              <div className={styles.cardValue}>
                <span className={styles.valueNumber}>{stat.value}</span>
                {stat.unit && <span className={styles.valueUnit}>{stat.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
