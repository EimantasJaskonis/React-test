import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { UsersProvider } from './components/contexts/UsersContext.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <BrowserRouter>
   <UsersProvider>
      <App />
   </UsersProvider>
  </BrowserRouter>
);
