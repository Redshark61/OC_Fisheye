export type Photographer = {
  name: string,
  id: number,
  city: string,
  country: string,
  tagline: string,
  price: number,
  portrait: string,
}

export type Media = {
  id: number,
  photographerId: number,
  title: string,
  image?: string,
  video?: string,
  likes: number,
  date: string,
  price: number,
}

export type Data = {
  photographers: Photographer[],
  media: Media[],
}