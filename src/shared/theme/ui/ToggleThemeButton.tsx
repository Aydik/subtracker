import { Switch } from 'antd';
import { useTheme } from '@shared/theme';
import { useEffect, useState } from 'react';

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(theme === 'dark');

  useEffect(() => {
    setChecked(theme === 'dark');
  }, [theme]);

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return <Switch checked={checked} onChange={toggle} />;
};
