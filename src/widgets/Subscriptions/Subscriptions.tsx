import type { FC } from 'react';
import styles from './Subscriptions.module.scss';
import { SubscriptionCard } from '@entities/Subscription';
import { mockSubscriptions } from '@widgets/Subscriptions/constants';
import { SubscriptionCategories } from '@widgets/Subscriptions/ui/SubscriptionCategories';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

export const Subscriptions: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.subscriptions}>
      <h2 className={styles.subscriptions__title}>Мои подписки</h2>
      <SubscriptionCategories />
      <ul className={styles.subscriptions__list}>
        {mockSubscriptions.map((subscription, index) => (
          <li key={index}>
            {index !== 0 && <div className={styles.subscriptions__divider} />}
            <SubscriptionCard subscription={subscription} />
          </li>
        ))}
      </ul>
      <Button
        className={styles.addButton}
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={() => navigate('/subscription/add')}
      >
        Добавить подписку
      </Button>
    </div>
  );
};
