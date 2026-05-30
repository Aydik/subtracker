import { useTranslation } from 'react-i18next';

import { AsyncImage } from '@shared/ui/AsyncImage';
import { daysFromToday, formatDate } from '@shared/utils/formatDate.ts';

import type { SubscriptionResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './PaymentCard.module.scss';

export type PaymentCardProps = {
  subscription: SubscriptionResponse;
  notifyDays: number;
};

export const PaymentCard: FC<PaymentCardProps> = ({ subscription, notifyDays }) => {
  const { t, i18n } = useTranslation();
  const days = daysFromToday(subscription.timeToPay);

  const getDaysText = (days: number) => {
    if (days === 0) return t('common.today');
    if (days === 1) return t('common.tomorrow');

    const lastOne = days % 10;
    const lastTwo = days % 100;

    if (lastTwo >= 11 && lastTwo <= 19) return t('common.daysMany', { count: days });
    if (lastOne === 1) return t('common.dayOne', { count: days });
    if (lastOne >= 2 && lastOne <= 4) return t('common.daysFew', { count: days });
    return t('common.daysMany', { count: days });
  };

  return (
    <div className={styles.payment__card}>
      <AsyncImage
        src={subscription.logoUrl || ''}
        alt={subscription.serviceName || ''}
        className={styles.subscriptionCard__logo}
      />
      <div className={styles.paymentHeader}>
        <div className={styles.paymentInfo}>
          <h3 className={styles.paymentTitle}>
            <span className={styles.paymentTitle_date}>
              {formatDate(subscription.timeToPay, i18n.language)}
            </span>{' '}
            - {subscription.serviceName} {subscription.amount} {t('common.rub')}
          </h3>
          <p className={styles.paymentDescription}>
            {t('subscriptions.paymentMethod')}:{' '}
            {subscription.paymentMethod || t('subscriptions.notSpecified')}
          </p>
        </div>
      </div>
      {days !== null && (
        <div className={`${styles.statusBadge} ${styles[`notify${notifyDays}`]}`}>
          {getDaysText(days)}
        </div>
      )}
    </div>
  );
};
