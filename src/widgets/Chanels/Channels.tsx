import { useState } from 'react';

import { NotificationChannel } from '@entities/Notification';
import { mockChannels } from '@widgets/Payments/constants';

import type { FC } from 'react';

import styles from './Channels.module.scss';

export const Channels: FC = () => {
  const [channels, setChannels] = useState(mockChannels);

  const handleChannelToggle = (id: string, enabled: boolean) => {
    setChannels((prevChannels) =>
      prevChannels.map((channel) =>
        channel.id === id ? { ...channel, isEnabled: enabled } : channel,
      ),
    );
  };

  return (
    <div className={styles.channels}>
      {channels.map((channel) => (
        <NotificationChannel key={channel.id} channel={channel} onChange={handleChannelToggle} />
      ))}
    </div>
  );
};
