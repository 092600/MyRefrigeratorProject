/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { StyleSheet, Platform, ImageBackground, Alert, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, View, Text, TextInput } from '../theme';
import { useAutoFocus, AutoFocusProvider } from '../contexts';
import { MaterialCommunityIcon as Icon } from '../theme';
import getAPI from '../components/getAPI';
import DatePicker from 'react-native-date-picker';

export default function SignUp2() {
  // email, password 가져오기
  const route = useRoute();
  const route_json = JSON.stringify(route, null, 2);
  const email = JSON.parse(route_json).params.user_email;
  const password = JSON.parse(route_json).params.password;
  const [name, setname] = useState<string>('');
  const [gender, setgender] = useState<string>('');

  const [user_date, setDate] = useState(new Date());

  // 일치 검사
  const [confirm1, setConfirm1] = useState(false);
  const [confirm2, setConfirm2] = useState(true);
  const [confirm3, setConfirm3] = useState(true);

  const navigation = useNavigation();
  const goBack = () => navigation.navigate('SignUp', { user_email: email });
  const goFirst = () => {
    setConfirm1(false);
    setConfirm2(true);
    setConfirm3(true);
  };
  const goSecond = () => {
    setConfirm1(true);
    setConfirm2(false);
    setConfirm3(true);
  };
  return (
    <SafeAreaView>
      <View style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          {/* 0. header */}
          <View style={[styles.view_header]}>
            <Icon
              name="arrow-left-thick"
              size={45}
              onPress={goBack}
              style={[styles_confirm(!confirm1).icon]}
            />
            <Icon
              name="arrow-left-thick"
              size={45}
              onPress={goFirst}
              style={[styles_confirm(!confirm2).icon]}
            />
            <Icon
              name="arrow-left-thick"
              size={45}
              onPress={goSecond}
              style={[styles_confirm(!confirm3).icon]}
            />
            {/* <Text style={[styles.text_signup]}>회원가입</Text> */}
          </View>

          {/* 1. 닉네임 */}
          <View style={[styles.view_middle, styles_confirm(confirm1).view_middle2]}>
            <Text style={[styles.text]}>닉네임을 입력해주세요.</Text>
            <View style={[styles.textInputView]}>
              <TextInput
                style={[styles.textInput, styles_confirm(name !== '').textInput]}
                placeholder={'닉네임'}
                placeholderTextColor="grey"
                value={name}
                onChangeText={setname}
                onEndEditing={() => {
                  setConfirm1(true);
                  setConfirm2(false);
                }}
              />
            </View>
          </View>

          {/* 2. 성별 */}
          <View style={[styles.view_middle, styles_confirm(confirm2).view_middle2]}>
            <Text style={[styles.text]}>성별을 선택해주세요.</Text>
            <View style={[styles.genderView]}>
              <TextInput
                style={[styles.genderBtn, styles_confirm(gender === 'M').genderBtn]}
                value={'남 성'}
                editable={false}
                textAlign={'center'}
                onPressIn={() => {
                  setgender('M');
                  setTimeout(() => {
                    setConfirm2(true);
                    setConfirm3(false);
                  },500);
                }}
              />
              <TextInput
                style={[styles.genderBtn, styles_confirm(gender === 'F').genderBtn]}
                value={'여 성'}
                editable={false}
                textAlign={'center'}
                onPressIn={() => {
                  setgender('F');
                  setTimeout(() => {
                    setConfirm2(true);
                    setConfirm3(false);
                  },500);
                }}
              />
            </View>
          </View>

          {/* 3. 나이 */}
          <View style={[styles.view_middle, styles_confirm(confirm3).view_middle2]}>
            <Text style={[styles.text]}>생년월일을 선택해주세요.</Text>
            <View style={[styles.ageView]}>
              <DatePicker
                date={user_date}
                onDateChange={setDate}
                androidVariant="nativeAndroid"
                locale="ko"
                mode="date"
                onCancel={() => {
                  console.log('hi')
                }}
              />
            </View>
            <TextInput
                style={[styles.confirmBtn]}
                value={'완료'}
                editable={false}
                textAlign={'center'}
                onPressIn={() => {
                  // range
                  // const year = user_date.getFullYear()

                  const month = user_date.getMonth() + 1;
                  const birthday = (month <= 9 ? '0' + month : month) + '-' + user_date.getDate();

                  const apiHost = getAPI();
                  fetch(apiHost + '/api/v4/accounts/signup', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: email,
                      password: password,
                      name: name,
                      gender: gender,
                      birthday: birthday,
                    }),
                  })
                    .then(response => response.json())
                    .then(response => {
                      console.log('response:',response);
                      // console.log('response.json():',response.json());
                      // if (response === true) {
                        // navigation.navigate('SignUp', { user_email: email });
                      // }
                    })
                    .catch(function (error) {
                      console.log('error:',error);
                    });
                }}
              />
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

  // ----- 0. 헤더 -----
  view_header: {
    backgroundColor: 'white',
    width: '90%',
    height: '7%',
    flexDirection: 'row',
    alignContent: 'flex-start',
    top:'5%',
  },
  // 돌아가기 아이콘
  icon: {
    backgroundColor: 'white',
    color: '#707070',
    width: '15%',
  },
  // 회원가입 Text
  // text_signup: {
  //   fontSize: Platform.OS === 'ios' ? 20 : 18,
  //   color: '#707070',
  //   alignSelf: 'center',
  //   // left: '-300%',
  //   // top: '-1%',
  // },

  // ----- 1. middle -----
  // visible
  view_middle: {
    width: '85%',
    height: '90%',
    top: '5%',
    // backgroundColor: 'skyblue',
    backgroundColor: 'white',
  },

  // ----- 1_1. 닉네임 -----
  text: {
    fontSize: Platform.OS === 'ios' ? 19 : 17,
    left: '3%',
    // fontFamily: 'S-CoreDream-6Bold',
  },
  textInputView: {
    backgroundColor: 'white',
    top: Platform.OS === 'ios' ? '1%' : '3%',
    height: '7%',
  },
  textInput: {
    borderColor: 'white',
    borderBottomColor: 'grey',
    borderWidth: 2,
    height: '100%',
    backgroundColor: 'white',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  // ----- 1_2. 성별 -----
  genderView: {
    // backgroundColor: 'red',
    backgroundColor: 'white',
    width: '100%',
    height: '10%',
    top: '10%',
    flexDirection: 'row',
  },
  genderBtn: {
    width: '45%',
    height: '65%',
    borderRadius: 20,
    marginLeft: 10,
    // paddingLeft: 60,
    fontSize: 17,
    // alignSelf: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },

  // ----- 1_3. 나이 -----
  ageView: {
    backgroundColor: 'white',
    // backgroundColor: 'purple',
    width: '100%',
    height: '40%',
    top: '3%',
  },
  confirmBtn: {
    width: '85%',
    height: '7%',
    alignSelf: 'center',
    backgroundColor: '#A2D9D6',
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 25 : 20,
    borderColor: 'white',
    borderRadius: 10,
    top: '-3%',
  },
  datePicker: {
    width: '150%',
    height: '100%',
  },
  
});

const styles_confirm = (booleanValue: boolean) => StyleSheet.create({
  textInput: {
    borderBottomColor: booleanValue === true ? '#A2D9D6' : 'grey',
  },
  view_middle2: {
    opacity: booleanValue === true ? 0 : 1,
    zIndex: booleanValue === true ? -1 : 100,
    height: booleanValue === true ? 0 : '90%',
  },
  genderBtn: {
    backgroundColor: booleanValue === true ? '#A2D9D6' : 'white',
    color: booleanValue === true ? 'white' : 'black',
    fontSize: booleanValue === true ? 19 : 17,
    fontWeight: booleanValue === true ? '900' : '600',
  },
  icon: {
    // true이면 0(안보임), false이면 1(보임)
    opacity: booleanValue === false ? 0 : 1,
    width: booleanValue === false ? 0 : '90%',
  },
});
