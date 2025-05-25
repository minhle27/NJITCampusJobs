import './App.css';

import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes.tsx';
import { useInitSocketMutation } from './services/apiSlice.ts';
import { socket } from './utils/client-socket.ts';

const App = () => {
  const [initSocket] = useInitSocketMutation();

  useEffect(() => {
    const onConnect = async () => {
      try {
        await initSocket(socket.id).unwrap();
      } catch (err) {
        /* empty */
      }
    };

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
