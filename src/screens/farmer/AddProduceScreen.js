import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native'; // Import Alert
import { Button, TextInput, Title } from 'react-native-paper';

export default function AddProduceScreen({ navigation }) {
  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduce = () => {
    if (!cropName || !quantity || !price) {
      Alert.alert('Incomplete Form', 'Please fill out all fields.');
      return;
    }
    // TODO: Call API to add produce to the blockchain
    console.log({ cropName, quantity, price });
    
    // --- CHANGE: Show success message and go back ---
    Alert.alert(
      'Success!',
      'A new batch has been created and a QR code is ready on the QR Codes tab.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Add New Produce Batch</Title>
      <TextInput
        label="Crop Name (e.g., Wheat)"
        value={cropName}
        onChangeText={setCropName}
        style={styles.input}
      />
      <TextInput
        label="Quantity (e.g., 500kg)"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />
      <TextInput
        label="Price per unit"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAddProduce} style={styles.button}>
        Generate Batch on Blockchain
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10, paddingVertical: 5 },
});