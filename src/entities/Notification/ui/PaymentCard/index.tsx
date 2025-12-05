import styles from './index.module.scss';
import { PAYMENT_STATUS_LOCALIZATION, type PaymentNotification } from '../../types';
import type { FC } from 'react';
import { AsyncImage } from '@shared/ui/AsyncImage';

interface PaymentCardProps {
  payment: PaymentNotification;
}

export const PaymentCard: FC<PaymentCardProps> = ({ payment }) => {
  const statusText = PAYMENT_STATUS_LOCALIZATION[payment.status];

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
      <div className={`${styles.statusBadge} ${styles[payment.status]}`}>{statusText}</div>
    </div>
  );
};
