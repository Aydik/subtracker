import type { FC } from 'react';
import styles from './index.module.scss';
import { useParams } from 'react-router-dom';

const SubscriptionPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div className={styles.subscriptionPage}>{id}</div>;
};

export default SubscriptionPage;
