import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AsyncImage } from '@shared/ui/AsyncImage';
import { formatDate } from '@shared/utils/formatDate.ts';

import type { SubscriptionResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './SubscriptionCard.module.scss';

export type SubscriptionCardProps = {
  subscription: SubscriptionResponse;
};

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ subscription }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.subscriptionCard}>
      <AsyncImage src={subscription.logoUrl || ''} alt={subscription.serviceName || ''} />

      <div className={styles.subscriptionCard__info}>
        <p className={`${styles.subscriptionCard__name} text-ellipsis`}>
          {subscription.serviceName}
        </p>
        <p className={styles.subscriptionCard__charge}>
          {t('subscriptions.nextCharge')}: <br />
          {formatDate(subscription.timeToPay, i18n.language)}
        </p>
      </div>

      <div className={styles.subscriptionCard__price}>
        {subscription.amount} {t('common.rub')}
      </div>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => navigate(`/subscription/${subscription.subscriptionId}`)}
      />
    </div>
  );
};
