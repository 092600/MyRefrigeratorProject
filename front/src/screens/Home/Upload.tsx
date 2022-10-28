/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import {MaterialCommunityIcon as Icon} from '../../theme';
import DatePicker from 'react-native-date-picker';
import { RotateInUpLeft } from 'react-native-reanimated';
import { ConfirmButton } from 'react-native-modal-datetime-picker';
import { ScrollEnabledProvider } from '../../contexts';
import { useNavigation } from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native'
// import MainNavigator from '../HomeNavigator'

export default function MyDetail() {
  const ScreenHeight = Dimensions.get('window').height 
  const [isList,setIsList] = useState<boolean>(false);

  const [info_fridge, setInfoFridge] = useState<string>('냉장');

  const [info_name, setInfoName] =useState<string>('');
  const [isnameBlank, setIsNameBlank] = useState<boolean>(true);

  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const DateVal = new Date();
  const TodayYear = DateVal.getFullYear();
  const TodayMonth = DateVal.getMonth() + 1;
  const TodayDay = DateVal.getDate();
  const Today = TodayYear.toString() + '.' + TodayMonth.toString() + '.' + TodayDay.toString();
  const [expiration, setExpiration] = useState<string>(Today);
  const [purchase, setPurchase] = useState<string>(Today);
  const [stockVal, setStockVal] = useState<boolean>(false);
  const [info_stock, setInfoStock] = useState<string>('');
  const [info_stock_val, setInfoStockVal] = useState<string>('개');
  const [isStockBlank, setIsStockBlank] = useState<boolean>(true);
  const InitObj = {
    'info_name': '',
    'expiration': Today, 'purchase': Today,
    'info_stock': 0, 'info_stock_val': '개', 'info_fridge' : '냉장' }

  let [listNum, setListNum] = useState<number>(1)
  let [listTotalNum, setListTotalNum]  = useState<number>(1)
  let [UploadTotalList, setUploadList] = useState([InitObj])

  // 식재료 리스트 map 함수
  let InfoList = UploadTotalList.map((Info,index) => {
    return (
        <TouchableOpacity 
          style={[styles2.center_list]} 
          onPress={() => {
            // console.log(index, Info.info_name)
            setListNum(index+1)
            setIsList(!isList)
          }}
          >
          <View style={[styles2.list_image]}></View>
          <View style={[styles2.list_name]}>
            <Text style={{fontSize: 18, fontWeight: '500'}}>{Info.info_name}</Text>
          </View>
          <View style={[styles2.list_expiration]}>
            <Text style={{fontSize: 13,}}>유통기한 {Info.expiration}</Text>
          </View>
        </TouchableOpacity>
    )
  })

  const navigation = useNavigation()

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* 하나씩 보기 View */}
      <View style={[styles_confirm(isList).view_confirm]}>
        <View style={[styles.view_header]}>
          <View style={[styles.header_left]}>
            <TouchableOpacity 
              style={[styles.left_icon]} 
              onPress={() => {
                navigation.navigate('MyRefri')
                // console.log('===============')
                // console.log(UploadTotalList)
                // console.log('===============')
                // console.log(listNum)
                // console.log(listTotalNum)
                // console.log('===============')
                // console.log(info_name, expiration, purchase, info_stock, info_stock_val, info_fridge)
            }}>
              <Icon name="plus" size={43} color={'grey'} style={{backgroundColor: 'white', transform: [{ rotate: '45deg'}]}} />
            </TouchableOpacity>
          </View>

          <View style={[styles.header_center]}>
            <Text style={[styles.header_text]}>식재료 등록</Text>
          </View>

          <View style={[styles.header_right]}>
            <TouchableOpacity 
              style={[styles.right_view]} 
              onPress={() => {
                setIsList(!isList);
              }}
            >
              <View style={[styles.right_view2]}>
                <Icon name="format-list-text" size={39} color={'grey'} style={[styles.right_image]} />
              </View>
              <Text style={[styles.right_text]}>전체 보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.view_middle]}>
          <View style={[styles.middle_left]}>
            <TouchableOpacity 
              style={[styles_confirm(listNum - 1 === 0).icon_view]}
              onPress={() => {
                if (listNum !== 1) {
                  setListNum(listNum - 1)
                }
              }}
            >
              <Icon name="chevron-left" size={60} />
            </TouchableOpacity>
          </View>

          <View style={[styles.middle_center]}>

            {/* 0. 냉장/냉동 보관 */}
            <TouchableOpacity
              style={[styles.center_fridge]}
              onPress={() => {
                if (info_fridge === '냉장') {setInfoFridge('냉동');}
                else {setInfoFridge('냉장');}
              }}
              >
              <Text style={{color:'#A2D9D6', fontSize: 21, fontWeight: '800', textAlign: 'center'}}>
                {listNum !== listTotalNum ? UploadTotalList[listNum-1].info_fridge : info_fridge}
              </Text>
            </TouchableOpacity>

            {/* 0. 이미지 */}
            <View style={[styles.center_image]}>
              <ImageBackground
                source={require('../../assets/images/banana.png')}
                resizeMode="contain"
                style={[styles.center_image1]}
              />
            </View>

            {/* 그 외 정보들 */}
            <View style={[styles.center_info]}>
              {/* 1. 이름(infoName) */}
              <View style={[styles.info_name, styles_confirm(isnameBlank).info_name]}>
                <View style={[styles.info_name_text]}>
                <TextInput
                  style={[styles.info_name_input]}
                  placeholder={'이름'}
                  // placeholder={UploadTotalList[listNum-1].info_name}
                  // placeholder={listNum === listTotalNum ? '이름' : UploadTotalList[listNum-1].info_name}
                  placeholderTextColor={'grey'}
                  // listNum 이 1이면서 listTotalNum이랑 다름 -> 이미 적힘
                  // listNum 이 1이면서 listTotalNum이랑 같음 -> 변수 1개
                  value={
                    listNum === 1 ?
                      listTotalNum === 1 ? info_name : UploadTotalList[listNum-1].info_name
                      : listNum === listTotalNum ? info_name : UploadTotalList[listNum-1].info_name }
                  onEndEditing = {() => {setIsNameBlank(true);}}
                  onChangeText={(info_name) => {
                    setInfoName(info_name);
                    if (info_name === '') {
                      setIsNameBlank(true);
                    } else {
                      setIsNameBlank(false);
                    }
                  }}
                />
                </View>
                <TouchableOpacity style={[styles.info_name_icon]}>
                  <Icon name="pencil-box-outline" size={28} />
                </TouchableOpacity>
              </View>

              {/* 2. 유통기한(expiration) */}
              <View style={[styles.info_expiration]}>
                <Text style={{fontSize: 19, fontWeight: '500'}}>
                  유통기한 :
                </Text>
                <TouchableOpacity
                  style={[{width: '65%', height: '100%', justifyContent: 'flex-end'}]}
                  onPress={() => {setOpen(true);}}
                >
                  <Text style={{fontSize: 19,fontWeight: Platform.OS === 'ios' ? '200' : '300',left: 5, paddingBottom: 0}}>
                    {/* {expiration} */}
                    {
                      listNum === 1 ? 
                        listTotalNum === 1 ? expiration : UploadTotalList[listNum-1].expiration
                        : listNum === listTotalNum ? expiration : UploadTotalList[listNum-1].expiration
                    }
                    </Text>
                  <DatePicker
                    modal
                    mode="date"
                    locale="ko"
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                      setOpen(false);
                      setDate(date);
                      const expirationArr = date.toLocaleDateString().split('/');
                      setExpiration(expirationArr[2] + '.' +expirationArr[0] + '.' + expirationArr[1]);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* 3. 구매일자(infoName) */}
              <View style={[styles.info_expiration, styles.info_purchase]}>
                <Text style={{fontSize: 19, fontWeight: '500'}}>
                  구매일자 :
                </Text>
                <TouchableOpacity
                  style={[{width: '65%', height: '100%', justifyContent: 'flex-end'}]}
                  onPress={() => {setOpen2(true);}}
                >
                  <Text style={{fontSize: 19,fontWeight: Platform.OS === 'ios' ? '200' : '300',left: 5, paddingBottom: 0}}>
                    {
                      listNum === 1 ?
                        listTotalNum === 1 ? purchase : UploadTotalList[listNum-1].purchase
                        : listNum === listTotalNum ? purchase : UploadTotalList[listNum-1].purchase
                    }
                    </Text>
                  <DatePicker
                    modal
                    mode="date"
                    locale="ko"
                    open={open2}
                    date={date2}
                    onConfirm={(date) => {
                      setOpen2(false);
                      setDate2(date);
                      const purchaseArr = date.toLocaleDateString().split('/');
                      setPurchase(purchaseArr[2] + '.' +purchaseArr[0] + '.' + purchaseArr[1]);
                    }}
                    onCancel={() => {
                      setOpen2(false);
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* 4. 재고(info_stock) */}
              <View style={[styles.info_stock]}>
                <View style={[styles.stock_text]}>
                  <Text style={{fontSize: 19}}>남은 수량</Text>
                  {/* 수량 입력 input */}
                  <TextInput
                    keyboardType= "number-pad"
                    value={
                      listNum === 1 ?
                        listTotalNum === 1 ? info_stock.toString() : UploadTotalList[listNum-1].info_stock.toString()
                        : listNum === listTotalNum ? info_stock.toString() : UploadTotalList[listNum-1].info_stock.toString()
                    }
                    style={[styles.stock_view, styles_confirm(isStockBlank).stock_view]}
                    onChangeText={(info_stock) => {
                    setInfoStock(info_stock);
                      // setInfoStock(info_stock)
                      if (info_stock === ''){
                        setIsStockBlank(true);
                      } else {
                        setIsStockBlank(false);
                      }
                    }}
                    onEndEditing={() => {setIsStockBlank(true);}}
                  />
                  {/* 수량 단위 표시 */}
                  <Text
                    style={{
                      fontSize: 19,
                      left: '50%',
                    }}>
                    {/* {stockVal === false ? '개' : '%'} */}
                    {
                      listNum === 1 ?
                        listTotalNum === 1 ? stockVal === false ? '개' : '%' : UploadTotalList[listNum-1].info_stock_val
                        : listNum === listTotalNum ? stockVal === false ? '개' : '%' : UploadTotalList[listNum-1].info_stock_val
                    }
                  </Text>
                  <TouchableOpacity
                    style={[styles.stock_view, styles.stock_view2]}
                    onPress={() => {
                      setStockVal(!stockVal);
                      if (stockVal === true) {
                        setInfoStockVal('갯수');
                      } else {
                        setInfoStockVal('%');
                      }
                    }}>
                    <Text
                      style={{
                        top: Platform.OS === 'ios' ? '10%' : '0%',
                      }}
                      >
                      {
                        listNum === 1 ?
                          listTotalNum === 1 ? stockVal === false ? '%' : '갯수' : UploadTotalList[listNum-1].info_stock_val === '개' ? '%' : '갯수'
                          : listNum === listTotalNum ? stockVal === false ? '%' : '갯수' : UploadTotalList[listNum-1].info_stock_val === '개' ? '%' : '갯수'
                      }
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.middle_right]}>
            <TouchableOpacity 
              style={[styles_confirm(listNum === listTotalNum).icon_view]}
              onPress={() => {
                if (listNum !== listTotalNum) {
                  setListNum(listNum + 1)
                }
              }}
            >
              <Icon name="chevron-right" size={60} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.view_footer]}>
          <View style={[styles.footer_view]}>
            {/* 내 냉장고에 저장하기 */}
            <TouchableOpacity 
              style={[styles.footer_btn, {backgroundColor: '#A2D9D6'}]}
              onPress={() => {
                if (info_name === '') {
                  Alert.alert('식재료 이름을 입력해주세요.');
                } else if (isNaN(parseInt(info_stock.toString(), 10))) {
                  Alert.alert('수량을 입력해주세요.');
                } else {
                  // UploadList.push({'info_name': info_name, 'expiration': expiration, 'purchase': purchase,
                  //                 'info_stock': info_stock, 'info_stock_val': info_stock_val, 'info_fridge' : info_fridge });
                  // console.log(UploadList);
                }
              }}
              >
              <Text style={[styles.btn_text, {color: 'white'}]}>내 냉장고에 저장하기</Text>
            </TouchableOpacity>

            {/* 식재료 더 추가하기 버튼 */}
            <TouchableOpacity 
              style={[styles.footer_btn, styles.footer_btn2]}
              onPress={() => {
                if (info_name === '') {
                  Alert.alert('식재료 이름을 입력해주세요.');
                } else if (isNaN(parseInt(info_stock.toString(), 10))) {
                  Alert.alert('수량을 입력해주세요.');
                } else {
                  const UploadObj = {'info_name': info_name, 'expiration': expiration, 'purchase': purchase, 
                    'info_stock': parseInt(info_stock,10), 'info_stock_val': info_stock_val, 'info_fridge' : info_fridge }
                  UploadTotalList[listNum-1] = UploadObj
                  UploadTotalList[listNum] = InitObj
                  setUploadList(UploadTotalList)
                  setInfoName('')
                  setExpiration(Today)
                  setPurchase(Today)
                  setInfoStock('')
                  setInfoStockVal('개')
                  setInfoFridge('냉장')
                  // SetInitInfo
                  // NameEffect
                  setListNum(listNum + 1)
                  setListTotalNum(listTotalNum + 1)
                  setStockVal(false);
                }
              }}
              >
              <Text style={[styles.btn_text, {color: '#A2D9D6'}]}>식재료 더 추가하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 전체보기 View */}
      <View style={[styles_confirm(!isList).view_confirm]}>
        <View style={[styles.view_header]}>
          <View style={[styles.header_left]}>
            {/* <TouchableOpacity style={[styles.left_icon]}>
            <Icon name="plus" size={43} color={'grey'} style={{backgroundColor: 'white', transform: [{ rotate: '45deg'}]}} />
            </TouchableOpacity> */}
          </View>

          <View style={[styles.header_center]}>
            <Text style={[styles.header_text]}>식재료 리스트</Text>
          </View>

          <View style={[styles.header_right]}>
            {/* <TouchableOpacity 
              style={[styles.right_view]} 
              onPress={() => {
                setIsList(!isList);
              }}
            /> */}
          </View>
        </View>

        <View style={[styles.view_middle, styles2.view_middle]}>
          <ScrollView>
            <View style={[styles2.middle_center]}>
              {InfoList}
            </View>
          </ScrollView>
        </View>

        <View style={[styles2.view_footer]}>
          <View style={[styles2.footer_btn]}>
            <TouchableOpacity 
              style={[styles2.footer_btn1, {backgroundColor: '#EF8B8B'}]}
              onPress={() => {
                navigation.navigate('MyRefri')
              }}
            >
              <Text style={[styles2.btn_text]}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles2.footer_btn1]}>
              <Text style={[styles2.btn_text]}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view_header: {
    backgroundColor: 'orange',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
  },

  // 1.1 header_left
  header_left: {
    // borderWidth: 1,
    backgroundColor: 'white',
    width: '25%',
    height: '100%',
  },

  // 삭제 아이콘
  left_icon: {
    backgroundColor: 'white',
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    left: '35%',
  },
  // 1.2 header_center
  header_center: {
    // borderWidth: 1,
    backgroundColor: 'white',
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 상세페이지 text
  header_text: {
    fontSize: 23,
    color: 'grey',
    fontWeight: '600',
  },

  // 1.3 header_right
  header_right: {
    // borderWidth: 1,
    backgroundColor: 'white',
    // backgroundColor: 'red',
    width: '25%',
    height: '100%',
  },
  right_view: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // justifyContent: 'flex=',
    // backgroundColor: 'orange',
  },
  right_view2: {
    width: '80%',
    height: '70%',
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    // alignItems: 'flex-end',
  },
  right_image: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  right_text: {
    width: '100%',
    height: '20%',
    textAlign: 'center',
    // backgroundColor: 'red',
    fontSize: Platform.OS === 'ios' ? 13 : 11,
    fontWeight: '400',
    color: '#707070',
  },

  // ---------- 2. middle --------
  view_middle: {
    backgroundColor: 'white',
    width: '100%',
    height: '56%',
    flexDirection: 'row',
  },
  middle_left: {
    backgroundColor: 'white',
    width: '13%',
    height: '100%',
  },

  // ==================================
  // 2.2 식재료 정보
  middle_center: {
    // backgroundColor: 'red',
    backgroundColor: 'white',
    width: '74%',
    height: '100%',
    alignItems: 'center',
  },
  center_fridge: {
    backgroundColor: 'white',
    width: '20%',
    height: '10%',
    left: '8%',
    position: 'absolute',
    zIndex: 10,
    borderRadius: 15,
    borderColor: 'grey',
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  // 2.2.1 식재료 사진
  center_image: {
  width: '75%',
  height: '50%',
  // backgroundColor: 'black',
  borderRadius: 15,
  top: 10,
  },
  center_image1: {
    width: '100%',
    height: '100%',
  },
  // 2.2.2 식재료 정보
  center_info: {
    backgroundColor: 'white',
    width: '67%',
    height: '43%',
    top: '4%',
  },

  // 정보 - 이름
  info_name: {
    backgroundColor: 'white',
    width: '100%',
    height: '27%',
    // borderBottomWidth: 0.5,
    flexDirection: 'row',
  },
  info_name_text: {
    backgroundColor: 'white',
    width: '80%',
    height: '88%',
    left: '3%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  info_name_icon: {
    width: '20%',
    height: '75%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info_name_input: {
    fontSize: Platform.OS === 'ios' ? 23 : 20,
    fontWeight: '500',
    // alignSelf: '',
    paddingBottom: 0,
  },
  // 정보 - 유통기한
  info_expiration: {
    // backgroundColor: 'red',
    width: '100%',
    height: '22%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 5,
    paddingBottom: 2,
  },

  // 정보 - 구매일자
  info_purchase: {
    backgroundColor: 'white',
    width: '100%',
    height: '20%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },

  // 정보 - 재고
  info_stock: {
    // backgroundColor: 'coral',
    width: '100%',
    height: '26%',
    justifyContent: 'center',
  },
  stock_text: {
    flexDirection: 'row',
    paddingLeft: 5,
    // backgroundColor: 'red',
    height: '60%',
    alignItems: 'center',
  },
  stock_view: {
    borderWidth: 1,
    width: '20%',
    // height: Platform.OS === 'ios' ? '100%' : '100%',
    height: '90%',
    left: '30%',
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'center',
    // backgroundColor: 'black',
    // paddingLeft: '5%',
  },
  stock_view2: {
    width: '20%',
    // height: '110%',
    left: '100%',
    borderRadius: 10,
    borderColor: 'darkgrey',
  },
  // ==================================

  middle_right: {
    backgroundColor: 'white',
    width: '13%',
    height: '100%',
  },

  // ---------- 3. footer --------
  view_footer: {
    backgroundColor: 'white',
    // backgroundColor: 'skyblue',
    width: '100%',
    height: '35%',
  },
  footer_view: {
    // backgroundColor: 'red',
    backgroundColor: 'white',
    width: '80%',
    height: '60%',
    top: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer_btn: {
    width: '90%',
    height: '45%',
    borderRadius: 33,
    justifyContent: 'center',
  },
  footer_btn2: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  btn_text: {
    fontSize: 23,
    textAlign: 'center',
    fontWeight: '800'
  },
  // btn_text: {
  //   fontSize: 20,
  //   textAlign: 'center'
  // },
});

const styles2 = StyleSheet.create({
  view_middle: {
    // backgroundColor: 'orange',
    // height: '77%',
    height: '75%',
    justifyContent: 'center',
  },
  middle_center: {
    // backgroundColor: 'skyblue',
    width: '80%',
    // height: 500,
    // height: ScreenHeight
    // height: '97%',
    // height: 1000,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'stretch',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  center_list:{
    // backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    width: '48%',
    height: 220,
    marginBottom: 10,
    overflow: 'hidden',
  },
  list_image: {
    backgroundColor: 'skyblue',
    width: '100%',
    height: '72%',
  },
  list_name: {
    // backgroundColor: 'green',
    width: '100%',
    height: '15%',
    paddingLeft: '7%',
    justifyContent: 'center',
  },
  list_expiration: {
    // backgroundColor: 'red',
    width: '100%',
    height: '15%',
    paddingLeft: '7%',
  },

  // -------- 2. footer ----------
  view_footer: {
    // paddingTop: '1%',
    backgroundColor: 'white',
    width: '100%',
    // height: '15%',
    height: '17%',
    alignItems: 'center',
    paddingTop: '1%',
  },
  footer_btn: {
    // backgroundColor: 'red',
    width: '65%',
    height: '60%',
    justifyContent: 'space-between',
    // alignItems: 'stretch',
    // alignContent: 'space-between',
    flexDirection: 'row',
  },
  footer_btn1: {
    backgroundColor: '#A2D9D6',
    width: '45%',
    height: '65%',
    borderRadius: 25,
    justifyContent: 'center',
    // textAlign: 'center',
  },
  btn_text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontWeight: '700',
    // backgroundColor: 'black',
  },
});

const styles_confirm = (booleanValue : boolean) => StyleSheet.create({
  view_confirm: {
    width: booleanValue === true ? '0%' : '100%',
    height: booleanValue === true ? '0%' : '100%',
    backgroundColor: booleanValue === true ? 'white' : 'red',
  },
  info_name: {
    borderColor: 'white',
    borderBottomColor: booleanValue === true ? 'black' : '#A2D9D6',
    borderWidth: booleanValue === true ? 0.5 : 1,
  },
  stock_view: {
    borderColor: booleanValue === true ? 'black' : '#A2D9D6',
  },
  icon_view: {
    opacity: booleanValue === true ? 0 : 1,
    top: '25%',
    // left: '-3%',
    backgroundColor: 'white',
    height: '20%',
  },
});

const styles_confirm2 = (booleanValue : boolean) => StyleSheet.create({

})