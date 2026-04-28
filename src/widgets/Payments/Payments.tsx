import { PaymentCard } from '@entities/Notification';
import { mockPayments } from '@widgets/Payments/constants';

import type { FC } from 'react';

import styles from './Payments.module.scss';

export const Payments: FC = () => {
  return (
    <section className={styles.payments}>
      <h2 className={styles.payments__title}>Ближайшие платежи</h2>
      <div className={styles.payments__list}>
        {mockPayments.map((payment, index) => (
          <li key={index}>
            {index !== 0 && <div className={styles.payments__divider} />}
            <PaymentCard key={payment.id} payment={payment} />
          </li>
        ))}
      </div>
    </section>
  );
};
