import { type FC, useMemo } from 'react';
import styles from './index.module.scss';
import { Subscriptions } from '@widgets/Subscriptions';
import { useAppSelector } from '@src/store/hooks.ts';
import { CURRENCY } from '@shared/types/Currency.ts';

const HomePage: FC = () => {
  const subscriptions = useAppSelector((state) => state.subscriptions?.subscriptions);
  const username = useAppSelector((state) => state.user?.user?.username);
  const currency = useAppSelector((state) => state.user?.user?.currency);

  const totalAmount = useMemo(
    () => subscriptions?.reduce((sum, sub) => sum + (sub?.amount || 0), 0) || 0,
    [subscriptions],
  );

  return (
    <div className={styles.homePage}>
      <div className={styles.caption}>
        <h1 className={styles.greeting}>Привет, {username}</h1>
        <p className={styles.total}>
          Общая сумма: {totalAmount} {CURRENCY[currency || 'RUB']}/мес
        </p>
      </div>
      <Subscriptions />
    </div>
  );
};

export default HomePage;
