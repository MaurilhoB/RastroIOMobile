import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Feather';

import Main from '../screens/Main';
import Archived from '../screens/Archived';
import Settings from '../screens/Settings';

import { useTheme } from '../hooks/theme';
import New from '../screens/New';
import Edit from '../screens/Edit';
import Track from '../screens/Track';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTintColor: theme.colors.text_primary,
        headerTitleStyle: { fontFamily: 'Poppins-Medium' },
        headerStyle: { backgroundColor: theme.colors.surface },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text_primary,

        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Main':
              iconName = 'package';
              break;

            case 'Archived':
              iconName = 'archive';
              break;

            case 'Settings':
              iconName = 'settings';
              break;

            default:
              iconName = 'home';
          }

          return <Icon name={iconName} color={color} size={size} />;
        },
      })}>
      <Tab.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false, title: 'Pacotes' }}
      />
      <Tab.Screen
        name="Archived"
        component={Archived}
        options={{ title: 'Arquivados' }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ title: 'Configurações' }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background_primary}
        barStyle={theme.title === 'light' ? 'dark-content' : 'light-content'}
      />
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
        <Stack.Screen
          name="Track"
          options={{
            headerTitle: 'Resultado',
            headerTintColor: theme.colors.text_primary,
            headerTitleStyle: { fontFamily: 'Poppins-Medium', fontSize: 18 },
            headerStyle: { backgroundColor: theme.colors.surface },
          }}
          component={Track}
        />
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
            headerShown: false,
            animation: 'slide_from_bottom',
          }}>
          <Stack.Screen name="New" component={New} />
          <Stack.Screen name="Edit" component={Edit} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};

export default Routes;
