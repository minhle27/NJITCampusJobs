import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Authentication/Login.tsx";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/auth" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
