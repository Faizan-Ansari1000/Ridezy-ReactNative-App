// navigation/TopTabNavigation.js

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'react-native';
import Offers from '../../screens/client/Offers';
import Notifications from '../../screens/client/Notifications';

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigation() {
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#641e16',
          tabBarLabelStyle: { fontWeight: 'bold', paddingTop: 30 },
          tabBarIndicatorStyle: { backgroundColor: '#641e16' },
        }}
      >
        <Tab.Screen name="Offers" component={Offers} />
        <Tab.Screen name="Notifications" component={Notifications} />
      </Tab.Navigator>
    </>
  );
}
