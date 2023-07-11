import * as t from "io-ts"

const successfullTMDBResponse = t.type({
    adult: t.union([t.boolean, t.null]),
    backdrop_path: t.union([t.string, t.null]),
    belongs_to_collection: t.union([
        t.type({
            id: t.number,
            name: t.string,
            poster_path: t.string,
            backdrop_path: t.string,
        }),
        t.null,
    ]),
    budget: t.union([t.number, t.null]),
    genres: t.union([
        t.array(
            t.type({
                id: t.union([t.number, t.null]),
                name: t.union([t.string, t.null]),
            })
        ),
        t.null,
    ]),
    homepage: t.union([t.string, t.null]),
    id: t.union([t.number, t.null]),
    imdb_id: t.union([t.string, t.null]),
    original_language: t.union([t.string, t.null]),
    original_title: t.union([t.string, t.null]),
    overview: t.union([t.string, t.null]),
    popularity: t.union([t.number, t.null]),
    poster_path: t.union([t.string, t.null]),
    production_companies: t.union([
        t.array(
            t.type({
                id: t.union([t.number, t.null]),
                logo_path: t.union([t.string, t.null]),
                name: t.union([t.string, t.null]),
                origin_country: t.union([t.string, t.null]),
            })
        ),
        t.null,
    ]),
    production_countries: t.union([
        t.array(
            t.type({
                iso_3166_1: t.union([t.string, t.null]),
                name: t.union([t.string, t.null]),
            })
        ),
        t.null,
    ]),
    release_date: t.union([t.string, t.null]),
    revenue: t.union([t.number, t.null]),
    runtime: t.union([t.number, t.null]),
    spoken_languages: t.union([
        t.array(
            t.partial({
                iso_639_1: t.union([t.string, t.null]),
                name: t.union([t.string, t.null]),
            })
        ),
        t.null,
    ]),
    status: t.union([
        t.union([
            t.literal("Rumored"),
            t.literal("Planned"),
            t.literal("In Production"),
            t.literal("Post Production"),
            t.literal("Released"),
            t.literal("Canceled"),
        ]),
        t.null,
    ]),
    tagline: t.union([t.string, t.null]),
    title: t.union([t.string, t.null]),
    video: t.union([t.boolean, t.null]),
    vote_average: t.union([t.number, t.null]),
    vote_count: t.union([t.number, t.null]),
})

const UnsuccesfullTMDBResponse = t.type({
    status_message: t.union([t.string, t.null]),
    success: t.union([t.boolean, t.null]),
    status_code: t.union([t.number, t.null]),
})

const SuccesfullTMDBAggregateResponse = t.type({
    page: t.union([t.number, t.null]),
    results: t.union([
        t.array(
            t.type({
                poster_path: t.union([t.string, t.null]),
                adult: t.union([t.boolean, t.null]),
                overview: t.union([t.string, t.null]),
                release_date: t.union([t.string, t.null]),
                genre_ids: t.union([t.array(t.number), t.null]),
                id: t.union([t.number, t.null]),
                original_title: t.union([t.string, t.null]),
                original_language: t.union([t.string, t.null]),
                title: t.union([t.string, t.null]),
                backdrop_path: t.union([t.string, t.null]),
                popularity: t.union([t.number, t.null]),
                vote_count: t.union([t.number, t.null]),
                video: t.union([t.boolean, t.null]),
                vote_average: t.union([t.number, t.null]),
            })
        ),
        t.null,
    ]),
    total_results: t.union([t.number, t.null]),
    total_pages: t.union([t.number, t.null]),
})

export {
    successfullTMDBResponse,
    UnsuccesfullTMDBResponse,
    SuccesfullTMDBAggregateResponse,
}
