import React from 'react';
// Import ImageBackground to set a background image
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Text } from 'react-native-paper';

const roles = [
  { title: 'Farmer', icon: 'leaf', role: 'Farmer' },
  { title: 'Aggregator', icon: 'home-group', role: 'Aggregator' },
  { title: 'Transporter', icon: 'truck', role: 'Transporter' },
  { title: 'Retailer', icon: 'store', role: 'Retailer' },
  { title: 'Consumer', icon: 'account-group', role: 'Consumer' },
];

// --- CHANGE THIS ---
// You can replace this URL with a link to your own background image.
// Or you can use a local image with: const image = require('./path/to/your/image.png');
const backgroundImage = { uri: 'https://media.istockphoto.com/id/187251869/photo/rice-crop.jpg?s=612x612&w=0&k=20&c=ATxHepv7IZ99NcNKkA7WyPsrsjorIubeV1uZbXboGag=' };

export default function RoleSelectionScreen({ navigation }) {
  const handleSelectRole = (role) => {
    if (role === 'Consumer') {
      // If consumer, navigate to the new unauthenticated flow
      navigation.navigate('ConsumerFlow');
    } else {
      // For all other roles, go to the login/register screen
      navigation.navigate('Auth', { role });
    }
  };

  return (
    // Use ImageBackground as the main container
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <View style={styles.outerContainer}>
        {/* This view is the glassmorphic card */}
        <View style={styles.glassContainer}>
          <Text style={styles.title}>Who are you?</Text>
          {roles.map((roleInfo) => (
            <Button
              key={roleInfo.role}
              icon={roleInfo.icon}
              mode="contained"
              onPress={() => handleSelectRole(roleInfo.role)}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              {roleInfo.title}
            </Button>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Style for the ImageBackground component
  background: {
    flex: 1,
  },
  // This outer container centers the glass card
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  // --- CHANGE: Increased opacity ---
  // This container has a semi-transparent background, rounded corners,
  // and a subtle border to create a "frosted glass" effect.
  glassContainer: {
    // Increased the alpha value from 0.4 to 0.6 to make it more opaque
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    width: '100%',
  },
  // --- CHANGE: Updated title font ---
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#167028ff',
    fontSize: 42, // Made the font larger
    fontFamily: 'sans-serif', // Changed the font style (note: custom fonts require project setup)
  },
  button: {
    marginVertical: 10,
    width: '100%', // Ensure buttons fill the width of the card
  },
  buttonContent: {
    height: 50,
  },
});