import { useEffect, useState } from 'react';

import { App as AntdApp, ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import ruRU from 'antd/locale/ru_RU';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { CategoriesProvider } from '@app/context/CategoriesContext.tsx';
import { ServicesProvider } from '@app/context/ServicesContext.tsx';
import { AppRouter } from '@app/router/AppRouter.tsx';
import { ThemeProvider } from '@shared/theme';
import { store } from '@src/store';

function AppContent() {
  const { i18n } = useTranslation();
  const [antdLocale, setAntdLocale] = useState(ruRU);

  useEffect(() => {
    setAntdLocale(i18n.language === 'ru' ? ruRU : enUS);
  }, [i18n.language]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('app_theme') || 'light';
    if (savedTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      document.body.classList.remove('light-theme');
    } else {
      document.body.setAttribute('data-theme', 'light');
      document.body.classList.add('light-theme');
    }
  }, []);

  return (
    <ConfigProvider locale={antdLocale}>
      <AntdApp>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <CategoriesProvider>
        <ServicesProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </ServicesProvider>
      </CategoriesProvider>
    </Provider>
  );
}

export default App;
