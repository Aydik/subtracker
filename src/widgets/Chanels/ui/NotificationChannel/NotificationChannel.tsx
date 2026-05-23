import { ToggleSwitch } from '@shared/ui/ToggleSwitch';
import { CHANNEL_LOCALIZATION } from '@widgets/Chanels/types.ts';

import type { NotificationChannelType } from '@widgets/Chanels/types.ts';
import type { FC } from 'react';

import styles from './NotificationChannel.module.scss';

export type NotificationChannelProps = {
  channel: NotificationChannelType;
  onChange: (id: string, enabled: boolean) => void;
};

export const NotificationChannel: FC<NotificationChannelProps> = ({ channel, onChange }) => {
  return (
    <div className={styles.channelItem}>
      <span className={styles.channelName}>{CHANNEL_LOCALIZATION.push}</span>

      <ToggleSwitch
        id={`channel-${channel.name}`}
        checked={channel.isEnabled}
        onChange={(checked) => onChange(channel.name, checked)}
        ariaLabel={`Переключить ${CHANNEL_LOCALIZATION.push}`}
      />
    </div>
  );
};
