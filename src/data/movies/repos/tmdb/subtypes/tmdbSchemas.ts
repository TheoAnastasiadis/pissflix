export type successfullTMDBResponse = {
    adult: Boolean
    backdrop_path: String | null
    belongs_to_collection: String | Object
    budget: Number
    genres: {
        id: Number
        name: String
    }[]
    homepage: String | null
    id: Number
    imdb_id: `tt${number}` | null
    original_language: String
    original_title: String
    overview: String | null
    popularity: Number
    poster_path: String | null
    production_companies: {
        id: Number
        logo_path: String | null
        name: String
        origin_country: String
    }[]
    production_countries: {
        iso_3166_1: String
        name: String
    }[]
    release_date: String
    revenue: Number
    runtime: Number | null
    spoken_languages: {
        iso_639_1: String
        name: String
    }[]
    status:
        | "Rumored"
        | "Planned"
        | "In Production"
        | "Post Production"
        | "Released"
        | "Canceled"
    tagline: String
    title: String
    video: Boolean
    vote_average: Number
    vote_count: Number
}

export type UnsuccesfullTMDBResponse = {
    status_message: String
    success: Boolean | undefined
    status_code: Number
}

export type SuccesfullTMDBAggregateResponse = {
    page: number
    results: TMDBResult[]
    total_results: number
    total_pages: number
}

export type TMDBResult = {
    poster_path: string | null
    adult: boolean
    overview: string
    release_date: string
    genre_ids: number[]
    id: number
    original_title: string
    original_language: string
    title: string
    backdrop_path: string | null
    popularity: number
    vote_count: number
    video: boolean
    vote_average: number
}
