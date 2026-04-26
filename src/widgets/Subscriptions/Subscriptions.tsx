import { type FC, useEffect, useState } from 'react';
import styles from './Subscriptions.module.scss';
import { SubscriptionCard } from './SubscriptionCard';
import { SubscriptionCategories } from './SubscriptionCategories';
import { Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useLazyGetSubscriptionsQuery } from '@src/store/api/services/subscriptionService.ts';
import type { SubscriptionResponse } from '@src/api/models';
import { useCategories } from '@app/context/CategoriesContext.tsx';

export const Subscriptions: FC = () => {
  const navigate = useNavigate();

  const { categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[] | undefined>([]);

  const [getSubscriptions, { isLoading, error }] = useLazyGetSubscriptionsQuery({});

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const categoryId =
        selectedCategory === 'ALL'
          ? undefined
          : categories.find((category) => category.name === selectedCategory)?.categoryId;

      const data = await getSubscriptions({
        categoryId,
        pageable: { size: 1000, page: 0 },
      }).unwrap();

      setSubscriptions(data?.content);
    };
    fetchSubscriptions();
  }, [categories, getSubscriptions, selectedCategory]);

  return (
    <div className={styles.subscriptions}>
      <h2 className={styles.subscriptions__title}>Мои подписки</h2>
      <SubscriptionCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {isLoading ? (
        <Spin />
      ) : error ? (
        'Ошибка'
      ) : !subscriptions || subscriptions?.length === 0 ? null : (
        <ul className={styles.subscriptions__list}>
          {subscriptions.map((subscription, index) => (
            <li key={index}>
              {index !== 0 && <div className={styles.subscriptions__divider} />}
              <SubscriptionCard subscription={subscription} />
            </li>
          ))}
        </ul>
      )}
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
