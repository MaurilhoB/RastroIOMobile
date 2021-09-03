import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

const BottomTab = createBottomTabNavigator();

const Routes = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Main" component={() => <View></View>} />
    </BottomTab.Navigator>
  );
};

export default Routes;
