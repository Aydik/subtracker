import styles from './index.module.scss';
import { PAYMENT_STATUS_LOCALIZATION, type PaymentNotification } from '../../types';
import type { FC } from 'react';

interface PaymentCardProps {
  payment: PaymentNotification;
  index: number;
  isLast?: boolean;
}

export const PaymentCard: FC<PaymentCardProps> = ({ payment, index, isLast }) => {
  const statusText = PAYMENT_STATUS_LOCALIZATION[payment.status];

  return (
    <>
      <div className={styles.paymentCard}>
        <div className={styles.paymentHeader}>
          <span className={styles.paymentIndex}>{index + 1}.</span>
          <div className={styles.paymentInfo}>
            <h3 className={styles.paymentTitle}>
              {payment.date} - {payment.service} {payment.amount} ₽
            </h3>
            <p className={styles.paymentDescription}>{payment.description}</p>
          </div>
        </div>
        <div className={`${styles.statusBadge} ${styles[payment.status]}`}>{statusText}</div>
      </div>
      {!isLast && <div className={styles.divider}></div>}
    </>
  );
};
