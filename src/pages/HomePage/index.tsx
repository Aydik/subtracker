import React, { useState } from 'react';
import styles from './index.module.scss';
import { SubscriptionCard } from '@entities/subscription/ui/SubscriptionCard';
import type { Subscription, SubscriptionCategory } from '@entities/types';

const mockSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    price: 799,
    nextCharge: 799,
    chargeDate: '19 октября',
    category: 'streaming',
    logoUrl: '',
  },
  {
    id: '2',
    name: 'Spotify',
    price: 799,
    nextCharge: 799,
    chargeDate: '19 октября',
    category: 'music',
    logoUrl: '',
  },
  {
    id: '3',
    name: 'Кинопоиск',
    price: 799,
    nextCharge: 799,
    chargeDate: '19 октября',
    category: 'streaming',
    logoUrl: '',
  },
];
export const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SubscriptionCategory>('all');

  const filteredSubscriptions =
    activeCategory === 'all'
      ? mockSubscriptions
      : mockSubscriptions.filter((sub) => sub.category === activeCategory);

  const totalAmount = mockSubscriptions.reduce((sum, sub) => sum + sub.price, 0);

  return (
    <div className={styles.subscriptionsPage}>
      <h1 className={styles.subscriptionsPageGreeting}>Привет, Пользователь</h1>
      <p className={styles.subscriptionsPageTotal}>Общая сумма: {totalAmount} ₽/мес</p>

      <div className={styles.subscriptionsPageContent}>
        <h2 className={styles.subscriptionsPageTitle}>Мои подписки</h2>

        <div className={styles.subscriptionsPageCategories}>
          {(['all', 'music', 'streaming'] as SubscriptionCategory[]).map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.categoryButtonActive : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? 'все' : category === 'music' ? 'музыка' : 'стриминг'}
            </button>
          ))}
        </div>

        <div className={styles.subscriptionsPageList}>
          {filteredSubscriptions.map((subscription) => (
            <div key={subscription.id} className={styles.subscriptionItem}>
              <SubscriptionCard subscription={subscription} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
