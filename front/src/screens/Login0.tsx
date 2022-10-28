/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableView}
from '../theme';
import * as D from '../data';
import {useAutoFocus, AutoFocusProvider} from '../contexts';
import {MaterialCommunityIcon as Icon} from '../theme';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  // const [person, setPerson] = useState()
  const focus = useAutoFocus();

  // Navigation (이전버튼(WalkThrought)/아이디찾기/비밀번호찾기/로그인)
  const navigation = useNavigation();
  const goFindId = useCallback(() => navigation.navigate('FindID', {backPage: 'Login0'}), []);
  const goFindPW = useCallback(() => navigation.navigate('FindPW', {backPage: 'Login0'}), []);
  const goWT = useCallback(() => navigation.navigate('WalkThrough'), []);
  const goHomeNavigator = useCallback(
    () => navigation.navigate('HomeNavigator'),
    [],
  )
  const goSignup = useCallback(
    () => navigation.navigate('SignUp', {user_email: email}),
    [],
  );

  // 이메일 확인용 정규식
  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          {/* 이전 페이지 버튼 */}
          <View style={[styles.view_icon]}>
            <Icon
              name="arrow-left-thick"
              size={45}
              onPress={goWT}
              style={[styles.icon]}
            />
          </View>

          {/* 안내문 */}
          <Text style={styles.text_header}>
            이제 냉장고를 {'\n'}채우러 가볼까요?
          </Text>

          {/* 안내문 2 */}
          <Text style={styles.text_login}>먼저, 로그인이 필요해요 :)</Text>

          {/* email input */}
          <View style={[styles.textView]}>
            <TextInput
              onFocus={focus}
              style={[styles.textInput]}
              value={email}
              onChangeText={setEmail}
              placeholder="enter your email"
              placeholderTextColor={'grey'}
            />
            {/* </View> */}
          </View>

          {/* next 버튼 */}
          <TouchableOpacity
            style={[styles.confirmImage]}
            onPress={() => {
              // 1. 이메일이 공백일 때
              if (email === '') {
                Alert.alert('이메일을 입력해주세요.');
                // 2. 이메일 형식이 아닐때
              } else if (!reg_email.test(email)) {
                Alert.alert('이메일 형식이 아닙니다.');
                // 3. 조건 충족 후 로그인/회원가입 가르기
                // fetch() 이후 결과로 로그인/회원가입
              } else {
                navigation.navigate('Login', {user_email: email});
              }
            }}>
            <ImageBackground
              source={require('../assets/images/next.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </TouchableOpacity>

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
          <TouchableOpacity style={[styles.view_social]} onPress={goHomeNavigator}>
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
          </TouchableOpacity>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  );
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

  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // '안내문' Text 1
  text_header: {
    fontSize: Platform.OS === 'ios' ? 33 : 30,
    fontWeight: '900',
    color: '#707070',
    opacity: Platform.OS === 'ios' ? 70 : 90,
    // top: '-20%',
    left: '10%',
    alignSelf: 'flex-start',
    top: Platform.OS === 'ios' ? '-15%' : '-12%',
    // fontFamily: 'S-CoreDream-6Bold',
    // fontFamily: Platform.OS === 'android' ? 'S-CoreDream-7ExtraBold' : default,
  },

  // '안내문' Text 2
  text_login: {
    fontSize: 14,
    alignSelf: 'flex-start',
    left: '7%',
    top: '-3%',
    color: '#70707064',
  },

  // ----- 이메일, 비밀번호 -----
  // 이메일 TextInput
  textInput: {
    fontSize: 16,
    padding: Platform.OS === 'ios' ? 10 : 5,
    borderColor: '#F1F1F5',
    color: 'black',
  },
  // 이메일 View 1
  textView: {
    backgroundColor: '#F1F1F5',
    width: '75%',
    padding: 5,
    marginBottom: 10,
    borderColor: 'red',
    left: '-6%',
    top: '-2%',
    // top: Platform.OS === 'ios' ? '-10%' : '-5%',
    // backgroundColor: 'red',
  },

  // ----- 로그인 버튼 -----
  confirmImage: {
    // top: '-100%',
    width: '15%',
    height: 53,
    alignSelf: 'flex-end',
    top: '-10%',
    backgroundColor: 'white',
    left: '-2%',
  },

  // ----- 아이디 찾기, 비밀번호 찾기 -----
  // 아이디 찾기, 비밀번호 찾기 View
  view_back: {
    width: '45%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    top: '-9%',
    alignSelf: 'flex-start',
    left: '10%',
    // top: Platform.OS === 'ios' ? '-4.5%' : '1.5%',
  },
  // 아이디 찾기, 비밀번호 찾기 Text
  text_underline: {fontSize: 13, color: '#707070', fontWeight: '600'},

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
});
