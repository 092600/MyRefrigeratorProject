/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
} from 'react-native'
import {MaterialCommunityIcon as Icon} from '../../theme'
import DatePicker from 'react-native-date-picker';
// import {useNavigation} from '@react-navigation/native'
// import MainNavigator from '../HomeNavigator'

export default function MyDetail() {
  const [infoStock, setInfoStock] = useState<string>('%')
  const [infoName, setInfoName] = useState<string>('')
  const [infoStockNum, setInfoStockNum] = useState<number>(3)
  const [infoStockNum2, setInfoStockNum2] = useState<number>(50)
  const [user_date, setDate] = useState(new Date());
  const [open, setOpen] = useState<boolean>(false)


  // console.log(infoStock)
  const [stockVal, setStockVal] = useState<boolean>(false)
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.view]}>
        {/* // ---------- 1. header -------- */}
        <View style={[styles.view_header]}>
          <View style={[styles.header_left]}>
            <TouchableOpacity style={[styles.left_icon]}>
              <Icon name="trash-can-outline" size={43} color={'grey'} style={{backgroundColor: 'white'}} />
            </TouchableOpacity>
          </View>
          <View style={[styles.header_center]}>
            <Text style={[styles.header_text]}>식재료 등록</Text>
          </View>
          <View style={[styles.header_right]}>
            <TouchableOpacity style={[styles.right_view]}>
              <ImageBackground
                source={require('../../assets/images/confirm.png')}
                resizeMode="contain"
                style={[styles.right_image]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* // ---------- 2. middle -------- */}
        <View style={[styles.view_middle]}>
          <View style={[styles.middle_left]}>
            <TouchableOpacity style={[styles.icon_view]}>
              <Icon name="chevron-left" size={60} />
            </TouchableOpacity>
          </View>
          <View style={[styles.middle_center]}>
            <View style={[styles.center_image]}>
              <ImageBackground
                source={require('../../assets/images/banana.png')}
                resizeMode="contain"
                style={[styles.center_image1]}
              />
            </View>
            <View style={[styles.center_info]}>
              <View style={[styles.info_name]}>
                <View style={[styles.info_name_text]}>
                  <TextInput
                    style={[styles.info_name_input]}
                    // placeholder={''}
                    // placeholderTextColor={'grey'}
                    onChangeText={(infoName) => {
                      setInfoName(infoName)
                      // console.log(infoName)
                      if(infoName !== '') {

                      }
                    }}
                  />
                </View>
                <TouchableOpacity style={[styles.info_name_icon]}>
                  <Icon name="pencil-box-outline" size={28} />
                </TouchableOpacity>
              </View>
              <View style={[styles.info_expiration]}>
                <Text style={{fontSize: 19, fontWeight: '500'}}>
                  유통기한 :
                </Text>
                {/* <Text style={{fontSize: 19, fontWeight: '300', left: 5, backgroundColor: 'red'}}> */}
                  {/* ㅇㅇ */}
                <TextInput placeholder={'2022.09.09'} placeholderTextColor={'black'} style={{fontSize: 19,fontWeight: '300',left: 5, paddingBottom: 0}}></TextInput>
                {/* </Text> */}
              </View>
              <View style={[styles.info_expiration, styles.info_purchase]}>
                <Text style={{fontSize: 19, fontWeight: '500'}}>
                  구매일자 :
                </Text>
                <TextInput placeholder={'2022.09.01'} placeholderTextColor={'black'} style={{fontSize: 19,fontWeight: '300',left: 5, paddingBottom: 0}}></TextInput>
              </View>
              <View style={[styles.info_stock]}>
                <View style={[styles.stock_text]}>
                  <Text style={{fontSize: 19}}>남은 수량</Text>
                  <TouchableOpacity
                    style={[styles.stock_view]}>
                      <Text style={{fontSize: 16}}>{stockVal === false ? infoStockNum : infoStockNum2 }</Text>
                    </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 19,
                      left: '50%',
                      top: stockVal === false ? '1%' : '0%',
                    }}>
                    {stockVal === false ? '개' : '%'}
                  </Text>
                  <TouchableOpacity
                    style={[styles.stock_view, styles.stock_view2]}
                    onPress={() => {
                      setStockVal(!stockVal)
                      if (stockVal === true) {
                        setInfoStock('갯수')
                      } else {
                        setInfoStock('%')
                      }
                    }}>
                    <Text style={{alignSelf: 'center', top: '10%'}}>
                      {stockVal === false ? '%' : '갯수'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.middle_right]}>
            <TouchableOpacity style={[styles.icon_view]}>
              <Icon name="chevron-right" size={60} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.view_footer]}>
          <View style={[styles.footer_text]}>
            <Text style={{fontSize: 15, fontWeight: '200'}}>
              즐겨찾기한 레시피
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
  // MainNavigator.call('Recipe')
}

// const styles = StyleSheet.create({
//   view: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'white',
//   },
//   // ---------- 1. header --------
//   view_header: {
//     backgroundColor: 'white',
//     width: '100%',
//     height: '9%',
//     flexDirection: 'row',
//   },
//   // 1.1 header_left
//   header_left: {
//     // borderWidth: 1,
//     backgroundColor: 'white',
//     width: '25%',
//     height: '100%',
//   },
//   // 삭제 아이콘
//   left_icon: {
//     backgroundColor: 'white',
//     width: '45%',
//     height: '100%',
//     justifyContent: 'center',
//     left: '35%',
//   },
//   // 1.2 header_center
//   header_center: {
//     // borderWidth: 1,
//     backgroundColor: 'white',
//     width: '50%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // 상세페이지 text
//   header_text: {
//     fontSize: 23,
//     color: 'grey',
//     fontWeight: '600',
//   },
//   // 1.3 header_right
//   header_right: {
//     // borderWidth: 1,
//     backgroundColor: 'white',
//     width: '25%',
//     height: '100%',
//   },
//   right_view: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'flex-end',
//     // backgroundColor: 'black',
//   },
//   // 적용 아이콘
//   right_image: {
//     width: '100%',
//     height: '77%',
//     // backgroundColor: 'orange',
//   },

//   // ---------- 2. middle --------
//   view_middle: {
//     backgroundColor: 'white',
//     width: '100%',
//     height: '56%',
//     flexDirection: 'row',
//   },
//   // 2.1 이전 아이콘
//   middle_left: {
//     width: '13%',
//     height: '100%',
//     // borderWidth: 1,
//     // alignItems: 'center',
//     // alignContent: 'center',
//   },
//   icon_view: {
//     top: '25%',
//     // left: '-3%',
//     backgroundColor: 'white',
//     height: '20%',
//   },

//   // 2.2 식재료 정보
//   middle_center: {
//     width: '74%',
//     height: '100%',
//     // borderWidth: 1,
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   // 2.2.1 식재료 사진
//   center_image: {
//     width: '75%',
//     height: '50%',
//     // backgroundColor: 'black',
//     borderRadius: 15,
//     top: 10,
//   },
//   center_image1: {
//     width: '100%',
//     height: '100%',
//   },

//   // 2.2.2 식재료 정보
//   center_info: {
//     backgroundColor: 'white',
//     width: '67%',
//     height: '43%',
//     top: '4%',
//   },

//   // 정보 - 이름
//   info_name: {
//     backgroundColor: 'white',
//     width: '100%',
//     height: '27%',
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'black',
//     flexDirection: 'row',
//   },
//   info_name_text: {
//     backgroundColor: 'white',
//     width: '80%',
//     height: '88%',
//     left: '3%',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-end',
//   },
//   info_name_icon: {
//     // backgroundColor: 'orange',
//     width: '20%',
//     height: '75%',
//     alignSelf: 'flex-end',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   info_name_input: {
//     fontSize: Platform.OS === 'ios' ? 23 : 20,
//     fontWeight: '500',
//     // alignSelf: '',
//     paddingBottom: 0,
//     // backgroundColor: 'black',
//     width: '100%',
//   },
//   // 정보 - 유통기한
//   info_expiration: {
//     // backgroundColor: 'red',
//     width: '100%',
//     height: '22%',
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'black',
//     flexDirection: 'row',
//     alignItems: 'flex-end',
//     paddingLeft: 5,
//     paddingBottom: 2,
//   },

//   // 정보 - 구매일자
//   info_purchase: {
//     backgroundColor: 'white',
//     width: '100%',
//     height: '20%',
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'black',
//   },

//   // 정보 - 재고
//   info_stock: {
//     // backgroundColor: 'coral',
//     width: '100%',
//     height: '26%',
//     justifyContent: 'center',
//   },
//   stock_text: {
//     flexDirection: 'row',
//     paddingLeft: 5,
//   },
//   stock_view: {
//     borderWidth: 1,
//     width: '20%',
//     height: '100%',
//     left: '30%',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   stock_view2: {
//     width: '22%',
//     // height: '110%',
//     left: '100%',
//     borderRadius: 10,
//     borderColor: 'darkgrey',
//   },
//   // 2.3 다음 아이콘
//   middle_right: {
//     width: '13%',
//     height: '100%',
//     // borderWidth: 1,
//   },

//   // ---------- 3. footer --------
//   view_footer: {
//     // backgroundColor: 'red',
//     width: '100%',
//     height: '35%',
//   },
//   footer_text: {
//     // backgroundColor: 'orange',
//     width: '90%',
//     height: '10%',
//     left: '5%',
//     justifyContent: 'center',
//   },
// })
