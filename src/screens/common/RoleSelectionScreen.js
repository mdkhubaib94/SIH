import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
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
      {/* Language selector button */}
      <Button
        mode="text"
        style={styles.languageButton}
        onPress={handleLanguageChange}
      >
        🌐 {currentLang === 'en' ? 'English' : 'ଓଡ଼ିଆ'}
      </Button>

      {/* Title */}
      <Text variant="headlineLarge" style={styles.title}>
        {t('whoAreYou')}
      </Text>

      {/* Role buttons */}
      {roles.map((roleInfo) => (
        <Button
          key={roleInfo.role}
          icon={roleInfo.icon}
          mode="contained"
          onPress={() => handleSelectRole(roleInfo.role)}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          {t(roleInfo.titleKey)}
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
  languageButton: { position: 'absolute', top: 40, right: 20 },
});
