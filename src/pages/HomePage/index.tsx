import { type FC } from 'react';
import styles from './index.module.scss';
import { mockSubscriptions } from '@widgets/Subscriptions/constants';
import { Subscriptions } from '@widgets/Subscriptions';

const HomePage: FC = () => {
  const totalAmount = mockSubscriptions.reduce((sum, sub) => sum + sub.price, 0);

  return (
    <div className={styles.homePage}>
      <div className={styles.caption}>
        <h1 className={styles.greeting}>Привет, Пользователь</h1>
        <p className={styles.total}>Общая сумма: {totalAmount} ₽/мес</p>
      </div>
      <Subscriptions />
    </div>
  );
};

export default HomePage;
