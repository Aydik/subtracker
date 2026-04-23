import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { SubscriptionForm } from '@widgets/SubscriptionForm';

const SubscriptionPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  return <SubscriptionForm id={id !== 'add' ? id : undefined} />;
};

export default SubscriptionPage;
