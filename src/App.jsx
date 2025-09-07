import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import LoginForm from "../components/auth/loginForm";
import SignUp from "../components/auth/signupForm";
import ProtectedRoute from "../components/auth/protectedRoute";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  let user = null;

  function handleLogin(newToken) {
    setToken(newToken);
  }

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      user = decodedToken;
      console.log(decodedToken);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
