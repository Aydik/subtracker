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
      defaultBg: '#2c3844',
      defaultColor: '#ffffff',
      defaultBorderColor: 'transparent',

      defaultActiveBg: '#3a4a58',
      defaultHoverBg: '#3a4a58',
      defaultHoverColor: '#ffffff',
      defaultHoverBorderColor: '#ffffff',

      // primary
      colorPrimaryBgHover: '#f8d93e',
      primaryColor: '#000000',

      // sizes
      fontWeight: 500,
      paddingInlineLG: 20,
      paddingBlockLG: 15,
    },
  },
};

export const lightTheme: ThemeConfig = darkTheme;
