import React from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, Share, Alert } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import * as Print from 'expo-print';

export default function FarmerQRCodesScreen({ navigation }) {
  const MOCK_BATCHES = [
    { id: 'BATCH_WHEAT_001', crop: 'Wheat', quantity: '500kg', date: '2025-09-15' },
    { id: 'BATCH_TOMATO_007', crop: 'Tomatoes', quantity: '120kg', date: '2025-09-16' },
  ];

  const handleViewDetails = (batchId) => {
    navigation.navigate('BatchDetails', { batchId: batchId });
  };

  const handleShare = async (item) => {
    try {
      await Share.share({
        message: `Track my produce with AgriChain! Batch ID: ${item.id}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handlePrint = async (item) => {
    const htmlContent = `
      <html>
        <body style="text-align: center; font-family: sans-serif;">
          <h1>AgriChain Batch Information</h1>
          <h2>Crop: ${item.crop}</h2>
          <p>Batch ID: ${item.id}</p>
        </body>
      </html>
    `;
    await Print.printAsync({
      html: htmlContent,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleViewDetails(item.id)}>
      <Card style={styles.card}>
        <Card.Title title={item.crop} subtitle={`Quantity: ${item.quantity}`} />
        <Card.Content style={styles.content}>
          <View>
            <Text>Batch ID: {item.id}</Text>
            <Text>Harvested: {item.date}</Text>
            {/* --- THIS IS THE CHANGED PART --- */}
            <View style={styles.buttonRow}>
              <Button icon="share-variant" onPress={() => handleShare(item)}>
                Share
              </Button>
              <Button icon="printer" onPress={() => handlePrint(item)}>
                Print
              </Button>
            </View>
          </View>
          <QRCode value={item.id} size={100} />
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={MOCK_BATCHES}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text variant="headlineSmall" style={styles.header}>Generated QR Codes</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  header: { marginBottom: 10, textAlign: 'center' },
  card: { marginBottom: 15 },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  // --- THIS IS THE NEW STYLE ---
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});