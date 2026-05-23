import type { ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#f8d81c',
    fontFamily: 'Tinkoff Sans, sans-serif',
    colorSplit: '#ffffff',
    colorText: '#ffffff',
    colorBgContainer: '#1a1a1a',
  },
  components: {
    Button: {
      defaultBg: 'var(--color-gray)',
      defaultColor: '#ffffff',
      defaultBorderColor: 'transparent',
      defaultActiveBg: 'var(--color-gray--hover)',
      defaultHoverBg: 'var(--color-gray--hover)',
      defaultHoverColor: '#ffffff',
      defaultHoverBorderColor: '#ffffff',
      colorPrimaryBgHover: 'var(--color-primary--hover)',
      primaryColor: '#000000',
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

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#f8d81c',
    fontFamily: 'Tinkoff Sans, sans-serif',
    colorSplit: '#e0e0e0',
    colorText: '#1a1a1a',
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f5f5f5',
    colorBorder: '#d9d9d9',
  },
  components: {
    Button: {
      defaultBg: '#ffffff',
      defaultColor: '#1a1a1a',
      defaultBorderColor: '#d9d9d9',
      defaultHoverBg: '#f5f5f5',
      defaultHoverColor: '#1a1a1a',
      defaultHoverBorderColor: '#f8d81c',
      primaryColor: '#000000',
      fontWeight: 500,
    },
    Input: {
      colorBgContainer: '#ffffff',
      colorText: '#1a1a1a',
      colorBorder: '#d9d9d9',
      colorTextPlaceholder: '#bfbfbf',
      hoverBorderColor: '#f8d81c',
      activeShadow: '0 0 0 2px rgba(248, 216, 28, 0.2)',
    },
    Form: {
      itemMarginBottom: 0,
      fontSize: 16,
    },
    Select: {
      colorBgContainer: '#ffffff',
      colorText: '#1a1a1a',
      colorBorder: '#d9d9d9',
    },
    DatePicker: {
      colorBgContainer: '#ffffff',
      colorText: '#1a1a1a',
      colorBorder: '#d9d9d9',
    },
  },
};
