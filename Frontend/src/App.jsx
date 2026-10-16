import { useState } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import PostsDashboard from './components/PostsDashboard';


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      {currentUser ? (
  <PostsDashboard />
) : (
  <AuthForm onLoginSuccess={handleLoginSuccess} />
)}
    </>

  );
}

export default App;