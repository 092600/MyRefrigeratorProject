/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import HomeNavigator from './HomeNavigator'
import MyPage from './Home/MyRefri'
import MyNavigation from './Home/MyNavigation'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="PLUS"
        component={MyPage}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="plus" size={50} color={'grey'} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
