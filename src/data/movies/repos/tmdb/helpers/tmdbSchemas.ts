import * as t from "io-ts"

const successfullTMDBResponse = t.partial({
    adult: t.boolean,
    backdrop_path: t.string,
    belongs_to_collection: t.string,
    budget: t.number,
    genres: t.array(
        t.type({
            id: t.number,
            name: t.string,
        })
    ),
    homepage: t.string,
    id: t.number,
    imdb_id: t.string,
    original_language: t.string,
    original_title: t.string,
    overview: t.string,
    popularity: t.number,
    poster_path: t.string,
    production_companies: t.array(
        t.type({
            id: t.number,
            logo_path: t.string,
            name: t.string,
            origin_country: t.string,
        })
    ),
    production_countries: t.array(
        t.type({
            iso_3166_1: t.string,
            name: t.string,
        })
    ),
    release_date: t.string,
    revenue: t.number,
    runtime: t.number,
    spoken_languages: t.array(
        t.type({
            iso_639_1: t.string,
            name: t.string,
        })
    ),
    status: t.union([
        t.literal("Rumored"),
        t.literal("Planned"),
        t.literal("In Production"),
        t.literal("Post Production"),
        t.literal("Released"),
        t.literal("Canceled"),
    ]),
    tagline: t.string,
    title: t.string,
    video: t.boolean,
    vote_average: t.number,
    vote_count: t.number,
})

const UnsuccesfullTMDBResponse = t.partial({
    status_message: t.string,
    success: t.boolean,
    status_code: t.number,
})

const SuccesfullTMDBAggregateResponse = t.type({
    page: t.number,
    results: t.array(
        t.partial({
            poster_path: t.string,
            adult: t.boolean,
            overview: t.string,
            release_date: t.string,
            genre_ids: t.array(t.number),
            id: t.number,
            original_title: t.string,
            original_language: t.string,
            title: t.string,
            backdrop_path: t.string,
            popularity: t.number,
            vote_count: t.number,
            video: t.boolean,
            vote_average: t.number,
        })
    ),
    total_results: t.number,
    total_pages: t.number,
})

export {
    successfullTMDBResponse,
    UnsuccesfullTMDBResponse,
    SuccesfullTMDBAggregateResponse,
}
