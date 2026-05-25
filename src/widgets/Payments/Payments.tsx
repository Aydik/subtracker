import { SmileOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import { compareDate, daysFromToday } from '@shared/utils/formatDate.ts';
import { useGetSubscriptionsQuery } from '@src/store/api/services/subscriptionService.ts';
import { PaymentCard } from '@widgets/Payments/ui/PaymentCard';

import type { FC } from 'react';

import styles from './Payments.module.scss';

export const Payments: FC = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useGetSubscriptionsQuery({
    categoryId: undefined,
    pageable: { size: 1000, page: 0 },
  });

  const payments = data?.content
    ?.flatMap((subscription) => {
      const days = daysFromToday(subscription.timeToPay);

      if (days === null) return [];

      if (days <= 1) return [{ subscription, notifyDays: 1 }];
      if (days <= 3) return [{ subscription, notifyDays: 3 }];
      if (days <= 7) return [{ subscription, notifyDays: 7 }];

      return [];
    })
    .sort((a, b) => compareDate(a.subscription.timeToPay, b.subscription.timeToPay));

  return (
    <section className={styles.payments}>
      <h2 className={styles.payments__title}>{t('notifications.nearbyPayments')}</h2>
      {isLoading ? (
        <Spin />
      ) : error ? (
        t('common.error')
      ) : !payments || payments?.length === 0 ? (
        <div className={styles.empty}>
          <SmileOutlined className={styles.empty__icon} />
          <p>{t('notifications.noUpcomingPayments')}</p>
        </div>
      ) : (
        <div className={styles.payments__listWrapper}>
          {payments && payments.length > 3 && <div className={styles.payments__fadeTop} />}
          <ul className={`${styles.payments__list} custom-scroll`}>
            {payments.map((payment, index) => (
              <li key={payment.subscription.subscriptionId}>
                {index !== 0 && <div className={styles.payments__divider} />}
                <PaymentCard subscription={payment.subscription} notifyDays={payment.notifyDays} />
              </li>
            ))}
          </ul>
          {payments && payments.length > 3 && <div className={styles.payments__fadeBottom} />}
        </div>
      )}
    </section>
  );
};
