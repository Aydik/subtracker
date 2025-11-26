import React from 'react';
import styles from './index.module.scss';
import type { Subscription } from '@entities/types';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  return (
    <div className={styles.subscriptionCard}>
      <div className={styles.subscriptionCardContent}>
        {subscription.logoUrl && (
          <img
            src={subscription.logoUrl}
            alt={subscription.name}
            className={styles.subscriptionCardLogo}
          />
        )}

        <div className={styles.subscriptionCardInfo}>
          <h3 className={styles.subscriptionCardName}>{subscription.name}</h3>
          <p className={styles.subscriptionCardCharge}>Следующее списание:</p>
          <p className={styles.subscriptionCardDate}>{subscription.chargeDate}</p>
        </div>

        <div className={styles.subscriptionCardPrice}>{subscription.price} ₽</div>
      </div>
    </div>
  );
};
