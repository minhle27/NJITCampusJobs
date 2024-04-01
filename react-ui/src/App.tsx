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

const App = () => {
  const auth = useAuth();
  const noNavBar = (path: string) => {
    return path === "/login" || path === "/register";
  };
  const renderNavBar = () => {
    return <NavBar />;
  };

  return (
    <>
      <Router>
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
            path="/trackjob/:id"
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
            path="/login"
            element={auth.user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={auth.user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
        {noNavBar(window.location.pathname) ? null : renderNavBar()}
      </Router>
    </>
  );
};

export default App;
