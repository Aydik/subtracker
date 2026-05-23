import { useEffect } from 'react';

import { App as AntdApp, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CategoriesProvider } from '@app/context/CategoriesContext.tsx';
import { ServicesProvider } from '@app/context/ServicesContext.tsx';
import { AppRouter } from '@app/router/AppRouter.tsx';
import { ThemeProvider } from '@shared/theme';
import { store } from '@src/store';

function App() {
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
    <Provider store={store}>
      <CategoriesProvider>
        <ServicesProvider>
          <ThemeProvider>
            <ConfigProvider locale={ruRU}>
              <AntdApp>
                <BrowserRouter basename="/subtracker/">
                  <AppRouter />
                </BrowserRouter>
              </AntdApp>
            </ConfigProvider>
          </ThemeProvider>
        </ServicesProvider>
      </CategoriesProvider>
    </Provider>
  );
}

export default App;
