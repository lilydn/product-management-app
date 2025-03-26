import { Provider } from 'react-redux';

import AppRoutes from '@/routes/AppRoutes';
import { store } from '@/store/store';

import { TopBar } from './components/TopBar';

function App() {
  return (
    <Provider store={store}>
      <div>
        <TopBar />
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
