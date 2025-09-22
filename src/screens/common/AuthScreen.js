import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, SegmentedButtons } from 'react-native-paper';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../firebaseConfig';
import { useAuth } from '../../store/AuthContext';
import { useTranslation } from 'react-i18next'; // <-- import i18n

export default function AuthScreen({ route }) {
  const { role } = route.params;
  const { signIn } = useAuth();
  const { t } = useTranslation(); // <-- use translation hook

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError(t('errorFillEmailPassword'));
      return;
    }
    setLoading(true);
    setError('');

    try {
      await signIn(email, password, role);
    } catch (err) {
      if (err.message === 'Invalid credentials for this role.') {
        setError(t('errorInvalidRole'));
      } else {
        setError(t('errorInvalidEmailPassword'));
      }
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setError(t('errorFillAllFields'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: role,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        {t('welcomeRole', { role })}
      </Text>

      <SegmentedButtons
        value={mode}
        onValueChange={(value) => {
          setMode(value);
          setError('');
        }}
        buttons={[
          { value: 'login', label: t('login') },
          { value: 'register', label: t('register') },
        ]}
        style={{ marginBottom: 20 }}
      />

      {mode === 'register' && (
        <TextInput
          label={role === 'Farmer' ? t('farmName') : t('fullName')}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}

      <TextInput
        label={t('email')}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label={t('password')}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError('');
        }}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button
        mode="contained"
        onPress={mode === 'login' ? handleLogin : handleRegister}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        {mode === 'login' ? t('login') : t('createAccount')}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10, paddingVertical: 5 },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
