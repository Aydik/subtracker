import { type FC, useState } from 'react';
import styles from './index.module.scss';
import {
  SUBSCRIPTION_CATEGORY_OPTIONS,
  SUBSCRIPTION_CATEGORY_OPTIONS_LOCALIZATION,
  type SubscriptionCategoryOption,
} from '@entities/Subscription';
import clsx from 'clsx';

export const SubscriptionCategories: FC = () => {
  const [activeCategory, setActiveCategory] = useState<SubscriptionCategoryOption>('all');

  return (
    <div className={styles.subscriptionCategories}>
      {SUBSCRIPTION_CATEGORY_OPTIONS.map((category) => (
        <button
          key={category}
          className={clsx(
            styles.categoryButton,
            activeCategory === category ? styles.categoryButton_active : undefined,
          )}
          onClick={() => setActiveCategory(category)}
        >
          {SUBSCRIPTION_CATEGORY_OPTIONS_LOCALIZATION[category]}
        </button>
      ))}
    </div>
  );
};
