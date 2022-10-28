import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
// import type {StackNavigationOptions} from '@react-navigation/stack'
// import {useNavigationHorizontalInterpolator} from '../hooks'
import MyRefri from './MyRefri'
import MyDetail from './MyDetail'
import Upload from './Upload'

const Stack = createStackNavigator()

export default function MyNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'MyRefri'}>
      <Stack.Screen name="MyRefri" component={MyRefri} />
      <Stack.Screen name="MyDetail" component={MyDetail} />
      <Stack.Screen name="Upload" component={Upload} />
    </Stack.Navigator>
  )
}
