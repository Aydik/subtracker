import { useParams } from 'react-router-dom';

import { SubscriptionForm } from '@widgets/SubscriptionForm';

import type { FC } from 'react';

export const SubscriptionPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  return <SubscriptionForm id={id !== 'add' ? id : undefined} />;
};
