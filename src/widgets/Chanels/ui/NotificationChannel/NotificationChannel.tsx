import { useTranslation } from 'react-i18next';

import { ToggleSwitch } from '@shared/ui/ToggleSwitch';

import type { NotificationChannelType } from '@widgets/Chanels/types.ts';
import type { FC } from 'react';

import styles from './NotificationChannel.module.scss';

export type NotificationChannelProps = {
  channel: NotificationChannelType;
  onChange: (id: string, enabled: boolean) => void;
};

export const NotificationChannel: FC<NotificationChannelProps> = ({ channel, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.channelItem}>
      <span className={styles.channelName}>{t('notifications.push')}</span>

      <ToggleSwitch
        id={`channel-${channel.name}`}
        checked={channel.isEnabled}
        onChange={(checked) => onChange(channel.name, checked)}
        ariaLabel={t('notifications.push')}
      />
    </div>
  );
};
