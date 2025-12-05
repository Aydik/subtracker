import type { FC } from 'react';
import { CHANNEL_LOCALIZATION, type NotificationChannelType } from '@entities/Notification/types';
import styles from './index.module.scss';
import { ToggleSwitch } from '@shared/ui/ToggleSwitch';

interface Props {
  channel: NotificationChannelType;
  onChange: (id: string, enabled: boolean) => void;
}

export const NotificationChannel: FC<Props> = ({ channel, onChange }) => {
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
