// screens/common/AuthScreen.js

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, SegmentedButtons } from 'react-native-paper';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../../firebaseConfig';
import { useAuth } from '../../store/AuthContext'; // Import the useAuth hook

export default function AuthScreen({ route }) {
  const { role } = route.params;
  const { signIn } = useAuth(); // Get the new signIn function from the context

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      // Call the centralized signIn function from the context.
      // We pass it the credentials and the role this screen is for.
      await signIn(email, password, role);
      // If it succeeds, the AuthContext listener and AppNavigator will handle the rest.
    } catch (err) {
      // If signIn throws any error (wrong password, role mismatch, etc.),
      // we catch it here and display it.
      if (err.message === 'Invalid credentials for this role.') {
        setError(err.message);
      } else {
        setError('Invalid email or password.');
      }
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    // Register logic can remain the same
    if (!email || !password || !name) {
      setError('Please fill in all fields.');
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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Welcome, {role}!</Text>
      <SegmentedButtons
        value={mode}
        onValueChange={(value) => {
            setMode(value);
            setError('');
        }}
        buttons={[
          { value: 'login', label: 'Login' },
          { value: 'register', label: 'Register' },
        ]}
        style={{ marginBottom: 20 }}
      />
      {mode === 'register' && (
        <TextInput
          label={role === 'Farmer' ? 'Farm Name' : 'Full Name'}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}
      <TextInput
        label="Email"
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
        label="Password"
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
        {mode === 'login' ? 'Login' : 'Create Account'}
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