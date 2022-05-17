import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useFetchDogs } from '../../Hooks/useFetchDogs'

export const Home = () => {
    const { fetchDogList, dogList, loading } = useFetchDogs()

    React.useEffect(() => {
        fetchDogList()
    }, [])

    return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF9F6' },
})
