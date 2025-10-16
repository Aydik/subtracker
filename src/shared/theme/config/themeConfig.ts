import type { ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#f8d81c',
    fontFamily: 'Tektur, sans-serif',
    colorSplit: '#ffffff',
  },
  components: {
    Button: {
      // default
      defaultBg: 'var(--color-gray)',
      defaultColor: '#ffffff',
      defaultBorderColor: 'transparent',

      defaultActiveBg: 'var(--color-gray--hover)',
      defaultHoverBg: 'var(--color-gray--hover)',
      defaultHoverColor: '#ffffff',
      defaultHoverBorderColor: '#ffffff',

      // primary
      colorPrimaryBgHover: 'var(--color-primary--hover)',
      primaryColor: '#000000',

      // sizes
      fontWeight: 500,
      paddingInlineLG: 20,
      paddingBlockLG: 15,
    },
  },
};

export const lightTheme: ThemeConfig = darkTheme;
