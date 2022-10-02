import {Platform} from 'react-native'

const _ANDROID_AVD_API_HOST = 'http://10.0.2.2:8080'
const _IOS_API_HOST = 'http://localhost:8080'

export default function getAPI() {
  if (Platform.OS === 'ios') {
    return _IOS_API_HOST
  } else if (Platform.OS === 'android') {
    return _ANDROID_AVD_API_HOST
  } else {
    throw 'Platform not supported'
  }
}
