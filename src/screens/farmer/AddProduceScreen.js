import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export default function AddProduceScreen({ navigation }) {
  const { t } = useTranslation();

  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduce = () => {
    if (!cropName || !quantity || !price) {
      Alert.alert(t('incompleteForm'), t('fillAllFields'));
      return;
    }
    // TODO: Call API to add produce to the blockchain
    console.log({ cropName, quantity, price });

    Alert.alert(
      t('success'),
      t('produceBatchCreated'),
      [{ text: t('ok'), onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{t('addNewProduce')}</Title>
      <TextInput
        label={t('cropNameExample')}
        value={cropName}
        onChangeText={setCropName}
        style={styles.input}
      />
      <TextInput
        label={t('quantityExample')}
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />
      <TextInput
        label={t('pricePerUnit')}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleAddProduce}
        style={styles.button}
      >
        {t('generateBatch')}
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
