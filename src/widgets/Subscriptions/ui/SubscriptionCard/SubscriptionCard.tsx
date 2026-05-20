import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { AsyncImage } from '@shared/ui/AsyncImage';
import { isoToRussianDate } from '@shared/utils/formatDate.ts';

import type { SubscriptionResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './SubscriptionCard.module.scss';

export type SubscriptionCardProps = {
  subscription: SubscriptionResponse;
};

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ subscription }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.subscriptionCard}>
      <AsyncImage src={subscription.logoUrl || ''} alt={subscription.serviceName || ''} />

      <div className={styles.subscriptionCard__info}>
        <p className={`${styles.subscriptionCard__name} text-ellipsis`}>
          {subscription.serviceName}
        </p>
        <p className={styles.subscriptionCard__charge}>
          Следующее списание: <br />
          {isoToRussianDate(subscription.timeToPay)}
        </p>
      </div>

      <div className={styles.subscriptionCard__price}>{subscription.amount} ₽</div>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => navigate(`/subscription/${subscription.subscriptionId}`)}
      />
    </div>
  );
};
