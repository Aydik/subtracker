import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@app/router/AppRouter.tsx';
import { App as AntdApp } from 'antd';

function App() {
  return (
    <AntdApp>
      <BrowserRouter basename="/subtracker/">
        <AppRouter />
      </BrowserRouter>
    </AntdApp>
  );
}

export default App;
