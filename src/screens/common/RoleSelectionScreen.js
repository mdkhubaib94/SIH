import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text, Switch } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../../i18n';

const roles = [
  { titleKey: 'farmer', icon: 'leaf', role: 'Farmer' },
  { titleKey: 'aggregator', icon: 'home-group', role: 'Aggregator' },
  { titleKey: 'transporter', icon: 'truck', role: 'Transporter' },
  { titleKey: 'retailer', icon: 'store', role: 'Retailer' },
  { titleKey: 'consumer', icon: 'account-group', role: 'Consumer' },
];

const backgroundImage = { uri: 'https://media.istockphoto.com/id/187251869/photo/rice-crop.jpg?s=612x612&w=0&k=20&c=ATxHepv7IZ99NcNKkA7WyPsrsjorIubeV1uZbXboGag=' };

export default function RoleSelectionScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const onLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on('languageChanged', onLanguageChanged);
    return () => i18n.off('languageChanged', onLanguageChanged);
  }, [i18n]);

  const handleSelectRole = (role) => {
    if (role === 'Consumer') {
      // If consumer, navigate to the new unauthenticated flow
      navigation.navigate('ConsumerFlow');
    } else {
      // For all other roles, go to the login/register screen
      navigation.navigate('Auth', { role });
    }
  };

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'or' : 'en';
    changeAppLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Text variant="headlineLarge" style={styles.title}>{t('whoAreYou')}</Text>
        
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

        {/* Language Switch */}
        <View style={styles.switchRow}>
          <Text style={currentLang === 'en' ? styles.activeLang : styles.inactiveLang}>English</Text>
          <Switch value={currentLang === 'or'} onValueChange={toggleLanguage} />
          <Text style={currentLang === 'or' ? styles.activeLang : styles.inactiveLang}>ଓଡ଼ିଆ</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  title: { textAlign: 'center', marginBottom: 30 },
  button: { marginVertical: 10 },
  buttonContent: { height: 50 },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  activeLang: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 10,
  },
  inactiveLang: {
    fontWeight: 'normal',
    fontSize: 16,
    marginHorizontal: 10,
    opacity: 0.6,
  },
});
