import { AppStateType } from '../Reducer'

export const getDogBreeds = (state: AppStateType): Partial<DogBreed>[] =>
  state.utility.dogBreeds

export const getAlreadyShown = (
  state: AppStateType
): Partial<DogBreed['imageID']>[] => state.utility.alreadyShown

export const getToShow = (state: AppStateType): Partial<DogBreed>[] =>
  state.utility.toShow

export const getLikedBreeds = (state: AppStateType): Partial<DogBreed>[] =>
  state.utility.likedBreeds

export const getShowLikedBreeds = (state: AppStateType): boolean =>
  state.utility.showLikedBreeds

export const getTemperaments = (state: AppStateType): string[] =>
  state.utility.temperaments
export const getUserTemperaments = (state: AppStateType): string[] =>
  state.utility.userTemperaments
