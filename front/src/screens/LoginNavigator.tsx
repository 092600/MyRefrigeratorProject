/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
// import type {StackNavigationOptions} from '@react-navigation/stack'
// import {useNavigationHorizontalInterpolator} from '../hooks'
import Login from './Login'
import SignUp from './SignUp'
import Login0 from './Login0'
import WalkThrough from './WalkThrough'
import FindID from './FindID'
import FindPW from './FindPW'
import HomeNavigator from './HomeNavigator'
import type {RouteProp, ParamListBase} from '@react-navigation/native'

const Stack = createStackNavigator()

export default function MainNavigator() {
  // const interpolator = useNavigationHorizontalInterpolator()
  // const leftOptions = useMemo<StackNavigationOptions>(
  //   () => ({
  //     gestureDirection: 'horizontal-inverted',
  //     cardStyleInterpolator: interpolator,
  //   }),
  //   [],
  // )
  // const rightOptions = useMemo<StackNavigationOptions>(
  //   () => ({
  //     gestureDirection: 'horizontal',
  //     cardStyleInterpolator: interpolator,
  //   }),
  //   [],
  // )
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login0" component={Login0} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="WalkThrough" component={WalkThrough} />
      <Stack.Screen name="FindID" component={FindID} />
      <Stack.Screen name="FindPW" component={FindPW} />
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
    </Stack.Navigator>
  )
}
