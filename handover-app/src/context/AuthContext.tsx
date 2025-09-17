import React, { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import { authService } from '../services/authService';
import type { AuthState, AuthContextType, AuthAction, LoginCredentials, RegisterCredentials, User } from '../types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: null
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    
    case 'AUTH_RESET_ERROR':
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<User> => {
    dispatch({ type: 'AUTH_LOADING', payload: true });
    
    try {
      // Validate email
      if (!authService.validateEmail(credentials.email)) {
        throw new Error('Ungültige E-Mail-Adresse');
      }

      const user = await authService.login(credentials);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Anmeldung fehlgeschlagen';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  // Register function
  const register = useCallback(async (credentials: RegisterCredentials): Promise<User> => {
    dispatch({ type: 'AUTH_LOADING', payload: true });
    
    try {
      // Validate email
      if (!authService.validateEmail(credentials.email)) {
        throw new Error('Ungültige E-Mail-Adresse');
      }

      // Validate password
      const passwordValidation = authService.validatePassword(credentials.password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }

      // Validate password confirmation
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('Passwörter stimmen nicht überein');
      }

      const user = await authService.register(credentials);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registrierung fehlgeschlagen';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    dispatch({ type: 'AUTH_LOADING', payload: true });
    
    try {
      await authService.logout();
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Abmeldung fehlgeschlagen';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  // Reset password function
  const resetPassword = useCallback(async (email: string): Promise<void> => {
    dispatch({ type: 'AUTH_LOADING', payload: true });
    
    try {
      // Validate email
      if (!authService.validateEmail(email)) {
        throw new Error('Ungültige E-Mail-Adresse');
      }

      await authService.resetPassword(email);
      dispatch({ type: 'AUTH_LOADING', payload: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Passwort-Reset fehlgeschlagen';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (data: { displayName?: string }): Promise<void> => {
    dispatch({ type: 'AUTH_LOADING', payload: true });
    
    try {
      await authService.updateProfile(data);
      
      // Update local state with new profile data
      if (state.user) {
        const updatedUser = { ...state.user, ...data };
        dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profil-Update fehlgeschlagen';
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw error;
    }
  }, [state.user]);

  // Set up auth state observer
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'AUTH_LOGOUT' });
      }
    });

    return unsubscribe;
  }, []);


  const contextValue: AuthContextType = {
    state,
    login,
    register,
    logout,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Hook to get current user
export const useUser = (): User | null => {
  const { state } = useAuth();
  return state.user;
};

// Hook to check if user is authenticated
export const useIsAuthenticated = (): boolean => {
  const { state } = useAuth();
  return state.isAuthenticated;
};