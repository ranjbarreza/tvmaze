export interface Cast {
  person: {
    id: number
    name: string
    url: string
    image?: {
      medium: string
      original: string
    } | null
  }
}

export interface ShowDetails {
  id: number
  name: string
  language: string
  genres: string[]
  runtime: number
  premiered: string
  ended?: string | null
  rating: {
    average: number
  }
  network?: {
    name: string
  }
  image?: {
    medium: string
    original: string
  } | null
  summary: string
}

export interface ShowDetailsWithCast extends ShowDetails {
  _embedded: {
    cast: Cast[]
  }
}
