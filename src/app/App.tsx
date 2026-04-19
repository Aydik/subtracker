import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@app/router/AppRouter.tsx';
import { App as AntdApp, ConfigProvider } from 'antd';

import ruRU from 'antd/locale/ru_RU';
import { ThemeProvider } from '@shared/theme';
import { Provider } from 'react-redux';
import { store } from '@src/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ConfigProvider locale={ruRU}>
          <AntdApp>
            <BrowserRouter basename="/subtracker/">
              <AppRouter />
            </BrowserRouter>
          </AntdApp>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
