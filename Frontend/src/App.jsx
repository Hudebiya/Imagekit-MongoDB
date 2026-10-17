import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import PostsDashboard from "./components/PostsDashboard";
import CreatePost from "./components/CreatePost";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser ? (
            <Navigate to="/feed" replace />
          ) : (
            <AuthForm onLoginSuccess={handleLoginSuccess} />
          )
        }
      />

      <Route
        path="/feed"
        element={
          currentUser ? (
            <PostsDashboard />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/create"
        element={
          currentUser ? (
            <CreatePost />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route
        path="/edit"
        element={
          currentUser ? (
            <CreatePost />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;