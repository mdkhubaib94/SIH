import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../store/AuthContext';

// Import Common Screens
import SplashScreen from '../screens/common/SplashScreen';
import OnboardingScreen from '../screens/common/OnboardingScreen';
import RoleSelectionScreen from '../screens/common/RoleSelectionScreen';
import AuthScreen from '../screens/common/AuthScreen';
import ProfileScreen from '../screens/common/ProfileScreen';
import QRScanScreen from '../screens/common/QRScanScreen';
import BatchDetailsScreen from '../screens/common/BatchDetailsScreen';

// Import Farmer Screens
import FarmerHomeScreen from '../screens/farmer/FarmerHomeScreen';
import FarmerQRCodesScreen from '../screens/farmer/FarmerQRCodesScreen';
import FarmerOrdersScreen from '../screens/farmer/FarmerOrdersScreen';

// Import Aggregator Screens
import AggregatorHomeScreen from '../screens/aggregator/AggregatorHomeScreen';
import AggregatorTransactionsScreen from '../screens/aggregator/AggregatorTransactionsScreen';

// Import Transporter Screens
import TransporterHomeScreen from '../screens/transporter/TransporterHomeScreen';
import TransporterShipmentsScreen from '../screens/transporter/TransporterShipmentsScreen';
import TransporterDisputesScreen from '../screens/transporter/TransporterDisputesScreen';

// Import Retailer Screens
import RetailerHomeScreen from '../screens/retailer/RetailerHomeScreen';
import RetailerInventoryScreen from '../screens/retailer/RetailerInventoryScreen';

// Import Consumer Screens
import ConsumerOrdersScreen from '../screens/consumer/ConsumerOrdersScreen';
import ConsumerSupportFarmerScreen from '../screens/consumer/ConsumerSupportFarmerScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// --- ROLE-BASED TAB NAVIGATORS ---

function FarmerTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={FarmerHomeScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-outline" color={color} size={size} /> }} />
      <Tab.Screen name="QR Codes" component={FarmerQRCodesScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="qrcode" color={color} size={size} /> }} />
      <Tab.Screen name="Orders" component={FarmerOrdersScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}

function AggregatorTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={AggregatorHomeScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home-group" color={color} size={size} /> }} />
      <Tab.Screen name="Scan" component={QRScanScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} /> }} />
      <Tab.Screen name="Transactions" component={AggregatorTransactionsScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="swap-horizontal" color={color} size={size} /> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}

function TransporterTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={TransporterHomeScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="truck-outline" color={color} size={size} /> }} />
            <Tab.Screen name="Scan" component={QRScanScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} /> }} />
            <Tab.Screen name="Shipments" component={TransporterShipmentsScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="truck-delivery-outline" color={color} size={size} /> }} />
            <Tab.Screen name="Disputes" component={TransporterDisputesScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="alert-circle-outline" color={color} size={size} /> }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} /> }} />
        </Tab.Navigator>
    );
}

function RetailerTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={RetailerHomeScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="store-outline" color={color} size={size} /> }} />
            <Tab.Screen name="Scan" component={QRScanScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} /> }} />
            <Tab.Screen name="Inventory" component={RetailerInventoryScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="package-variant-closed" color={color} size={size} /> }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} /> }} />
        </Tab.Navigator>
    );
}

function ConsumerTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Scan" component={QRScanScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} /> }} />
            <Tab.Screen name="My Orders" component={ConsumerOrdersScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="basket-outline" color={color} size={size} /> }} />
            <Tab.Screen name="Support Farmer" component={ConsumerSupportFarmerScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="heart-outline" color={color} size={size} /> }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} /> }} />
        </Tab.Navigator>
    );
}


// --- MAIN APP STACK (Renders the correct tabs based on role) ---

const AppStack = ({ userRole }) => {
    switch (userRole) {
        case 'Farmer':
            return <FarmerTabs />;
        case 'Aggregator':
            return <AggregatorTabs />;
        case 'Transporter':
            return <TransporterTabs />;
        case 'Retailer':
            return <RetailerTabs />;
        case 'Consumer':
            return <ConsumerTabs />;
        default:
            // Fallback to consumer dashboard if role is unknown
            return <ConsumerTabs />;
    }
}

// --- ROOT NAVIGATOR (Handles the logic for auth, loading, and main app) ---

export default function AppNavigator() {
  const { isLoading, userToken, userRole } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          // When the app is checking for a token, show the splash screen
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : userToken == null ? (
          // When no token is found, show the authentication flow
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </>
        ) : (
          // When a user is logged in, show the main part of the app
          <>
            <Stack.Screen name="App">
              {() => <AppStack userRole={userRole} />}
            </Stack.Screen>
            {/* Screens that can be opened from anywhere in the app go here */}
            <Stack.Screen name="BatchDetails" component={BatchDetailsScreen} options={{ headerShown: true, title: 'Produce Journey' }}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}