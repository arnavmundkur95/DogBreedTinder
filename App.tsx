import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { RootNavigation } from './src/Navigation/RootNavigation'
import { store } from './src/Store'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </NavigationContainer>
  )
}
