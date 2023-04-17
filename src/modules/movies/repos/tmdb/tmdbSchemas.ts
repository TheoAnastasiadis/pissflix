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
