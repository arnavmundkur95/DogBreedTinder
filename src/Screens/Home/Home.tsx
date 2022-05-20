import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { useFetchDogs } from '../../Hooks/useFetchDogs'
import { BreedViewer } from './Components/BreedViewer'

export const Home = () => {
  const { loading } = useFetchDogs()
  const loadingAnimation = require('../../../assets/images/loading.gif')

  const DogLoadingGif = () => {
    return (
      <View>
        <Image style={{ width: 400, height: 400 }} source={loadingAnimation} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {loading ? <DogLoadingGif /> : <BreedViewer />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
