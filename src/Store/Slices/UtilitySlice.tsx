import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '..'

export interface UtilityReducerState {
    dogBreeds: string[]
}

export const INITIAL_STATE: UtilityReducerState = {
    dogBreeds: [],
}

export const UtilitySlice = createSlice({
    name: 'Utility',
    initialState: INITIAL_STATE,
    reducers: {
        setDogBreeds(state, action: PayloadAction<string[]>) {
            state.dogBreeds = action.payload
        },
    },
})

export const { setDogBreeds } = UtilitySlice.actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
