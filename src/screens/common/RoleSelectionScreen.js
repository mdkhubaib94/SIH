import React, { useState, useEffect } from 'react';
// Import ImageBackground to set a background image
import { View, StyleSheet, Alert, Platform, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../../i18n';

// translation keys must match your JSON files
const roles = [
  { titleKey: 'farmer', icon: 'leaf', role: 'Farmer' },
  { titleKey: 'aggregator', icon: 'home-group', role: 'Aggregator' },
  { titleKey: 'transporter', icon: 'truck', role: 'Transporter' },
  { titleKey: 'retailer', icon: 'store', role: 'Retailer' },
  { titleKey: 'consumer', icon: 'account-group', role: 'Consumer' },
];

// --- CHANGE THIS ---
// You can replace this URL with a link to your own background image.
// Or you can use a local image with: const image = require('./path/to/your/image.png');
const backgroundImage = { uri: 'https://media.istockphoto.com/id/187251869/photo/rice-crop.jpg?s=612x612&w=0&k=20&c=ATxHepv7IZ99NcNKkA7WyPsrsjorIubeV1uZbXboGag=' };

export default function RoleSelectionScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  // Update local state when language changes
  useEffect(() => {
    const onLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', onLanguageChanged);
    return () => i18n.off('languageChanged', onLanguageChanged);
  }, [i18n]);

  const handleSelectRole = (role) => {
    navigation.navigate('Auth', { role });
  };

  const handleLanguageChange = () => {
    if (Platform.OS === 'web') {
      // Simple web prompt
      const lang = window.confirm('Switch to Odia? Click Cancel for English') ? 'or' : 'en';
      changeAppLanguage(lang);
      setCurrentLang(lang);
    } else {
      // Mobile alert
      Alert.alert(
        t('selectLanguage'),
        '',
        [
          {
            text: 'English',
            onPress: () => {
              changeAppLanguage('en');
              setCurrentLang('en');
            },
          },
          {
            text: 'ଓଡ଼ିଆ',
            onPress: () => {
              changeAppLanguage('or');
              setCurrentLang('or');
            },
          },
          { text: t('cancel'), style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>Who are you?</Text>
      {roles.map((roleInfo) => (
        <Button
          key={roleInfo.role}
          icon={roleInfo.icon}
          mode="contained"
          onPress={() => handleSelectRole(roleInfo.role)}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {roleInfo.title}
        </Button>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { textAlign: 'center', marginBottom: 30 },
  button: { marginVertical: 10 },
  buttonContent: { height: 50 },
});
