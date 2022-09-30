/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react'
import {StyleSheet, Platform, ImageBackground} from 'react-native'
import {useNavigation} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableView}
from '../theme'
import * as D from '../data'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {MaterialCommunityIcon as Icon} from '../theme'
import {Colors} from 'react-native-paper'

export default function Login() {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson())
  const [password, setPassword] = useState<string>()
  const focus = useAutoFocus()
  const navigation = useNavigation()
  const goHomeNavigator = useCallback(
    () => navigation.navigate('HomeNavigator'),
    [],
  )
  const goFindId = useCallback(() => navigation.navigate('SignUp'), [])
  const goFindPW = useCallback(() => navigation.navigate('SignUp'), [])
  const goFirst = useCallback(() => navigation.navigate('Login0'), [])
  const image1 = {uri: '../assets/images/kakao.jpeg'}
  // const image2 = { uri: "../assets/images/google.jpeg" };
  // const image3 = { uri: "https://reactjs.org/logo-og.png" };
  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          {/* 이전 페이지 버튼 */}
          <View style={[styles.view_icon]}>
            <Icon
              name="arrow-left-thick"
              size={45}
              onPress={goFirst}
              style={[styles.icon]}
            />
          </View>
          <Text style={styles.text_header}>나만의 냉장고</Text>

          {/* email input */}
          <View style={[styles.textView]}>
            <View style={[styles.textInputView]}>
              <TextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={person.email}
                onChangeText={email =>
                  setPerson(person => ({...person, email}))
                }
                placeholder="enter your email"
                placeholderTextColor={'grey'}
              />
            </View>
          </View>

          {/* password input */}
          <View style={[styles.textView]}>
            {/* <View style={[styles.textInputView]}> */}
            <TextInput
              secureTextEntry
              onFocus={focus}
              style={[styles.textInput]}
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호를 입력해주세요."
              placeholderTextColor={'grey'}
            />
            {/* </View> */}
          </View>

          {/* 로그인 버튼 */}
          <TouchableView
            notification
            style={[styles.touchableView]}
            onPress={goHomeNavigator}>
            <Text style={[styles.text]}>로 그 인</Text>
          </TouchableView>

          {/* 아이디/비밀번호 찾기 */}
          <View style={[styles.view_back]}>
            {/* 아이디 찾기 */}
            <Text style={[styles.text_underline]} onPress={goFindId}>
              아이디 찾기
            </Text>

            {/* 비밀번호 찾기 */}
            <Text
              style={[
                styles.text_underline,
                {left: '50%', top: '-50%', width: 80},
              ]}
              onPress={goFindPW}>
              비밀번호 찾기
            </Text>
          </View>

          {/* 소셜 로그인 */}
          <View border style={[styles.view_social]}>
            <Text style={[styles.text_social]}> 간편하게 시작하기</Text>
            <View style={[styles.social_group]}>
              <View border style={[styles.social]}>
                <ImageBackground
                  source={require('../assets/images/kakao.jpeg')}
                  style={styles.image}
                />
              </View>
              <View border style={[styles.social]}>
                <ImageBackground
                  source={require('../assets/images/google.jpeg')}
                  style={styles.image}
                />
              </View>
              <View border style={[styles.social]}>
                <ImageBackground
                  source={require('../assets/images/naver.jpeg')}
                  style={styles.image}
                />
              </View>
            </View>
          </View>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // ----- 돌아가기 아이콘 -----
  view_icon: {
    // backgroundColor: 'red',
    top: Platform.OS === 'ios' ? '-20%' : '-15%',
    right: '40%',
  },
  icon: {
    backgroundColor: 'white',
    color: '#707070',
  },

  // '나만의 냉장고' Text
  text_header: {
    fontSize: Platform.OS === 'ios' ? 30 : 28,
    // fontWeight: '900',
    color: '#70707095',
    opacity: Platform.OS === 'ios' ? 70 : 90,
    top: '-5%',
    // top: Platform.OS === 'ios' ? '-15%' : '-10%',
    // fontFamily: 'S-CoreDream-6Bold',
    // fontFamily: Platform.OS === 'android' ? 'S-CoreDream-7ExtraBold' : default,
  },

  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ----- 이메일, 비밀번호 -----
  // 이메일, 비밀번호 TextInput
  textInput: {
    fontSize: 16,
    padding: Platform.OS === 'ios' ? 10 : 5,
    borderColor: '#F1F1F5',
  },
  // 이메일, 비밀번호 View 1
  textView: {
    backgroundColor: '#F1F1F5',
    width: '75%',
    padding: 5,
    marginBottom: 10,
    borderColor: 'red',
    // top: '-10%',
    // top: Platform.OS === 'ios' ? '-10%' : '-5%',
    // backgroundColor: 'red',
  },
  // 이메일, 비밀번호 View 2
  textInputView: {
    // marginTop: 5,
  },

  // ----- 로그인 -----
  // '로그인' View
  touchableView: {
    flexDirection: 'row',
    height: 50,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A2D9D6',
    top: '5%',
    // top: Platform.OS === 'ios' ? '-14%' : '-2%',
  },
  // '로그인' Text
  text: {fontSize: 23, color: 'white', fontWeight: '700'},

  // ----- 아이디 찾기, 비밀번호 찾기 -----
  // 아이디 찾기, 비밀번호 찾기 View
  view_back: {
    width: '45%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    top: '5%',
    // top: Platform.OS === 'ios' ? '-4.5%' : '1.5%',
  },
  // 아이디 찾기, 비밀번호 찾기 Text
  text_underline: {fontSize: 13, color: '#676666', fontWeight: '600'},

  // ----- 소셜 로그인 -----
  // 소셜 로그인 View
  view_social: {
    top: '20%',
    // left: '-10%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderTopColor: '#70707090',
    borderWidth: 2,
    width: '90%',
    height: 130,
    // alignContent: 'space-between',
    alignItems: 'flex-start',
  },

  // 소셜 로그인 Text
  text_social: {
    backgroundColor: 'white',
    fontSize: 16,
    color: 'grey',
    left: '17%',
    top: -11,
    width: '38%',
    height: 20,
  },
  social_group: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    // backgroundColor: 'purple',
    // alignContent: 'space-between',
  },
  social: {
    width: '25%',
    height: '68%',
    alignItems: 'center',
    backgroundColor: 'white',
    left: '-2%',
    marginLeft: '7%',
    borderRadius: 100,
    borderColor: 'white',
    // alignContent: 'space-between',
  },
  image: {
    // flex: 1,
    width: '100%',
    height: '100%',
    // justifyContent: 'center',
  },
  // social1: {/

  // }
})
