import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Title, Text } from 'react-native-paper';

export default function ConsumerEntryScreen({ navigation }) {
  const [retailerId, setRetailerId] = useState('');

  const handleViewDetails = () => {
    if (!retailerId) {
      alert('Please enter a Retailer ID.');
      return;
    }
    // Navigate to a new screen to show the retailer's products
    navigation.navigate('RetailerDetails', { retailerId: retailerId });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Find Your Produce</Title>
      
      <TextInput
        label="Enter Retailer ID"
        value={retailerId}
        onChangeText={setRetailerId}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleViewDetails}
        style={styles.button}
      >
        View Retailer's Produce
      </Button>

      <Text style={styles.orText}>OR</Text>

      <Button
        icon="qrcode-scan"
        mode="outlined"
        onPress={() => navigation.navigate('QRScan')}
        style={styles.button}
      >
        Scan a Product QR Code
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 30 },
  input: { marginBottom: 15 },
  button: { paddingVertical: 5, marginVertical: 10 },
  orText: { textAlign: 'center', marginVertical: 20, fontSize: 16 },
});