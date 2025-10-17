import type { ThemeConfig } from 'antd';

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#f8d81c',
    fontFamily: 'Tektur, sans-serif',
    colorSplit: '#ffffff',
    colorText: '#ffffff',
    colorBgContainer: 'var(--glass-bg)',
    colorBorder: 'rgba(255, 255, 255, 0.2)',
    colorTextPlaceholder: 'var(--color-light-gray)',
    borderRadius: 10,
    fontSize: 16,
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
      labelColor: '#ffffff',
      labelFontSize: 16,
      labelHeight: 50,
      verticalLabelPadding: '0 0 7px 0',
    },

    Input: {
      colorBgContainer: 'var(--glass-bg)',
      colorText: '#ffffff',
      colorBorder: 'rgba(255, 255, 255, 0.2)',
      colorTextPlaceholder: 'var(--color-light-gray)',
      borderRadius: 10,
      paddingBlock: 16,
      paddingInline: 16,
      hoverBorderColor: 'var(--color-primary)',
      activeBorderColor: 'var(--color-primary)',
      activeShadow: '0 0 0 2px rgba(248, 216, 28, 0.2)',
    },
  },
};

export const lightTheme: ThemeConfig = darkTheme;
