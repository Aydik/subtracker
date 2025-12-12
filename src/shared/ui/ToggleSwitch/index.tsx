import type { FC } from 'react';
import styles from './index.module.scss';

interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const ToggleSwitch: FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  ariaLabel,
  disabled = false,
}) => {
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
          aria-label={ariaLabel || label || 'Переключатель'}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
