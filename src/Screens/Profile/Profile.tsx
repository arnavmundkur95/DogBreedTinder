import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { clearLikedBreeds } from '../../Store/Slices/UtilitySlice'

export const Profile = () => {
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          dispatch(clearLikedBreeds(true))
        }}
        style={{
          borderWidth: 1,
          borderColor: 'black',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text>Clear liked breeds</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
