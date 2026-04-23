import { Switch } from 'antd';
import { useTheme } from '@shared/theme';
import { useState } from 'react';

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(theme === 'dark');

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setChecked(newTheme === 'dark');
  };

  return <Switch checked={checked} onChange={toggle} />;
};
