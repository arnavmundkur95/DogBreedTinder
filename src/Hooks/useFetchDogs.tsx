import React from 'react'
import { useSelector } from 'react-redux'
import { getDogBreeds } from '../Store/Selectors/UtilitySelector'
import { useFetch } from './useFetch'

export const useFetchDogs = () => {
    const { execute, data, loading } = useFetch()
    const dogList = useSelector(getDogBreeds)

    const fetchDogList = async () => {
        try {
            await execute('breeds')
            // console.log(dogList)
        } catch (e) {
            console.error(e)
        }
    }

    // Fetch the dog list if the stored list is empty
    React.useEffect(() => {
        if (dogList.length < 1) {
            fetchDogList()
        }
    }, [])

    return {
        dogList,
        loading,
        fetchDogList,
    }
}
