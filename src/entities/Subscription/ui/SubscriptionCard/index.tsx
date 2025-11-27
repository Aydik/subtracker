import { type FC } from 'react';
import styles from './index.module.scss';
import type { Subscription } from '@entities/Subscription';
import { AsyncImage } from '@entities/Subscription';

interface SubscriptionCardProps {
  subscription: Subscription;
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ subscription }) => {
  return (
    <div className={styles.subscriptionCard}>
      <AsyncImage
        src={`public/assets/images/services/${subscription.logoUrl}.png`}
        alt={subscription.name}
        className={styles.subscriptionCard__logo}
      />

      <div className={styles.subscriptionCard__info}>
        <p className={styles.subscriptionCard__name}>{subscription.name}</p>
        <p className={styles.subscriptionCard__charge}>
          Следующее списание: <br />
          {subscription.chargeDate}
        </p>
      </div>

      <div className={styles.subscriptionCard__price}>{subscription.price} ₽</div>
    </div>
  );
};
