import { useEffect, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Empty, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useCategories } from '@app/context/CategoriesContext.tsx';
import { useLazyGetSubscriptionsQuery } from '@src/store/api/services/subscriptionService.ts';

import { SubscriptionCard } from './ui/SubscriptionCard';
import { SubscriptionCategories } from './ui/SubscriptionCategories';

import type { SubscriptionResponse } from '@src/api/models';
import type { FC } from 'react';

import styles from './Subscriptions.module.scss';

export const Subscriptions: FC = () => {
  const { t } = useTranslation();
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
      <h2 className={styles.subscriptions__title}>{t('subscriptions.mySubscriptions')}</h2>
      <SubscriptionCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {isLoading ? (
        <Spin />
      ) : error ? (
        t('common.error')
      ) : !subscriptions || subscriptions?.length === 0 ? (
        <Empty
          description={t('subscriptions.noSubscriptions')}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div className={styles.subscriptions__listWrapper}>
          {subscriptions && subscriptions.length > 3 && (
            <div className={styles.subscriptions__fadeTop} />
          )}
          <ul className={`${styles.subscriptions__list} custom-scroll`}>
            {subscriptions.map((subscription, index) => (
              <li key={index}>
                {index !== 0 && <div className={styles.subscriptions__divider} />}
                <SubscriptionCard subscription={subscription} />
              </li>
            ))}
          </ul>
          {subscriptions && subscriptions.length > 3 && (
            <div className={styles.subscriptions__fadeBottom} />
          )}
        </div>
      )}
      <Button
        className={styles.addButton}
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={() => navigate('/subscription/add')}
      >
        {t('subscriptions.addSubscription')}
      </Button>
    </div>
  );
};
