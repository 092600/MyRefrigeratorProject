/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
import 'react-native-gesture-handler'
import React, {useState, useCallback} from 'react'
import {enableScreens} from 'react-native-screens'
import {SafeAreaProvider} from 'react-native-safe-area-context'
// prettier-ignore
import {NavigationContainer, DefaultTheme, DarkTheme}
from '@react-navigation/native';
import {useColorScheme} from 'react-native'
// import {AppearanceProvider, useColorScheme} from 'react-native-appearance'
import {ToggleThemeProvider} from './src/contexts'
import LoginNavigation from './src/screens/LoginNavigator'
import HomeNavigator from './src/screens/HomeNavigator'
import MyNavigation from './src/screens/Home/MyNavigation'
import TabNavigator from './src/screens/TabNavigator'

// openjdk 11.0.15 2022-04-19 LTS
// OpenJDK Runtime Environment Zulu11.56+19-CA (build 11.0.15+10-LTS)
// OpenJDK 64-Bit Server VM Zulu11.56+19-CA (build 11.0.15+10-LTS, mixed mode)

enableScreens()

export default function App() {
  const scheme = useColorScheme() // 'dark' 혹은 'light'
  const [theme, setTheme] = useState(
    scheme === 'dark' ? DarkTheme : DefaultTheme,
  )

  const toggleTheme = useCallback(
    () => setTheme(({dark}) => (dark ? DefaultTheme : DarkTheme)),
    [],
  )

  return (
    <ToggleThemeProvider toggleTheme={toggleTheme}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <LoginNavigation />
          {/* <HomeNavigator /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </ToggleThemeProvider>
  )
}
