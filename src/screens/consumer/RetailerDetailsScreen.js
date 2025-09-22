import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Text, Card } from 'react-native-paper';

export default function RetailerDetailsScreen({ route }) {
  const { retailerId } = route.params;

  return (
    <View style={styles.container}>
      <Title>Showing Produce From</Title>
      <Text style={styles.retailerId}>Retailer: {retailerId}</Text>
      
      <Card>
        <Card.Content>
          <Text>
            Here you would fetch and display a list of all produce batches currently available from this retailer.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  retailerId: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
});