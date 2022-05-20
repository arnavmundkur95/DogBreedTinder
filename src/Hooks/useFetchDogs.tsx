import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogBreeds, getToShow } from '../Store/Selectors/UtilitySelector'
import { setDogBreeds, setToShow } from '../Store/Slices/UtilitySlice'
import { useFetch } from './useFetch'
import _ from 'lodash'

export const useFetchDogs = () => {
  const { execute } = useFetch()
  const dogBreedList: Partial<DogBreed>[] = useSelector(getDogBreeds) || []
  const toShow: Partial<DogBreed>[] = useSelector(getToShow) || []
  const dispatch = useDispatch()
  const NUM_DOG_PICS: number = 5
  const [loading, setLoading] = React.useState<boolean>(false)

  const fetchDogBreedList = async () => {
    try {
      setLoading(true)
      const breedsResponse = await execute('/breeds')
      const breeds: Partial<DogBreed>[] = []
      breedsResponse.forEach((data: any) => {
        breeds.push({
          breed: data.name,
          breedID: data.id,
          lifeSpan: data.life_span,
          temperament: data.temperament,
          weight: data.weight.metric + ' kilograms',
        })
      })
      setLoading(false)

      dispatch(setDogBreeds(breeds))
    } catch (e) {
      console.error(e)
    }
  }

  const fetchDogPictures = async () => {
    try {
      const fetchedToShow: Partial<DogBreed>[] = []
      const breedSample: Partial<DogBreed>[] = _.sampleSize(dogBreedList, 20)

      setLoading(true)

      for (const dogBreed of breedSample) {
        console.log('Searching for', dogBreed.breed)

        const pictureResponse = await execute(
          `/images/search?limit=${NUM_DOG_PICS}&breed_id=${dogBreed.breedID}`
        )
        pictureResponse.forEach((pictureObject: any) => {
          fetchedToShow.push({
            breed: dogBreed.breed,
            imageURL: pictureObject.url,
            temperament: dogBreed.temperament,
            imageID: pictureObject.id,
          })
        })
      }

      setLoading(false)
      //   if (fetchedToShow.length) {
      dispatch(setToShow(fetchedToShow))
      //   }
    } catch (e) {
      console.error(e)
    }
  }

  // Fetch list of breeds if the stored list is empty
  React.useEffect(() => {
    if (dogBreedList.length < 1) {
      fetchDogBreedList()
    }

    if (toShow.length < 25) {
      fetchDogPictures()
    }
  }, [])

  return {
    dogBreedList,
    loading,
    fetchDogBreedList,
    fetchDogPictures,
  }
}
