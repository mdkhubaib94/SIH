/**
 * Main entry point for the AgriChainApp.
 * This file sets up all the necessary providers (Theme, Auth, Navigation, i18n)
 * and renders the main AppNavigator.
 */
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { I18nextProvider } from 'react-i18next';

import { theme } from './constants/theme';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './store/AuthContext';
import i18n, { loadSavedLanguage } from './i18n';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      await loadSavedLanguage(); // load saved language from AsyncStorage
      setReady(true);             // only render after language is loaded
    };
    initLanguage();
  }, []);

  if (!ready) {
    // temporary fallback to avoid blank screen
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <StatusBar style="auto" />
          <AppNavigator />
        </I18nextProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
