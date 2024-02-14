import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Pages/Authentication/Login.tsx";
import Register from "./Components/Pages/Authentication/Register.tsx";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>   
      </Router>
    </>
  );
};

export default App;
