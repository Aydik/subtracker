import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import styles from './ToggleSwitch.module.scss';

export type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  ariaLabel,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.toggleContainer}>
      {label && <span className={styles.toggleLabel}>{label}</span>}

      <label className={styles.toggle}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          aria-label={ariaLabel || label || t('common.toggle')}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
