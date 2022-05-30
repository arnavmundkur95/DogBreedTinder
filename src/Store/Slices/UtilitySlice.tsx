import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '..'

export interface UtilityReducerState {
  dogBreeds: Partial<DogBreed>[]
  alreadyShown: Partial<DogBreed['imageID']>[]
  toShow: Partial<DogBreed>[]
  likedBreeds: Partial<DogBreed>[]
  showLikedBreeds: boolean
  temperaments: string[]
  userTemperaments: string[]
}

export const INITIAL_STATE: UtilityReducerState = {
  dogBreeds: [],
  alreadyShown: [],
  toShow: [],
  likedBreeds: [],
  showLikedBreeds: false,
  temperaments: [],
  userTemperaments: [],
}

export const UtilitySlice = createSlice({
  name: 'Utility',
  initialState: INITIAL_STATE,
  reducers: {
    setDogBreeds(state, action: PayloadAction<Partial<DogBreed>[]>) {
      state.dogBreeds = action.payload
    },
    setAlreadyShown(
      state,
      action: PayloadAction<Partial<DogBreed['imageID']>>
    ) {
      const newState = state.alreadyShown.length
        ? new Set(state.alreadyShown)
        : new Set([])
      newState.add(action.payload)
      state.alreadyShown = Array.from(newState)
    },
    setToShow(state, action: PayloadAction<Partial<DogBreed>[]>) {
      state.toShow = action.payload
    },
    setLikedBreeds(state, action: PayloadAction<Partial<DogBreed>>) {
      const temp = state.likedBreeds || []
      temp.push(action.payload)
      state.likedBreeds = temp
    },
    clearLikedBreeds(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.likedBreeds = []
      }
    },
    setShowLikedBreeds(state, action: PayloadAction<boolean>) {
      state.showLikedBreeds = action.payload
    },
    setTemperaments(state, action: PayloadAction<string[]>) {
      state.temperaments = action.payload
    },
    setUserTemperaments(state, action: PayloadAction<string[]>) {
      state.userTemperaments = action.payload
    },
  },
})

export const {
  setDogBreeds,
  setAlreadyShown,
  setToShow,
  setLikedBreeds,
  clearLikedBreeds,
  setShowLikedBreeds,
  setTemperaments,
  setUserTemperaments,
} = UtilitySlice.actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
