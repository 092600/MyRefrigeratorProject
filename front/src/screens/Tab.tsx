import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import {Colors} from 'react-native-paper'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import Login from './Login'
// import SignUp from './SignUp'
// import TabNavigator from './TabNavigator'
import MyRefri from './Home/MyRefri'
import Recipe from './Home/Recipe'
import MyPage from './Home/MyPage'

const Tab = createBottomTabNavigator()

const Tabs = () => {
  return (
    // BottomTabNavigator
    <Tab.Navigator initialRouteName="MyRefri">
      <Tab.Screen name="Recipe" component={Recipe} />
      <Tab.Screen name="MyRefri" component={MyRefri} options={{}} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  )
}

export default Tabs
