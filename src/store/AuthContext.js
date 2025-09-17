import React, { createContext, useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/hyperledger'; // We will create this API function

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const authContextValue = useMemo(() => ({
    // The signIn function now takes credentials and calls the API
    signIn: async (email, password, role) => {
      setIsLoading(true);
      try {
        // This is where you would call your actual API
        // For now, we'll simulate a successful login
        // const { token } = await loginUser({ email, password });
        const fakeToken = 'dummy-auth-token'; // Replace with actual token from API
        
        await AsyncStorage.setItem('userToken', fakeToken);
        await AsyncStorage.setItem('userRole', role);
        
        setUserToken(fakeToken);
        setUserRole(role);
      } catch (error) {
        console.error('Sign in failed:', error);
        // Here you can handle login errors, e.g., show a message to the user
      } finally {
        setIsLoading(false);
      }
    },
    signOut: async () => {
      setIsLoading(true);
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userRole');
        setUserToken(null);
        setUserRole(null);
      } catch (error) {
        console.error('Sign out failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
    userToken,
    userRole,
    isLoading,
  }), [userToken, userRole, isLoading]);

  // This effect checks for a stored token when the app starts
  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      let role;
      try {
        token = await AsyncStorage.getItem('userToken');
        role = await AsyncStorage.getItem('userRole');
        if (token && role) {
            setUserToken(token);
            setUserRole(role);
        }
      } catch (e) {
        console.error('Restoring token failed', e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};