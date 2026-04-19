import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@app/router/AppRouter.tsx';
import { App as AntdApp, ConfigProvider } from 'antd';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/api/queryClient.ts';
import ruRU from 'antd/locale/ru_RU';
import { ThemeProvider } from '@shared/theme';

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider locale={ruRU}>
        <QueryClientProvider client={queryClient}>
          <AntdApp>
            <BrowserRouter basename="/subtracker/">
              <AppRouter />
            </BrowserRouter>
          </AntdApp>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
