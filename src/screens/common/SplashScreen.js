import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

export default function SplashScreen({ navigation }) {
  const theme = useTheme();

  useEffect(() => {
    // Simulate loading and then navigate
    setTimeout(() => {
      navigation.replace('Onboarding'); // Or 'RoleSelection' if you skip onboarding
    }, 2000);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primaryContainer }]}>
      <Text variant="headlineLarge" style={{ color: theme.colors.primary }}>🌱 AgriChain</Text>
      <Text variant="titleMedium" style={{ marginBottom: 20 }}>Transparent Food Journey – From Farm to Plate</Text>
      <ActivityIndicator animating={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});