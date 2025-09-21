import React from 'react';
import { FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper';

const MOCK_ORDERS = [
  { id: 'ORD_1', from: 'Central Mandi', crop: 'Wheat (500kg)', status: 'Pending' },
  { id: 'ORD_2', from: 'Fresh Veggies Co.', crop: 'Tomatoes (50kg)', status: 'Pending' },
];

export default function FarmerOrdersScreen() {
  const handleAccept = (item) => {
    Alert.alert('Order Accepted', `You have accepted the order for ${item.crop} from ${item.from}.`);
    // TODO: Add API call to update order status
  };

  const handleReject = (item) => {
    Alert.alert('Order Rejected', `You have rejected the order for ${item.crop}.`);
     // TODO: Add API call to update order status
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.from}
        subtitle={item.crop}
        left={(props) => <Avatar.Icon {...props} icon="store" />}
      />
      <Card.Actions>
        {/* --- CHANGE: Added functional onPress --- */}
        <Button onPress={() => handleAccept(item)}>Accept</Button>
        <Button onPress={() => handleReject(item)}>Reject</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <FlatList
      data={MOCK_ORDERS}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text variant="headlineSmall" style={styles.header}>Incoming Orders</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  header: { marginBottom: 10, textAlign: 'center' },
  card: { marginBottom: 15 },
});