import * as t from "io-ts"

export const successfullTMDBTVResponse = t.type({
    adult: t.union([t.boolean, t.null]),
    backdrop_path: t.union([t.string, t.null]),
    created_by: t.union([t.any, t.null]),
    episode_run_time: t.union([t.array(t.number), t.null]),
    first_air_date: t.union([t.string, t.null]),
    genres: t.array(
        t.type({
            id: t.number,
            name: t.string,
        })
    ),
    homepage: t.union([t.string, t.null]),
    id: t.number,
    in_production: t.union([t.boolean, t.null]),
    languages: t.union([t.array(t.string), t.null]),
    last_air_date: t.union([t.string, t.null]),
    last_episode_to_air: t.union([t.any, t.null]),
    name: t.union([t.string, t.null]),
    next_episode_to_air: t.union([t.any, t.null]),
    networks: t.union([t.any, t.null]),
    number_of_episodes: t.union([t.number, t.null]),
    number_of_seasons: t.union([t.number, t.null]),
    origin_country: t.union([t.array(t.string), t.null]),
    original_language: t.union([t.string, t.null]),
    original_name: t.union([t.string, t.null]),
    overview: t.union([t.string, t.null]),
    popularity: t.union([t.number, t.null]),
    poster_path: t.union([t.string, t.null]),
    production_companies: t.union([t.any, t.null]),
    production_countries: t.union([
        t.array(
            t.type({
                iso_3166_1: t.union([t.string, t.null]),
                name: t.union([t.string, t.null]),
            })
        ),
        t.null,
    ]),
    seasons: t.array(
        t.type({
            air_date: t.union([t.string, t.null]),
            episode_count: t.union([t.number, t.null]),
            id: t.union([t.number, t.null]),
            name: t.union([t.string, t.null]),
            overview: t.union([t.string, t.null]),
            poster_path: t.union([t.string, t.null]),
            season_number: t.union([t.number, t.null]),
            vote_average: t.union([t.number, t.null]),
        })
    ),
    spoken_languages: t.array(
        t.type({
            english_name: t.union([t.string, t.null]),
            iso_639_1: t.union([t.string, t.null]),
            name: t.union([t.string, t.null]),
        })
    ),
    status: t.union([t.string, t.null]),
    tagline: t.union([t.string, t.null]),
    type: t.union([t.string, t.null]),
    vote_average: t.union([t.number, t.null]),
    vote_count: t.union([t.number, t.null]),
    external_ids: t.type({
        imdb_id: t.union([t.string, t.null]),
        freebase_mid: t.any,
        freebase_id: t.any,
        tvdb_id: t.any,
        tvrage_id: t.any,
        wikidata_id: t.any,
    }),
})

export const SeasonResponse = t.type({
    _id: t.string,
    air_date: t.union([t.string, t.null]),
    episodes: t.array(
        t.type({
            air_date: t.union([t.string, t.null]),
            episode_number: t.union([t.number, t.null]),
            id: t.union([t.number, t.null]),
            name: t.union([t.string, t.null]),
            overview: t.union([t.string, t.null]),
            production_code: t.union([t.string, t.null]),
            runtime: t.union([t.number, t.null]),
            season_number: t.union([t.number, t.null]),
            show_id: t.union([t.number, t.null]),
            still_path: t.union([t.string, t.null]),
            vote_average: t.union([t.number, t.null]),
            vote_count: t.union([t.number, t.null]),
            crew: t.union([t.any, t.null]),
            guest_stars: t.union([t.any, t.null]),
        })
    ),
    name: t.union([t.string, t.null]),
    overview: t.union([t.string, t.null]),
    id: t.union([t.number, t.null]),
    poster_path: t.union([t.string, t.null]),
    season_number: t.union([t.number, t.null]),
    vote_average: t.union([t.number, t.null]),
})

export const EpisodeResponse = t.type({
    air_date: t.union([t.string, t.null]),
    crew: t.union([t.any, t.null]),
    episode_number: t.union([t.number, t.null]),
    guest_stars: t.union([t.any, t.null]),
    name: t.union([t.string, t.null]),
    overview: t.union([t.string, t.null]),
    id: t.number,
    production_code: t.union([t.string, t.null]),
    runtime: t.union([t.number, t.null]),
    season_number: t.union([t.number, t.null]),
    still_path: t.union([t.string, t.null]),
    vote_average: t.union([t.number, t.null]),
    vote_count: t.union([t.number, t.null]),
    external_ids: t.type({
        imdb_id: t.union([t.string, t.null]),
        freebase_mid: t.any,
        freebase_id: t.any,
        tvdb_id: t.any,
        tvrage_id: t.any,
        wikidata_id: t.any,
    }),
})

export const TMDBSeriesAggregateResponse = t.type({
    page: t.number,
    results: t.array(
        t.type({
            backdrop_path: t.union([t.string, t.null]),
            first_air_date: t.union([t.string, t.null]),
            genre_ids: t.union([t.array(t.number), t.null]),
            id: t.number,
            name: t.union([t.string, t.null]),
            origin_country: t.union([t.array(t.string), t.null]),
            original_language: t.union([t.string, t.null]),
            original_name: t.union([t.string, t.null]),
            overview: t.union([t.string, t.null]),
            popularity: t.union([t.number, t.null]),
            poster_path: t.union([t.string, t.null]),
            vote_average: t.union([t.number, t.null]),
            vote_count: t.union([t.number, t.null]),
        })
    ),
    total_pages: t.number,
    total_results: t.number,
})
