import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import LoginForm from "../components/auth/loginForm";
import SignUp from "../components/auth/signupForm";
import ProtectedRoute from "../components/auth/protectedRoute";
import HomePage from "../components/homePage/homepage";
import Layout from "../components/sidebar/sidebar";

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
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Layout user={user} />}>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;
