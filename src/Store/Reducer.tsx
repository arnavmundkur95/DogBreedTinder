import { AnyAction, CombinedState, combineReducers } from '@reduxjs/toolkit'
import { UtilityReducerState, UtilitySlice } from './Slices/UtilitySlice'

export const INITIAL_STATE = {}

const appReducer = combineReducers({
    utility: UtilitySlice.reducer,
})

export const rootReducer = (
    state: CombinedState<{ utility: UtilityReducerState }> | undefined,
    action: AnyAction
) => appReducer(state, action)

export type AppStateType = ReturnType<typeof appReducer>
