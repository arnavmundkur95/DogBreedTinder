import React from 'react'
import { View, Image } from 'react-native'

export const LoadingAnimation = () => {
  const loadingAnimation = require('../../../assets/images/loading.gif')

  return (
    <View>
      <Image style={{ width: 400, height: 400 }} source={loadingAnimation} />
    </View>
  )
}
