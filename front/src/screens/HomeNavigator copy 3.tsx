/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useState} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import {useNavigation} from '@react-navigation/native'
import MyRefri from './Home/MyRefri'
import Recipe from './Home/Recipe'
import MyPage from './Home/MyPage'
import MyFreezer from './Home/MyFreezer'
import {RouteProp, ParamListBase, useNavigation} from '@react-navigation/native'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import LoginNavigation from './LoginNavigator'
import MyNavigation from './Home/MyNavigation'
import {createStackNavigator} from '@react-navigation/stack'
import MyDetail from './Home/MyDetail'

type TabBarIconProps = {focused: boolean; color: string; size: number}
const icons: Record<string, string[]> = {
  MyRefri: ['fridge', 'fridge-outline'],
  Recipe: ['bowl-mix', 'bowl-mix-outline'],
  MyPage: ['account', 'account-outline'],
  MyFreezer: ['plus', 'plus-outline'],
}

const Tab = createBottomTabNavigator()

// const HomeStack = createStackNavigator()
// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator screenOptions={{headerShown: false}}>
//       <HomeStack.Screen name="Home" component={MyRefri} />
//       <HomeStack.Screen name="MyDetail" component={MyDetail} />
//     </HomeStack.Navigator>
//   )
// }

export default function MainNavigator() {
  const navigation = useNavigation()
  const screenOptions = ({
    route,
  }: {
    route: RouteProp<ParamListBase, string>
  }) => {
    return {
      headerShown: false,
      tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
        const {name} = route
        const focusedSize = focused ? size + 22 : size + 20
        const focusedColor = focused ? '#A2D9D6' : color
        const [icon, iconOutline] = icons[name]
        const iconName = focused ? icon : iconOutline
        return (
          <Icon
            name={iconName}
            size={focusedSize}
            color={focusedColor}
            // onPress={() => setMain(false)}
          />
        )
      },
    }
  }

  // const naviagation = useNavigation()
  return (
    // BottomTabNavigator
    <Tab.Navigator initialRouteName="MyRefri" screenOptions={screenOptions}>
      {/* 레시피 버튼 */}
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            // backgroundColor: 'black',
          },
          tabBarStyle: {
            backgroundColor: 'white',
          },
        }}
      />
      {/* 냉장고 버튼 */}
      <Tab.Screen
        name="MyRefri"
        component={MyNavigation}
        // listeners={() => ({
        //   tabPress: e => {
        //     e.preventDefault()
        //     // navigation.navigate('Detail')
        //   },
        // })}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused === true ? 'plus' : 'fridge'}
              // name={'fridge'}
              size={65}
              style={{
                backgroundColor: 'white',
                overflow: 'hidden',
                width: '75%',
                height: '190%',
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 46.5,
                top: -20,
                paddingLeft: '12%',
                paddingTop: '10%',
                color: focused === true ? '#A2D9D6' : 'grey',
                // color: 'grey',
              }}
            />
          ),
        }}
      />

      {/* 냉장고_+ 버튼 */}

      {/* 내 페이지 버튼 */}
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarShowLabel: false,
          tabBarIconStyle: {
            // left: '-20%',
            // width: '200%',
            // height: '100%',
          },
        }}
      />
    </Tab.Navigator>
  )
}
