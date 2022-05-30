import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Likes, Profile } from '../Routes'
import React from 'react'
import { TabBar } from './TabBar'

const Tab = createBottomTabNavigator<RootStackRoutes>()

export const RootStack = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name='Likes' component={Likes} />
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}
