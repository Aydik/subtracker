import type { FC } from 'react';
import { CHANNEL_LOCALIZATION, type NotificationChannelType } from '@entities/Notification';
import styles from './NotificationChannel.module.scss';
import { ToggleSwitch } from '@shared/ui/ToggleSwitch';

export type NotificationChannelProps = {
  channel: NotificationChannelType;
  onChange: (id: string, enabled: boolean) => void;
};

export const NotificationChannel: FC<NotificationChannelProps> = ({ channel, onChange }) => {
  return (
    <div className={styles.channelItem}>
      <span className={styles.channelName}>{CHANNEL_LOCALIZATION.push}</span>

      <ToggleSwitch
        id={`channel-${channel.id}`}
        checked={channel.isEnabled}
        onChange={(checked) => onChange(channel.id, checked)}
        ariaLabel={`Переключить ${CHANNEL_LOCALIZATION.push}`}
      />
    </div>
  );
};
