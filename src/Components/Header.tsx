import React from 'react'
import { View, Text } from 'react-native'

export const Header = ({ title }: HeaderProps) => {
  return (
    <View style={{ marginTop: 40 }}>
      <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>
        {title}
      </Text>
    </View>
  )
}
