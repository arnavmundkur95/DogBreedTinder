import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { RootNavigation } from './src/Navigation/RootNavigation'
import { store } from './src/Store'

export default function App() {
    return (
        <Provider store={store}>
            <RootNavigation />
        </Provider>
    )
}
