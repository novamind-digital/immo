import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

type AuthView = 'login' | 'register' | 'forgot-password';

const AuthContainer: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const switchToLogin = () => setCurrentView('login');
  const switchToRegister = () => setCurrentView('register');
  const switchToForgotPassword = () => setCurrentView('forgot-password');

  switch (currentView) {
    case 'login':
      return (
        <Login
          onSwitchToRegister={switchToRegister}
          onForgotPassword={switchToForgotPassword}
        />
      );
    
    case 'register':
      return (
        <Register
          onSwitchToLogin={switchToLogin}
        />
      );
    
    case 'forgot-password':
      return (
        <ForgotPassword
          onBack={switchToLogin}
        />
      );
    
    default:
      return (
        <Login
          onSwitchToRegister={switchToRegister}
          onForgotPassword={switchToForgotPassword}
        />
      );
  }
};

export default AuthContainer;