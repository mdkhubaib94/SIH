import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Title, Text } from 'react-native-paper';
// import { updateBatchStatus } from '../../api/hyperledger'; // You would import your API function

export default function UpdateBatchScreen({ route, navigation }) {
  // The batchId and userRole would be passed from the previous screen (e.g., QRScanScreen)
  const { batchId, userRole } = route.params;

  const [updateInfo, setUpdateInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const getLabel = () => {
    switch (userRole) {
      case 'Aggregator':
        return 'Quality Grade / Storage Info';
      case 'Transporter':
        return 'Delivery Log / Vehicle Info';
      case 'Retailer':
        return 'Stocking Notes / Display Location';
      default:
        return 'Update Information';
    }
  };

  const handleUpdate = async () => {
    if (!updateInfo) {
      Alert.alert('Error', 'Please enter information to update.');
      return;
    }
    setLoading(true);
    try {
      // In a real app, you would call your API here
      // await updateBatchStatus(batchId, { status: `${userRole} Update`, metadata: updateInfo });
      
      console.log(`Updating batch ${batchId} with info: ${updateInfo}`);
      Alert.alert('Success', 'Batch information has been updated on the blockchain.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Update Failed', 'Could not update the batch information.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Update Batch: {batchId}</Title>
      <Text style={styles.subtitle}>Your Role: {userRole}</Text>
      <TextInput
        label={getLabel()}
        value={updateInfo}
        onChangeText={setUpdateInfo}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleUpdate}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Submit Update
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 20 },
  button: { paddingVertical: 5 },
});