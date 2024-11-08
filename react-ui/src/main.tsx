import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Toaster } from '@/components/ui/toaster';

import App from './App.tsx';
import { store } from './app/store';
import { ConversationContextProvider } from './features/inbox/context/ConversationContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ConversationContextProvider>
          <App />
        </ConversationContextProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
