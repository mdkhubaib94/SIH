import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function FarmerHomeScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{t('farmerDashboard')}</Title>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">{t('manageProduce')}</Text>
          <Button
            icon="plus-circle"
            mode="contained"
            onPress={() => navigation.navigate('AddProduce')}
            style={styles.button}
          >
            {t('addNewProduce')}
          </Button>
          <Button
            icon="qrcode"
            mode="outlined"
            onPress={() => navigation.jumpTo('QR Codes')}
            style={styles.button}
          >
            {t('viewGeneratedQRCodes')}
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">{t('incomingOrders')}</Text>
          <Text>{t('newOrdersMessage', { count: 3 })}</Text>
          <Button
            onPress={() => navigation.jumpTo('Orders')}
            style={styles.button}
          >
            {t('viewOrders')}
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  card: { marginBottom: 20 },
  button: { marginTop: 15 },
});
