import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '..'

export interface UtilityReducerState {
  dogBreeds: Partial<DogBreed>[]
  alreadyShown: Partial<DogBreed>[]
  toShow: Partial<DogBreed>[]
}

export const INITIAL_STATE: UtilityReducerState = {
  dogBreeds: [],
  alreadyShown: [],
  toShow: [],
}

export const UtilitySlice = createSlice({
  name: 'Utility',
  initialState: INITIAL_STATE,
  reducers: {
    setDogBreeds(state, action: PayloadAction<Partial<DogBreed>[]>) {
      state.dogBreeds = action.payload
    },
    setAlreadyShown(state, action: PayloadAction<Partial<DogBreed>[]>) {
      state.alreadyShown = state.alreadyShown.concat(action.payload)
    },
    setToShow(state, action: PayloadAction<Partial<DogBreed>[]>) {
      state.toShow = action.payload
    },
  },
})

export const { setDogBreeds, setAlreadyShown, setToShow } = UtilitySlice.actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
