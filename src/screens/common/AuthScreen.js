import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text, SegmentedButtons } from 'react-native-paper';
import { AuthContext } from '../../store/AuthContext';
import { auth } from '../../../firebaseConfig'; // Import your Firebase auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen({ route, navigation }) {
  const { role } = route.params;
  const { signIn } = useContext(AuthContext);

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // --- NEW FIREBASE LOGIN FUNCTION ---
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, Firebase handles the user session.
      // We then call our context's signIn to update the app state.
      signIn(email, password, role); 
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- NEW FIREBASE REGISTER FUNCTION ---
  const handleRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // After successful registration, automatically log the user in.
      signIn(email, password, role);
      // You could also save the 'name' and 'role' to Firestore here
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Welcome, {role}!</Text>
      <SegmentedButtons
        value={mode}
        onValueChange={setMode}
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
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
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
});