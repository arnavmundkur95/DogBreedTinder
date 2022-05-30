import React from 'react'
import { View, StyleSheet, Animated, PanResponder } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDogBreeds,
  getToShow,
} from '../../../Store/Selectors/UtilitySelector'
import { useFetchDogs } from '../../../Hooks/useFetchDogs'
import _ from 'lodash'
import {
  setAlreadyShown,
  setLikedBreeds,
  setToShow,
} from '../../../Store/Slices/UtilitySlice'
import { LoadingAnimation } from '../../../Navigation/Components/LoadingAnimation'
import { DogCard } from './DogCard'

export const BreedViewer = () => {
  const PILE_SIZE = 5
  const hash = require('object-hash')
  const { loading, fetchDogPictures } = useFetchDogs()
  const toShow: Partial<DogBreed>[] = useSelector(getToShow)
  const breeds: Partial<DogBreed>[] = useSelector(getDogBreeds)
  const [activePile, setActivePile] = React.useState<Partial<DogBreed>[]>(
    _.sampleSize(toShow, PILE_SIZE)
  )
  const dispatch = useDispatch()

  const [shown, setShown] = React.useState<Set<Partial<DogBreed['imageID']>>>(
    new Set<Partial<DogBreed['imageID']>>([])
  )

  const refreshPile = async () => {
    if (toShow.length < PILE_SIZE) {
      await fetchDogPictures()
    } else {
      setActivePile(_.sampleSize(toShow, PILE_SIZE))
    }
  }

  function removeDogFromPile(dog: Partial<DogBreed>) {
    const filteredActivePile = activePile.filter((i) => hash(i) !== hash(dog))
    setActivePile(filteredActivePile)

    const updatedToShow = toShow.filter(
      (i: Partial<DogBreed>) => !shown.has(i.imageID!)
    )
    dispatch(setToShow(updatedToShow))
  }

  function addToShownPictures(imageID: string) {
    dispatch(setAlreadyShown(imageID))
    const newShown = new Set(shown)
    newShown.add(imageID)
    setShown(newShown)
  }

  React.useEffect(() => {
    if (activePile.length < 1) {
      refreshPile()
    }
  }, [activePile, toShow])

  return (
    <View
      key={activePile.toString()}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {activePile.length ? (
        activePile.map((dog, index) => (
          <DogCard
            key={index}
            dog={dog}
            index={index}
            activePile={activePile}
            addToShownPictures={addToShownPictures}
            removeDogFromPile={removeDogFromPile}
          />
        ))
      ) : (
        <LoadingAnimation />
      )}
    </View>
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
