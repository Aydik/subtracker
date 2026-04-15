import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@app/router/AppRouter.tsx';
import { App as AntdApp } from 'antd';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/api/queryClient.ts';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AntdApp>
        <BrowserRouter basename="/subtracker/">
          <AppRouter />
        </BrowserRouter>
      </AntdApp>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
