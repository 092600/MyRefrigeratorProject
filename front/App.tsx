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
// import MainNavigator from './src/screens/MainNavigator'
import LoginNavigator from './src/screens/LoginNavigator'

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
          <LoginNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ToggleThemeProvider>
  )
}
