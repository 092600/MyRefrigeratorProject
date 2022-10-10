/* eslint-disable @typescript-eslint/no-shadow */
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
import {useNavigation, useRoute} from '@react-navigation/native';
// prettier-ignore
import {SafeAreaView, View, Text, TextInput, TouchableView}
from '../theme';
import {useAutoFocus, AutoFocusProvider} from '../contexts';
import {MaterialCommunityIcon as Icon} from '../theme';

export default function FindID() {
  const route = useRoute();
  const route_json = JSON.stringify(route, null, 2);
  const backPage = JSON.parse(route_json).params.backPage;

  const [email, setEmail] = useState<string>('');
  const [emailSend, setSend] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const focus = useAutoFocus();
  const navigation = useNavigation();
  const goFindId = useCallback(() => navigation.navigate('FindID', {backPage: backPage}), []);
  const goFindPW = useCallback(() => navigation.navigate('FindPW', {backPage: backPage}), []);

  console.log('(',Platform.OS,') emailSend:',emailSend)
  // 이메일 확인용 정규식
  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          {/* header */}
          <View style={[styles.view_header]}>
            <Icon
              name="arrow-left-thick"
              size={45}
              onPress={() => {
                if (backPage === 'Login'){
                  console.log(backPage)
                  navigation.navigate(backPage, {user_email: '이메일을 입력해주세요.'})
                } else {
                  navigation.navigate(backPage)
                }
              }}
              style={[styles.icon]}
            />
            {/* 아이디/비밀번호 찾기 */}
            <View style={[styles.header_text_view]}>
              <Text style={[styles.header_text]}>아이디/비밀번호 찾기</Text>
            </View>
          </View>

          {/* middle */}
          <View style={[styles.view_middle]}>
            {/* 아이디/비밀번호 찾기 menu */}
            <View style={[styles.middle_menu]}>
              <TouchableOpacity
                style={[styles.menu, {marginLeft: '-2%',borderBottomColor: '#AED1CF',borderWidth: 2}]}
                onPress={goFindId}>
                <Text style={[styles.menu_text, {color: '#A2D9D6'}]}>아이디 찾기</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.menu]} onPress={goFindPW}>
                <Text style={[styles.menu_text]}>비밀번호 찾기</Text>
              </TouchableOpacity>
            </View>
            {/* 아이디/비밀번호 찾기 content */}
            <View style={[styles.middle_email]}>
              {/* 안내문 */}
              <View style={[styles.email_text]}>
                {/* send = false  */}
                <Text style={[styles_confrim(emailSend === true).email_text2]}>
                  인증에 필요한 <Text style={[{fontWeight: '600'}]}>이메일 주소</Text>를 입력해주세요.
                  {'\n'}
                  입력한 이메일에 <Text style={[{fontWeight: '600'}]}>확인 코드</Text>를 보내드립니다.
                </Text>
                <Text style={[styles_confrim(emailSend === false).email_text3]}>
                  입력한 이메일로 <Text style={[{fontWeight: '600'}]}>확인 코드</Text>를 보냈습니다.
                </Text>
              </View>
              {/* 이메일 입력 / 이미지 */}
              <View style={[styles.email_input]}>
                <TextInput
                  style={[styles.input_text,styles_confrim(email !== '').input_text]}
                  value={email}
                  onChangeText={(email) => {
                      setEmail(email)
                      if (reg_email.test(email) !== true) {
                        setSend(false)
                      }
                    }
                  }
                  placeholder={'이메일 주소를 입력해주세요.'}
                  placeholderTextColor="grey"
                  onEndEditing={() => {
                   if (reg_email.test(email) !== true) {
                    Alert.alert('이메일 형식이 아닙니다.')
                   } else {setSend(true)}
                  }}
                />
                <TouchableOpacity 
                  style={[styles.email_img]}
                  onPress={() => {setSend(true)}}>
                  <ImageBackground
                    source = {emailSend === true ? require('../assets/images/confirm.png') : require('../assets/images/next.png')}
                    resizeMode="contain"
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
              {/* 확인코드 입력 / 이미지 */}
              <View style={[styles.email_code]}>
                <TextInput
                    style={[styles.input_text,styles_confrim(code !== '').input_text,styles_confrim(emailSend !== true).input_text2]}
                    value={code}
                    onChangeText={setCode}
                    placeholder={'확인 코드 입력 (6자리 숫자)'}
                    placeholderTextColor="grey"
                    // onEndEditing={}
                  />
              </View>
            </View>
          </View>
        </AutoFocusProvider>
      </View>
    </SafeAreaView>
  );
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
  },

  // ----- header -----
  view_header: {
    // backgroundColor: 'red',
    backgroundColor: 'white',
    width: '90%',
    height: '7%',
    flexDirection: 'row',
    alignContent: 'flex-start',
    top:'5%',
  },
  // 돌아가기 아이콘
  icon: {
    // backgroundColor: 'white',
    color: '#707070',
    width: '15%',
  },
  header_text_view : {
    backgroundColor: 'white',
    // backgroundColor: 'blue',
    height: '80%',
    width: '75%',
    // width: Platform.OS === 'ios' ? '75%' : '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_text: {
    fontSize: 22
  },

  // ----- middle -----
  view_middle: {
    backgroundColor: 'white',
    // backgroundColor: 'purple',
    width: '110%',
    height: '90%',
    top:'1%',
  },
  // 1. menu
  middle_menu: {
    backgroundColor: 'white',
    // backgroundColor: 'red',
    width:'100%',
    height: '10%',
    flexDirection: 'row',
  },
  menu:{
    backgroundColor: 'white',
    // backgroundColor: 'blue',
    width: '50%',
    height: '100%',
    borderColor: 'white',
    borderBottomColor: 'black',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
  },
  menu_text: {
    backgroundColor: 'white',
    height: '60%',
    fontSize: 20,
  },

  // 2. email
  middle_email : {
    backgroundColor: 'white',
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
  email_text: {
    // backgroundColor: 'blue',
    backgroundColor: 'white',
    width: '100%',
    height: '15%',
    justifyContent: 'flex-end',
  },
  email_text2 : {
    color: 'grey',
    fontSize: Platform.OS === 'ios' ? 16 : 14,
  },
  email_input: {
    // backgroundColor: 'blue',
    backgroundColor: 'white',
    width: '100%',
    height: '15%',
    top: '5%',
  },
  input_text: {
    width: '80%',
    borderColor: 'white',
    borderBottomColor: 'grey',
    borderWidth: 1.5,
    height: 50,
    fontSize: 17,
  },
  email_img: {
    backgroundColor: 'white',
    width:'25%',
    height:'65%',
    top: '-60%',
    alignSelf:'flex-end',
    left:'5%',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  // 확인 코드 입력 및 이미지
  email_code : {
    backgroundColor: 'white',
    width: '100%',
    height: '10%',
    top: '1%',
  }
})
const styles_confrim = (booleanValue: boolean) => StyleSheet.create({
  input_text: {
    borderBottomColor: booleanValue === true ? '#AED1CF' : 'grey',
  },
  email_text2: {
    opacity: booleanValue === true ? 0 : 1,
    height: booleanValue === true ? 0 : '50%',
    color: 'grey',
    fontSize: Platform.OS === 'ios' ? 16 : 14,
  },
  email_text3: {
    opacity: booleanValue === true ? 0 : 1,
    height: booleanValue === true ? 0 : '25%',
    color: 'grey',
    fontSize: Platform.OS === 'ios' ? 16 : 14,
  },
  input_text2: {
    opacity: booleanValue == true ? 0 : 1,
  }
})
