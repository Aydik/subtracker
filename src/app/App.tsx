import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'app/router/AppRouter.tsx';

function App() {
  return (
    <BrowserRouter basename="/subtracker/">
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
