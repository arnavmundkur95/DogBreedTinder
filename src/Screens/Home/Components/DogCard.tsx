import React from 'react'
import { Animated, PanResponder, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getDogBreeds } from '../../../Store/Selectors/UtilitySelector'
import { setLikedBreeds } from '../../../Store/Slices/UtilitySlice'

export const DogCard = ({
  dog,
  index,
  activePile,
  addToShownPictures,
  removeDogFromPile,
}: DogCardProps) => {
  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
  const decisionBoundary = 135
  const dispatch = useDispatch()
  const breeds: Partial<DogBreed>[] = useSelector(getDogBreeds)

  function getBreedTemperament(dog: Partial<DogBreed>): string {
    return breeds.find((i) => i.breed === dog.breed)?.temperament || 'Unknown'
  }

  function getBreedLifeSpan(dog: Partial<DogBreed>): string {
    return breeds.find((i) => i.breed === dog.breed)?.lifeSpan || 'Unknown'
  }

  function getBreedWeight(dog: Partial<DogBreed>): string {
    return breeds.find((i) => i.breed === dog.breed)?.weight || 'Unknown'
  }

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (event, gestureEvent) => {
        if (Math.abs(gestureEvent.dx) > decisionBoundary) {
          if (gestureEvent.dx > 0) {
            dispatch(setLikedBreeds(dog))
          }

          addToShownPictures(dog.imageID!)
          removeDogFromPile(dog)
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
        top: '15%',
        left: '10%',
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: '#FFFEF2',
        transform: [
          { translateX: pan.x },
          { translateY: pan.y },
          { rotate: `${rotation}deg` },
        ],
      }}
      {...panResponder.panHandlers}
    >
      <Animated.Image
        source={{ uri: dog.imageURL }}
        style={{
          width: '100%',
          height: '50%',
          borderRadius: 10,
          marginBottom: 20,
        }}
        resizeMode={'cover'}
      />
      <Animated.Text style={{ fontSize: 20, marginBottom: 15 }}>
        {dog.breed}
      </Animated.Text>
      <Animated.View
        style={{
          ...styles.characteristicRow,
          alignItems: 'center',
        }}
      >
        <Animated.Text style={styles.characteristicTitle}>
          {'Temperament: '}
        </Animated.Text>
        <Animated.Text style={{ width: '50%' }} numberOfLines={5}>
          {getBreedTemperament(dog)}
        </Animated.Text>
      </Animated.View>
      <Animated.View style={styles.characteristicRow}>
        <Animated.Text style={styles.characteristicTitle}>
          {'Lifespan: '}
        </Animated.Text>
        <Animated.Text>{getBreedLifeSpan(dog)}</Animated.Text>
      </Animated.View>
      <Animated.View style={{ flexDirection: 'row' }}>
        <Animated.Text style={styles.characteristicTitle}>
          {'Weight: '}
        </Animated.Text>
        <Animated.Text>{getBreedWeight(dog)}</Animated.Text>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  slideContainer: {
    width: '80%',
    height: '70%',
    position: 'absolute',
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 1 },
    elevation: 5,
    borderRadius: 10,
  },
  characteristicTitle: {
    fontSize: 15,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold',
  },
  characteristicRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
})
