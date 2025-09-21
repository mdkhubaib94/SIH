import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Text, Title, Chip, List } from 'react-native-paper';

export default function DisputeDetailsScreen({ route, navigation }) {
  // The dispute object would be passed from the Disputes list screen
  const { dispute } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Dispute ID: {dispute.id}</Title>
          <Text>Regarding Batch: {dispute.batchId}</Text>
          <Chip icon="information" style={styles.chip}>{dispute.status}</Chip>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <List.Section>
            <List.Subheader>Dispute Details</List.Subheader>
            <List.Item
              title="Reason for Dispute"
              description={dispute.reason}
              left={() => <List.Icon icon="alert-circle-outline" />}
            />
            <List.Item
              title="Date Raised"
              description={dispute.date}
              left={() => <List.Icon icon="calendar" />}
            />
            <List.Item
              title="Raised By"
              description={dispute.raisedBy}
              left={() => <List.Icon icon="account-arrow-up" />}
            />
          </List.Section>
        </Card.Content>
      </Card>
      
      {dispute.status === 'Pending Review' && (
        <View style={styles.actions}>
            <Button mode="contained" onPress={() => console.log('Resolve Dispute')}>
                Resolve
            </Button>
            <Button mode="outlined" onPress={() => console.log('Add Comment')}>
                Add Comment
            </Button>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  card: { marginBottom: 15 },
  chip: { alignSelf: 'flex-start', marginTop: 10 },
  actions: { 
      flexDirection: 'row', 
      justifyContent: 'space-around',
      marginTop: 20,
    },
});