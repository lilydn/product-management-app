import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/_global.scss';

import App from './App';

const container = document.getElementById('root')!;

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
