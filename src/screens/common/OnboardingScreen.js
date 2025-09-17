import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card, Text } from 'react-native-paper';

const { width } = Dimensions.get('window');

const slides = [
  { key: '1', title: 'Track your food from farm to fork.', text: 'Complete visibility into the journey of your produce.' },
  { key: '2', title: 'Fair pricing for farmers, trust for consumers.', text: 'Blockchain ensures every transaction is secure and transparent.' },
  { key: '3', title: 'Blockchain-secured, transparent, and simple.', text: 'Scan a QR code to begin the journey.' },
];

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {slides.map(slide => (
          <View key={slide.key} style={styles.slide}>
            <Card style={styles.card}>
              <Card.Content>
                <Text variant="headlineMedium" style={styles.title}>{slide.title}</Text>
                <Text variant="bodyLarge">{slide.text}</Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => navigation.replace('RoleSelection')}
        style={styles.button}
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollView: { flex: 1 },
  slide: { width: width, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '90%' },
  title: { marginBottom: 16, textAlign: 'center' },
  button: { position: 'absolute', bottom: 50, width: '80%' },
});