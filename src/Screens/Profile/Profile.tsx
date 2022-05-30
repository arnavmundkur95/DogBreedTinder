import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Switch,
  TextInput,
  Alert,
  FlatList,
  Keyboard,
} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearLikedBreeds,
  setShowLikedBreeds,
  setUserTemperaments,
} from '../../Store/Slices/UtilitySlice'
import {
  getDogBreeds,
  getShowLikedBreeds,
  getTemperaments,
  getUserTemperaments,
} from '../../Store/Selectors/UtilitySelector'
import { Header } from '../../Components/Header'
import { TouchableOpacity } from 'react-native'
import { default as AntIcon } from 'react-native-vector-icons/AntDesign'

export const Profile = () => {
  const dispatch = useDispatch()
  const showLikedBreeds: boolean = useSelector(getShowLikedBreeds) || false
  const breeds: Partial<DogBreed>[] = useSelector(getDogBreeds)
  const temperaments: string[] = useSelector(getTemperaments)
  const selectedTemperaments: string[] = useSelector(getUserTemperaments) || []
  const [searchInput, setSearchInput] = React.useState<string>('')
  const [filteredTemperaments, setFilteredTemperaments] = React.useState<
    string[]
  >([])
  const [usingKeyboard, setUsingKeyboard] = React.useState<boolean>(false)

  function filterTemperaments(userInput: string) {
    let filteredList =
      userInput.length > 0
        ? temperaments.filter((temperament: string) =>
            temperament.includes(userInput.toLowerCase())
          ) || []
        : []
    filteredList = filteredList.filter(
      (temperament: string) => !selectedTemperaments.includes(temperament)
    )

    setFilteredTemperaments(filteredList)
    setSearchInput(userInput)
  }

  function removeSelectedTemperament(temperament: string) {
    let updatedTemperaments: string[] = selectedTemperaments
    updatedTemperaments = updatedTemperaments.filter((t) => t !== temperament)

    dispatch(setUserTemperaments(updatedTemperaments))
  }

  const updateChosenTemperaments = (chosenTemperament: string) => {
    if (chosenTemperament.length) {
      if (selectedTemperaments.length < 3) {
        let newTemperaments: string[] = [...selectedTemperaments]

        if (!newTemperaments.includes(chosenTemperament)) {
          console.log('called this')
          newTemperaments.push(chosenTemperament)
          dispatch(setUserTemperaments(newTemperaments))
        }
      } else {
        Alert.alert(
          'Too many criteria',
          "If you add too many criteria, we won't be able to find you your dream breed!",
          [{ text: 'I understand' }]
        )
      }
    }
  }

  const Options = () => {
    return (
      <View
        style={{
          backgroundColor: '#e8d1ba',
          elevation: 10,
          borderRadius: 10,
          marginVertical: 30,
          padding: 20,
          shadowColor: 'black',
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 1,
          marginHorizontal: 20,
        }}
      >
        <RenderChosenTemperaments />
        <TemperamentSelector />
        <RenderTemperamentOptions />
        <ShowLikedBreedsToggle />
      </View>
    )
  }

  const ShowLikedBreedsToggle = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Text style={{ fontSize: 16, width: '75%' }}>
          Show me breeds I have already liked
        </Text>
        <Switch
          thumbColor={showLikedBreeds ? '#13C4A3' : 'grey'}
          value={showLikedBreeds}
          onValueChange={(value: boolean) => {
            dispatch(setShowLikedBreeds(value))
          }}
        />
      </View>
    )
  }

  const TemperamentOption = ({ temperament }: TemperamentProps) => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: 5,
          borderBottomColor: 'black',
          borderBottomWidth: 0.2,
          paddingBottom: 5,
          justifyContent: 'center',
        }}
        onPress={() => {
          console.log('pressed', temperament)
          updateChosenTemperaments(temperament.item)
        }}
      >
        <Text style={{ textTransform: 'capitalize' }}>{temperament.item}</Text>
      </TouchableOpacity>
    )
  }

  const TemperamentPill = ({ temperament }: TemperamentProps) => {
    return (
      <View
        style={{
          backgroundColor: '#0A2472',
          borderRadius: 50,
          padding: 10,
          marginRight: 10,
          marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            textTransform: 'capitalize',
            borderRightWidth: 1,
            borderRightColor: 'white',
            paddingRight: 10,
          }}
        >
          {temperament}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            marginLeft: 10,
          }}
          onPress={() => {
            removeSelectedTemperament(temperament)
          }}
        >
          <AntIcon name='close' color={'red'} size={15} />
        </TouchableOpacity>
      </View>
    )
  }

  const RenderChosenTemperaments = () => {
    return (
      <View>
        <Text style={{ fontSize: 17, marginBottom: 5 }}>
          Desired temperaments (max 3)
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
            marginBottom: 10,
          }}
        >
          {selectedTemperaments.map((t) => {
            return <TemperamentPill temperament={t} key={t} />
          })}
        </View>
      </View>
    )
  }

  const RenderTemperamentOptions = () => {
    if (searchInput.length) {
      return (
        <FlatList
          data={filteredTemperaments}
          renderItem={(item) => <TemperamentOption temperament={item} />}
        />
      )
    }
    return null
  }

  const TemperamentSelector = () => {
    return (
      <View style={{ marginBottom: 20 }}>
        <View key={Math.random().toString()}>
          <TextInput
            autoFocus={usingKeyboard}
            value={searchInput}
            style={{
              borderWidth: 2,
              borderColor: '#EA8C55',
              borderRadius: 10,
              paddingLeft: 5,
              marginTop: 5,
            }}
            onChangeText={(value: string) => {
              filterTemperaments(value)
            }}
          />
        </View>
      </View>
    )
  }

  const ClearLikedBreeds = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Are you sure you want to clear your liked breeds?',
            'This cannot be undone!',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Accept',
                onPress: () => {
                  dispatch(clearLikedBreeds(true))
                },
                style: 'default',
              },
            ]
          )
        }}
        style={{
          borderWidth: 2,
          borderColor: 'red',
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: 'red',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          Clear liked breeds
        </Text>
      </TouchableOpacity>
    )
  }

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setUsingKeyboard(true)
    })
    Keyboard.addListener('keyboardDidHide', () => {
      setUsingKeyboard(false)
    })
  }, [])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <Header title='Settings' />
        <FlatList
          data={null}
          renderItem={null}
          ListFooterComponent={
            <>
              <Options />
              <ClearLikedBreeds />
            </>
          }
        />
      </View>
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
  contentContainer: {
    width: '90%',
    flex: 1,
  },
})
