import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { useFetchDogs } from '../../Hooks/useFetchDogs'
import { LoadingAnimation } from '../../Navigation/Components/LoadingAnimation'
import { BreedViewer } from './Components/BreedViewer'

export const Home = () => {
  const { loading } = useFetchDogs()

  return (
    <View style={styles.container}>
      {loading ? <LoadingAnimation /> : <BreedViewer />}
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
