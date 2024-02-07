import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { appStore } from './store/store.ts';
import './styles.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Provider store={appStore}>
      <App />
    </Provider>
  </Router>
);
