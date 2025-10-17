import type { ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#f8d81c',
    fontFamily: 'Tektur, sans-serif',
    colorSplit: '#ffffff',
    colorText: '#ffffff',
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

      boxShadow: 'none',
      primaryShadow: 'none',
      defaultShadow: 'none',
    },

    Form: {
      itemMarginBottom: 0,
      fontSize: 16,
    },

    Input: {
      colorBgContainer: 'rgba(var(--color-gray-rgb), 0.5)',
      colorText: '#ffffff',
      colorBorder: 'rgba(255, 255, 255, 0.2)',
      colorTextPlaceholder: 'var(--color-light-gray)',
      hoverBorderColor: 'var(--color-primary-hover)',
      activeShadow: '0 0 0 2px rgba(var(--color-primary-hover-rgb), 0.2)',
    },
  },
};

export const lightTheme: ThemeConfig = darkTheme;
