import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Header } from '../../Components/Header'
import { getLikedBreeds } from '../../Store/Selectors/UtilitySelector'

export const Likes = () => {
  const likedBreeds = useSelector(getLikedBreeds) || []

  const RenderItem = ({ item }: { item: Partial<DogBreed> }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          backgroundColor: '#dbd7c9',
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri: item.imageURL }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
          resizeMode={'cover'}
        />
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <Text
            style={{ width: 150, fontSize: 17, fontWeight: 'bold' }}
            numberOfLines={2}
          >
            {item.breed}
          </Text>
        </View>
      </View>
    )
  }

  const ShowLikedBreeds = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <FlatList
          data={likedBreeds}
          renderItem={RenderItem}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={<View style={{ height: 200 }} />}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={'Liked Breeds'} />
      {likedBreeds.length ? <ShowLikedBreeds /> : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
})
