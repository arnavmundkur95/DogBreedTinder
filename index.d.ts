declare type RootStackRoutes = {
  Home: undefined
  Profile: undefined
  Likes: undefined
}

declare type IconDictionary = {
  [key: string]: JSX.Element
}

declare type DogBreed = {
  lifeSpan: string
  temperament: string
  weight: string
  breed: string
  height: string
  origin: string
  imageURL: string
  imageID: string
  breedID: string
}

declare type HeaderProps = {
  title: string
}

declare type DogCardProps = {
  dog: Partial<DogBreed>
  index: number
  activePile: Partial<DogBreed>[]
  addToShownPictures: (imageID: string) => void
  removeDogFromPile: (dog: Partial<DogBreed>) => void
}

declare type TemperamentProps = {
  temperament: string | ListRenderItemInfo<string>
}
