import { type FC, useState } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import {
  SERVICE_CATEGORY_OPTIONS,
  SERVICE_CATEGORY_OPTIONS_LOCALIZATION,
  type ServiceCategoryOption,
} from '@entities/Service';

export const SubscriptionCategories: FC = () => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryOption>('ALL');

  return (
    <div className={styles.subscriptionCategories}>
      {SERVICE_CATEGORY_OPTIONS.map((category) => (
        <button
          key={category}
          className={clsx(
            styles.categoryButton,
            activeCategory === category ? styles.categoryButton_active : undefined,
          )}
          onClick={() => setActiveCategory(category)}
        >
          {SERVICE_CATEGORY_OPTIONS_LOCALIZATION[category]}
        </button>
      ))}
    </div>
  );
};
