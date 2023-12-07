import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';

const AuthContext = () => {
  return (
    <AuthProvider>
      <ChildComponent />
    </AuthProvider>
  );
};

export default AuthContext;

const ChildComponent = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <p>Is Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
