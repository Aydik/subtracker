import { ConfigProvider, theme as antdTheme } from 'antd';
import { type ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from './context/ThemeContext';
import type { Theme } from './types';
import { darkTheme, lightTheme } from './config/themeConfig';

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('app_theme') as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app_theme', theme);

    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      document.body.classList.remove('light-theme');
    } else {
      document.body.setAttribute('data-theme', 'light');
      document.body.classList.add('light-theme');
    }
  }, [theme]);

  const currentThemeConfig =
    theme === 'dark'
      ? { ...darkTheme, algorithm: antdTheme.darkAlgorithm }
      : { ...lightTheme, algorithm: antdTheme.defaultAlgorithm };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ConfigProvider theme={currentThemeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
