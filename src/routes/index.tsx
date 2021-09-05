import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Main from '../screens/Main';
import Archived from '../screens/Archived';
import Settings from '../screens/Settings';
import { useTheme } from '../hooks/theme';

const Tab = createBottomTabNavigator();

const Routes = () => {
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

export default Routes;
