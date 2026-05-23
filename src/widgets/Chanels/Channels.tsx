import { useState } from 'react';

import { NOTIFICATION_CHANNELS } from '@widgets/Chanels/types.ts';
import { NotificationChannel } from '@widgets/Chanels/ui/NotificationChannel';

import type { NotificationChannelType } from '@widgets/Chanels/types.ts';
import type { FC } from 'react';

import styles from './Channels.module.scss';

export const Channels: FC = () => {
  const [channels, setChannels] = useState<NotificationChannelType[]>(
    NOTIFICATION_CHANNELS.map((name) => ({
      name,
      isEnabled: false,
    })),
  );

  const handleChannelToggle = (name: string, enabled: boolean) => {
    setChannels((prevChannels) =>
      prevChannels.map((channel) =>
        channel.name === name ? { ...channel, isEnabled: enabled } : channel,
      ),
    );
  };

  return (
    <div className={`${styles.channels} custom-scroll`}>
      {channels.map((channel) => (
        <NotificationChannel key={channel.name} channel={channel} onChange={handleChannelToggle} />
      ))}
    </div>
  );
};
