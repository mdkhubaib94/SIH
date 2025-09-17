import React, { createContext, useState, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/hyperledger'; // We will create this API function

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [hasOnboarded, setHasOnboarded] = useState(false);

    useEffect(() => {
      const bootstrapAsync = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const role = await AsyncStorage.getItem('userRole');
          // --- CHECK ONBOARDING STATUS ---
          const onboarded = await AsyncStorage.getItem('hasOnboarded');

          if (token && role) {
            setUserToken(token);
            setUserRole(role);
          }
          if (onboarded === 'true') {
            setHasOnboarded(true);
          }
        } catch (e) {
          console.error('Restoring state failed', e);
        }
        setIsLoading(false);
      };
      bootstrapAsync();
    }, []);

  const authContextValue = useMemo(() => ({
    signIn: async (email, password, role) => {
      // No need to set isLoading here for a smoother transition
      try {
        const fakeToken = 'dummy-auth-token';
        await AsyncStorage.setItem('userToken', fakeToken);
        await AsyncStorage.setItem('userRole', role);
        setUserToken(fakeToken);
        setUserRole(role);
      } catch (error) {
        console.error('Sign in failed:', error);
      }
    },
    signOut: async () => {
      // No need to set isLoading here
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userRole');
      } catch (error) {
        console.error('Sign out failed:', error);
      }
      // Set tokens to null AFTER storage is cleared
      setUserToken(null);
      setUserRole(null);
    },
    completeOnboarding: async () => {
      try {
        await AsyncStorage.setItem('hasOnboarded', 'true');
        setHasOnboarded(true);
      } catch (e) {
        console.error('Failed to save onboarding status', e);
      }
    },
    userToken,
    userRole,
    isLoading,
    hasOnboarded, // --- EXPOSE NEW STATE ---
  }), [userToken, userRole, isLoading, hasOnboarded]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};