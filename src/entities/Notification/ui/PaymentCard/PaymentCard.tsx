import { AsyncImage } from '@shared/ui/AsyncImage';

import { PAYMENT_STATUS_LOCALIZATION } from '../../types.ts';

import type { PaymentNotification } from '../../types.ts';
import type { FC } from 'react';

import styles from './PaymentCard.module.scss';

export type PaymentCardProps = {
  payment: PaymentNotification;
};

export const PaymentCard: FC<PaymentCardProps> = ({ payment }) => {
  return (
    <div className={styles.payment__card}>
      <AsyncImage
        src={payment.service.imageUrl}
        alt={payment.service.name}
        className={styles.subscriptionCard__logo}
      />
      <div className={styles.paymentHeader}>
        <div className={styles.paymentInfo}>
          <h3 className={styles.paymentTitle}>
            {payment.date} - {payment.service.name} {payment.amount} ₽
          </h3>
          <p className={styles.paymentDescription}>{payment.description}</p>
        </div>
      </div>
      <div className={`${styles.statusBadge} ${styles[payment.status]}`}>
        {PAYMENT_STATUS_LOCALIZATION[payment.status]}
      </div>
    </div>
  );
};
