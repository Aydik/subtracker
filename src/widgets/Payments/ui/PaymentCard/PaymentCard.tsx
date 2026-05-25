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
          {days === 0
            ? t('common.today')
            : days === 1
              ? t('common.tomorrow')
              : t('common.daysCount', { count: days })}
        </div>
      )}
    </div>
  );
};
