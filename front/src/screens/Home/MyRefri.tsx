/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
// import {NavigationContainer} from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
// import MainNavigator from '../HomeNavigator'
// import {NavigationContainer} from '@react-navigation/native'
// import Tabs from '../Tab'

// import {NavigationHeader, MaterialCommunityIcon as Icon} from '../../theme'
// import {useNavigation} from '@react-navigation/native'
import MainNavigator from '../HomeNavigator'

export default function MyRefri() {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View style={[styles.view, {backgroundColor: 'black'}]}>
        {/* header */}
        <View style={[styles.view_header]}>
          {/* header_menu */}
          <View style={[styles.header_menu]}>
            {/* menu_전체 */}
            <TouchableOpacity
              style={[
                styles.menu,
                styles.menu_1,
                {backgroundColor: '#A2D9D6'},
              ]}>
              <Text
                style={[styles.menu_text, {color: 'white', fontWeight: '600'}]}>
                전 체
              </Text>
            </TouchableOpacity>

            {/* menu_냉장 */}
            <TouchableOpacity
              style={[styles.menu]}
              onPress={() => {
                navigation.navigate('MyRefri')
              }}>
              <Text style={[styles.menu_text]}>냉 장</Text>
            </TouchableOpacity>

            {/* menu_냉동 */}
            <TouchableOpacity style={[styles.menu, styles.menu_3]}>
              <Text style={[styles.menu_text]}>냉 동</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* middle */}
        <View style={[styles.view_middle]}>
          <Text>middle</Text>
        </View>

        {/* 버튼 */}
        <View style={[styles.view_btn]}>
          <TouchableOpacity
            style={{width: '100%', height: '100%'}}
            onPress={() => {
              // console.log('hi')
              navigation.navigate('Upload')
            }}>
            <ImageBackground
              source={require('../../assets/images/next.png')}
              style={[styles.btn_image]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'black',
    alignItems: 'center',
  },
  // -------- 1. header -----------
  view_header: {
    width: '100%',
    height: '10%',
    // backgroundColor: 'blue',
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  header_menu: {
    // backgroundColor: 'green',
    backgroundColor: 'white',
    width: '60%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  menu: {
    borderColor: 'black',
    borderWidth: 1,
    width: '30%',
    height: '80%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu_1: {
    borderRightColor: 'none',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  menu_3: {
    borderLeftColor: 'white',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  menu_text: {
    fontSize: 19,
    // left: 1,
  },
  // -------- 2. middle -----------
  view_middle: {
    // backgroundColor: 'red',
    backgroundColor: 'white',
    width: '100%',
    height: '90%',
  },

  // -------- 3. btn -----------
  view_btn: {
    position: 'absolute',
    backgroundColor: 'white',
    // borderWidth: 1,
    width: '20%',
    height: '10%',
    top: '88%',
    left: '75%',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_image: {
    width: '100%',
    height: '100%',
  },
})
