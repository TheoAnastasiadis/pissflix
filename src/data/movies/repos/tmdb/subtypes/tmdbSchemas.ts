export type successfullTMDBResponse = {
    adult: boolean
    backdrop_path: string | null
    belongs_to_collection: string | Object
    budget: number
    genres: {
        id: number
        name: string
    }[]
    homepage: string | null
    id: number
    imdb_id: `tt${number}` | null
    original_language: string
    original_title: string
    overview: string | null
    popularity: number
    poster_path: string | null
    production_companies: {
        id: number
        logo_path: string | null
        name: string
        origin_country: string
    }[]
    production_countries: {
        iso_3166_1: string
        name: string
    }[]
    release_date: string
    revenue: number
    runtime: number | null
    spoken_languages: {
        iso_639_1: string
        name: string
    }[]
    status:
        | "Rumored"
        | "Planned"
        | "In Production"
        | "Post Production"
        | "Released"
        | "Canceled"
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export type UnsuccesfullTMDBResponse = {
    status_message: string
    success: boolean | undefined
    status_code: number
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
