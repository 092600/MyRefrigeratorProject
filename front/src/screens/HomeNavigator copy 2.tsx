/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useState} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useNavigation} from '@react-navigation/native'
import MyRefri from './Home/MyRefri'
import Recipe from './Home/Recipe'
import MyPage from './Home/MyPage'
import MyFreezer from './Home/MyFreezer'
import {RouteProp, ParamListBase} from '@react-navigation/native'
import {StyleSheet, TouchableOpacity, View} from 'react-native'

type TabBarIconProps = {focused: boolean; color: string; size: number}
const icons: Record<string, string[]> = {
  MyRefri: ['fridge', 'fridge-outline'],
  Recipe: ['bowl-mix', 'bowl-mix-outline'],
  MyPage: ['account', 'account-outline'],
  MyFreezer: ['plus', 'plus-outline'],
}

const Tab = createBottomTabNavigator()

export default function MainNavigator() {
  const BtnOpt = useCallback(() => {
    console.log('hi')
  }, [])
  const [Main, setMain] = useState<boolean>(false)

  const screenOptions = ({
    route,
  }: {
    route: RouteProp<ParamListBase, string>
  }) => {
    return {
      headerShown: false,
      tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
        const {name} = route
        const focusedSize = focused ? size + 22 : size + 18
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

  const naviagation = useNavigation()
  return (
    // BottomTabNavigator
    <Tab.Navigator initialRouteName="MyRefri" screenOptions={screenOptions}>
      {/* 레시피 버튼 */}
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
          },
        }}
      />
      {/* 냉장고 버튼 */}
      <Tab.Screen
        name="MyRefri"
        component={MyRefri}
        options={{
          tabBarShowLabel: false,
          tabBarIconStyle: {
            opacity: 1,
            backgroundColor: 'green',
          },
          tabBarIcon: ({focused, color, size}) => (
            <View
              style={{
                backgroundColor: 'yellow',
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
                // alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'flex-start',
                width: '75%',
                height: '200%',
                borderColor: 'lightgrey',
                borderWidth: 1,
                borderRadius: 50,
                top: -20,
              }}>
              {/* view_icon */}
              <View style={[styles_confirm(focused === true).view_icon]}>
                {/* <Icon
                  name={focused === true ? 'plus' : 'fridge'}
                  // name={'fridge'}
                  size={65}
                  style={{
                    // position: 'absolute',
                    backgroundColor: 'green',
                    // borderWidth: 1,
                    // width: focused === true ? 0 : '100%',
                    // height: focused === true ? 0 : '100%',
                    // width: '100%',
                    // height: '100%',
                    // left: focused === true ? '0%' : 0,
                    // zIndex: focused === true ? -1000 : 100,
                    // zIndex: focused === true ? -10 : 10,
                    // zIndex: -1,
                    // zIndex: focused === true ? -1 : 10,
                    // opacity: focused === true ? 0 : 1,
                    // top: focused === true ? '-80%' : 0,
                    // zIndex: -1,
                    color: focused === true ? '#A2D9D6' : 'grey',
                    // color: 'grey',
                  }}
                /> */}
              </View>

              <View style={[styles_confirm(focused === true).view_plus]}>
                <TouchableOpacity
                  onPress={() => {
                    console.log('hi')
                  }}
                  style={{
                    // zIndex: -1,
                    // backgroundColor: 'red',
                    // position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          ),
        }}
      />

      {/* 냉장고_+ 버튼 */}
      {/* <Tab.Screen
        name="MyFreezer"
        component={MyFreezer}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              // name={focused === true ? 'plus' : 'fridge'}
              name={'plus'}
              size={65}
              style={{
                backgroundColor: 'white',
                width: '75%',
                height: '185%',
                borderColor: 'lightgrey',
                borderWidth: 1,
                borderRadius: 40,
                top: -20,
                justifyContent: 'center',
                paddingLeft: '12%',
                paddingTop: '10%',
                zIndex: -1,
                // color: focused === true ? '#A2D9D6' : 'grey',
                color: 'grey',
              }}
              // onLongPress={FoucsedFunc(focused)}
              onPress={() => {
                console.log(Main)
              }}
            />
          ),
        }}
      /> */}

      {/* 내 페이지 버튼 */}
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  )
}

const styles_confirm = (booleanValue: boolean) =>
  StyleSheet.create({
    view_icon: {
      // position: 'absolute',
      backgroundColor: 'green',
      width: '100%',
      // width: booleanValue === true ? 0 : '100%',
      height: '100%',
      // height: booleanValue === true ? 0 : '100%',
      opacity: booleanValue === true ? 0 : 1,
      // top: booleanValue === false ? 0 : '-300%',
    },
    view_plus: {
      position: 'absolute',
      backgroundColor: 'black',
      width: '100%',
      height: '100%',
      opacity: booleanValue === false ? 0 : 1,
      top: booleanValue === false ? 0 : '-100%',
    },
  })
