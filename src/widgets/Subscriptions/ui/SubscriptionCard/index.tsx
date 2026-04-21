import { type FC } from 'react';
import styles from './index.module.scss';
import { AsyncImage } from '@shared/ui/AsyncImage';
import type { SubscriptionResponse } from '@src/api/models';
import { isoToRussianDate } from '@shared/utils/formatDate.ts';

interface SubscriptionCardProps {
  subscription: SubscriptionResponse;
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ subscription }) => {
  return (
    <div className={styles.subscriptionCard}>
      <AsyncImage src={subscription.logoUrl || ''} alt={subscription.serviceName || ''} />

      <div className={styles.subscriptionCard__info}>
        <p className={styles.subscriptionCard__name}>{subscription.serviceName}</p>
        <p className={styles.subscriptionCard__charge}>
          Следующее списание: <br />
          {isoToRussianDate(subscription.timeToPay)}
        </p>
      </div>

      <div className={styles.subscriptionCard__price}>{subscription.amount} ₽</div>
    </div>
  );
};
