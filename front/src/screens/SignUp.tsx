/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react'
import {StyleSheet, Platform, ImageBackground, Alert} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
// prettier-ignore
import {SafeAreaView, View, Text, TextInput}
from '../theme'
// import * as D from '../data'
import {useAutoFocus, AutoFocusProvider} from '../contexts'
import {MaterialCommunityIcon as Icon} from '../theme'

export default function SignUp() {
  // email 가져오기
  const route = useRoute()
  const route_json = JSON.stringify(route, null, 2)
  const email = JSON.parse(route_json).params.user_email

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  // 일치 검사
  const [confirm, setConfirm] = useState(false)

  const focus = useAutoFocus()
  const navigation = useNavigation()
  const goFirst = useCallback(() => navigation.navigate('Login0'), []) 

  const goNextSignUp = () => {
    // email, password 가지고 nextSignup 이동
    if (password === confirmPassword) {
      navigation.navigate('SignUp2', {user_email: email, password: password}), []
    } else {
      Alert.alert('비밀번호가 일치하지 않습니다.')
    }
  }

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          {/* 0. header */}
          <View style={[styles.view_header]}>
            <Icon
              name="arrow-left-thick"
              size={45}
              onPress={goFirst}
              style={[styles.icon]}
            />
            <Text style={[styles.text_signup]}>회원가입</Text>
          </View>

          {/* 1. 사진 */}
          <View style={[styles.textView]}>
            <View style={[styles.userImage]}>
              <ImageBackground
                source={require('../assets/images/userImage.png')}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          </View>
          {/* 2. email */}
          <View style={[styles.textView]}>
            <Text style={[styles.text]}>이 메 일</Text>
            <View style={[styles.textInputView]}>
              <TextInput
                style={[styles.textInput]}
                placeholder={email}
                placeholderTextColor="grey"
                editable={false}
              />
              <View style={[styles.confirmImage]}>
                <ImageBackground
                  source={require('../assets/images/confirm.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </View>
          </View>

          {/* 3. pw */}
          <View style={[styles.textView, {top: '-3.5%'}]}>
            <Text style={[styles.text, Platform.OS === 'ios' ? {top: '-104%'} : {top: '-99%'}]}>비밀번호</Text>
            <View style={[styles.textInputView]}>
              <TextInput
                secureTextEntry
                onFocus={focus}
                style={[styles.textInput, styles_confirm(confirm).textInputFocus]}
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호를 입력해주세요."
                placeholderTextColor={'grey'}
                onEndEditing={() => {
                  setConfirm(true)
                }}
              />
              <View style={[styles.confirmImage, styles_confirm(confirm).confirmImage]}>
                <ImageBackground
                  source={require('../assets/images/confirm.png')}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </View>
          </View>

          {/* 4. pw confirm */}
          <View style={[styles.textView, {top: '-4%'}]}>
            <Text style={[styles.text,styles_confirm(confirm).text, {top: '-110%'}]}>
              {'\n'} 비밀번호{'\n'}   재입력
            </Text>
            <View style={[styles.textInputView, styles_confirm(confirm).textInputView]}>
              <TextInput
                secureTextEntry
                onFocus={focus}
                style={[styles.textInput, styles.textInputFocus]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onEndEditing={goNextSignUp}
                placeholder="비밀번호를 다시 입력해주세요."
                placeholderTextColor={'grey'}
              />
              <View style={[styles.confirmImage, styles_confirm(confirm).confirmImage]}>
                <ImageBackground
                  source={password === confirmPassword ? require('../assets/images/confirm.png') : require('../assets/images/cancle.png')}
                  resizeMode="contain"
                  style={
                    [styles.image, styles_confirm(confirmPassword != '').confirmImage]
                  }
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // 상위 View
  textView: {
    width: '100%',
    padding: 5,
    marginBottom: 10,
    // opacity: 0,
    opacity: 1,
    backgroundColor: 'white',
    // alignContent: 'flex-start',
    // flexDirection: 'row',
  },

  // ---- input -----
  // input_title_text
  text: {
    // fontSize: 15,
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    alignSelf: 'center',
    right: '39%',
    top: '-100%',
    // fontFamily: 'S-CoreDream-4Regular',
  },

  // input_view
  textInputView: {
    marginTop: 5,
    width: '60%',
    height: Platform.OS === 'ios' ? 50 : 45,
    alignSelf: 'center',
    right: '-1%',
    top: '-150%',
    backgroundColor: 'white',
  },

  // input_text 태그들
  textInput: {
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    borderColor: 'grey',
    borderWidth: 1.5,
    color: '#707070',
    // fontFamily: 'S-CoreDream-6Bold',
  },

  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A2D9D6',
  },

  // ----- 0. 헤더 -----
  view_header: {
    backgroundColor: 'white',
    // top: '-8%',
    top: Platform.OS === 'ios' ? '-14%' : '-9%',
    alignSelf: 'center',
    left: 20,
    height: '10%',
  },
  // 돌아가기 아이콘
  icon: {
    backgroundColor: 'white',
    color: '#707070',
    left: '-40%',
    top: '-9%',
  },
  // 회원가입 Text
  text_signup: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    color: '#707070',
    // opacity: Platform.OS === 'ios' ? 70 : 90,
    top: Platform.OS === 'ios' ? '-50%' : '-55%',
    // top: '-50%',
    left: '-5%',
  },

  // ----- 1. 사진 -----
  // 유저 이미지 View
  userImage: {
    top: Platform.OS === 'ios' ? '-100%' : '-70%',
    width: '30%',
    height: 120,
    backgroundColor: 'white',
    borderColor: 'white',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // ----- 2. 이메일 -----
  // 컨펌 이미지
  confirmImage: {
    top: '-100%',
    width: '23%',
    backgroundColor: 'white',
    left: '105%',
  },
  // ----- 3. 비밀번호 -----
  textInputFocus: {
    borderColor: '#A2D9D6',
  },
  textInputUnvi: {
    opacity: 0,
  }
})

const styles_confirm = (confirm: boolean) => StyleSheet.create({
  // 컨펌 이미지
  confirmImage: {
    opacity: confirm === true ? 1 : 0,
  },
  textInputView: {
    opacity: confirm === true ? 1 : 0,
  },
  text: {
    opacity: confirm === true ? 1 : 0,
  },
  textInputFocus: {
    borderColor: confirm === true ? 'grey' : '#A2D9D6',
  },
})

