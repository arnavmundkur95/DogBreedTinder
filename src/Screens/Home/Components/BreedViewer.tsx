import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  PanResponder,
} from 'react-native'
import { useSelector } from 'react-redux'
import {
  getDogBreeds,
  getToShow,
} from '../../../Store/Selectors/UtilitySelector'
import { useFetchDogs } from '../../../Hooks/useFetchDogs'
import _ from 'lodash'

export const BreedViewer = () => {
  const PILE_SIZE = 5
  const { loading, fetchDogPictures } = useFetchDogs()
  const toShow: Partial<DogBreed>[] = useSelector(getToShow)
  const breeds: Partial<DogBreed>[] = useSelector(getDogBreeds)
  const activePile: Partial<DogBreed>[] = _.sampleSize(toShow, PILE_SIZE)
  //   console.log(breed.length, breed[0])
  //   const [stack, setStack] = React.useState<Partial<DogBreed>[]>(toShow)
  //   const [shown, setShown] = React.useState<Partial<DogBreed>[]>([])

  function getBreedTemperament(dog: Partial<DogBreed>): string[] {
    return (
      breeds
        .find((i) => i.breed === dog.breed)
        ?.temperament?.replace(/,/g, '')
        .split(' ') || ['Unknown']
    )
  }

  const DogCard = ({
    dog,
    index,
  }: {
    dog: Partial<DogBreed>
    index: number
  }) => {
    const pan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
    const [hide, setHide] = React.useState<boolean>(false)
    const decisionBoundary = 135

    const panResponder = React.useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
        onPanResponderRelease: (event, gestureEvent) => {
          if (Math.abs(gestureEvent.dx) > decisionBoundary) {
            setHide(true)
          } else {
            Animated.spring(pan, {
              toValue: {
                x: 0,
                y: 0,
              },
              useNativeDriver: false,
            }).start()
          }
        },
      })
    ).current

    const rotation =
      index === activePile.length - 1
        ? 0
        : Math.random() > 0.5
        ? Math.random() * 5
        : Math.random() * -5

    return (
      <Animated.View
        key={Math.random().toString()}
        style={{
          ...styles.slideContainer,
          top: '20%',
          left: '10%',
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: '#FFFEF2',
          opacity: hide ? 0 : 1,
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate: `${rotation}deg` },
          ],
        }}
        {...panResponder.panHandlers}
      >
        <Image
          source={{ uri: dog.imageURL }}
          style={{
            width: '100%',
            height: '50%',
            borderRadius: 10,
            marginBottom: 20,
          }}
          resizeMode={'cover'}
        />
        <Text style={{ fontSize: 20, marginBottom: 15 }}>{dog.breed}</Text>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: 15, color: 'black' }}>
            {'Temperament: '}
          </Text>
          <View>
            {getBreedTemperament(dog).map((temperament) => (
              <Text style={{ marginLeft: 10 }}>{'- ' + temperament}</Text>
            ))}
          </View>
          {/* <Text
            style={{ fontSize: 13, color: 'black', width: 200 }}
            numberOfLines={2}
          >
            {getBreedTemperament(dog)}
          </Text> */}
        </View>
      </Animated.View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {activePile.length
        ? activePile.map((dog, index) => <DogCard dog={dog} index={index} />)
        : null}
    </View>
  )
}

const styles = StyleSheet.create({
  slideContainer: {
    width: '80%',
    height: '60%',
    position: 'absolute',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 5,
    borderRadius: 10,
  },
})
