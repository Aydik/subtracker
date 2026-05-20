import { AsyncImage } from '@shared/ui/AsyncImage';
import { daysFromToday, isoToRussianDate, pluralizeDays } from '@shared/utils/formatDate.ts';

import type { SubscriptionResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './PaymentCard.module.scss';

export type PaymentCardProps = {
  subscription: SubscriptionResponse;
  notifyDays: number;
};

export const PaymentCard: FC<PaymentCardProps> = ({ subscription, notifyDays }) => {
  const days = daysFromToday(subscription.timeToPay);

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
              {isoToRussianDate(subscription.timeToPay)}
            </span>{' '}
            - {subscription.serviceName} {subscription.amount} ₽
          </h3>
          <p className={styles.paymentDescription}>
            Способ списания: {subscription.paymentMethod || 'Не указан'}
          </p>
        </div>
      </div>
      {days !== null && (
        <div className={`${styles.statusBadge} ${styles[`notify${notifyDays}`]}`}>
          {days === 0 ? 'Сегодня' : days === 1 ? 'Завтра' : `Через ${pluralizeDays(days)}`}
        </div>
      )}
    </div>
  );
};
