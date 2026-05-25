import { useTranslation } from 'react-i18next';

import { CURRENCY } from '@shared/types/Currency.ts';
import { useAppSelector } from '@src/store/hooks.ts';
import { Subscriptions } from '@widgets/Subscriptions';

import type { FC } from 'react';

import styles from './HomePage.module.scss';

const HomePage: FC = () => {
  const { t } = useTranslation();
  const username = useAppSelector((state) => state.user?.user?.username);
  const currency = useAppSelector((state) => state.user?.user?.currency);
  const analytics = useAppSelector((state) => state.analytics);

  return (
    <div className={styles.homePage}>
      <div className={styles.caption}>
        <h1 className={styles.greeting}>
          {t('greeting.hello')}, {username}
        </h1>
        <p className={styles.total}>
          {t('profile.totalAmount')}: {analytics?.totalAmount} {CURRENCY[currency || 'RUB']}/
          {t('subscriptions.monthly').toLowerCase()}
        </p>
      </div>
      <Subscriptions />
    </div>
  );
};

export default HomePage;
