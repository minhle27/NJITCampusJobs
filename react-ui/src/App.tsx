import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Pages/LoginForm/Login.tsx";
import Register from "./Components/Pages/RegisterForm/Register.tsx";
import "./App.css";
import HomePage from "./Components/Pages/HomePage/HomePage.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import RequireAuth from "./Components/Modules/RequireAuth.tsx";
import EmployerDashboard from "./Components/Pages/EmployerDashboard/index.tsx";
import TrackApplicants from "./Components/Pages/TrackApplicants/index.tsx";
import NavBar from "./Components/Modules/NavBar.tsx";
import TrackApplications from "./Components/Pages/TrackApplications/index.tsx";
import Inbox from "./Components/Pages/Inbox/index.tsx";
import { useEffect } from "react";
import { socket } from "./client-socket.ts";
import { useInitSocketMutation } from "./services/apiSlice.ts";
import Profile from "./Components/Pages/ProfilePage/index.tsx";

const App = () => {
  const auth = useAuth();
  const [initSocket] = useInitSocketMutation();

  useEffect(() => {
    const onConnect = async () => {
      await initSocket(socket.id).unwrap();
    }

    socket.on('connect', onConnect);

    return () => {
      socket.off('connect', onConnect);
    };
  }, [initSocket]);
  
  return (
    <div className="flex flex-col h-screen">
      <Router>
        <RequireAuth>
          <NavBar />
        </RequireAuth>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/applicants/:id"
            element={
              <RequireAuth>
                <TrackApplicants />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/:id"
            element={
              <RequireAuth>
                <EmployerDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/applications/:id"
            element={
              <RequireAuth>
                <TrackApplications />
              </RequireAuth>
            }
          />
          <Route
            path="/inbox"
            element={
              <RequireAuth>
                <Inbox />
              </RequireAuth>
            }
          />
          <Route
            path="/inbox/:id"
            element={
              <RequireAuth>
                <Inbox />
              </RequireAuth>
            }
          />
          <Route
            path = "/profile/:id"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/login"
            element={auth.user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={auth.user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
