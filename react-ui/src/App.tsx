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
import RequireEmployer from "./Components/Modules/RequireEmployer.tsx";
import EmployerDashboard from "./Components/Pages/EmployerDashboard/index.tsx";

const App = () => {
  const auth = useAuth();

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
            path="/dashboard"
            element={
              <RequireEmployer>
                <EmployerDashboard />
              </RequireEmployer>
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
    </>
  );
};

export default App;
