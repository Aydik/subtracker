import { useTranslation } from 'react-i18next';

import type { AnalyticsSummaryResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './Statistics.module.scss';

type StatisticsProps = {
  analytics?: AnalyticsSummaryResponse;
};

export const Statistics: FC<StatisticsProps> = ({ analytics }) => {
  const { t } = useTranslation();
  const stats = analytics?.upcomingCharges;
  const totalAmount = analytics?.totalAmount;

  const statsCards = [
    {
      label: t('statistics.activeSubscriptions'),
      value: stats?.activeSubscriptionsCount ?? 0,
      unit: '',
      highlight: false,
    },
    {
      label: t('statistics.monthlyAmount'),
      value: totalAmount ?? 0,
      unit: t('common.rub'),
      highlight: true,
    },
    {
      label: t('statistics.thisWeek'),
      value: stats?.subscriptionsToPayThisWeekCount ?? 0,
      unit: '',
      highlight: false,
    },
    {
      label: t('statistics.thisMonth'),
      value: stats?.subscriptionsToPayThisMonthCount ?? 0,
      unit: '',
      highlight: false,
    },
    {
      label: t('statistics.payThisWeek'),
      value: stats?.nextWeek ?? 0,
      unit: t('common.rub'),
      highlight: false,
    },
    {
      label: t('statistics.payThisMonth'),
      value: stats?.nextMonth ?? 0,
      unit: t('common.rub'),
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
