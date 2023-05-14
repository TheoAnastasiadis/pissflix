import { pipe } from "fp-ts/lib/function"
import * as t from "io-ts"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import {
    SuccesfullTMDBAggregateResponse,
    successfullTMDBResponse,
} from "./tmdbSchemas"
import { Language } from "../../../../../domain/movies/entities/language"
import { Country } from "../../../../../domain/movies/entities/country"
import { MovieT } from "../../../../../domain/movies/entities/movie"
import { tmdbGenres } from "./tmdbGenres"

const defaultPoster: string = ""
const defaultBackground: string = ""

const parseReleaseDate = (s?: string) =>
    pipe(
        s,
        O.fromNullable,
        O.map(Date.parse),
        O.chain(O.fromPredicate(isNaN)),
        O.getOrElse(() => Date.parse("1821"))
    )

const toMovie: (data: t.TypeOf<typeof successfullTMDBResponse>) => MovieT = (
    data
) => ({
    background: {
        economicQuality: data.backdrop_path
            ? "https://image.tmdb.org/t/p/w300/" + data.backdrop_path
            : defaultBackground,
        bestQuality: data.backdrop_path
            ? "https://image.tmdb.org/t/p/w1280/" + data.backdrop_path
            : defaultBackground,
    },
    genres:
        data.genres?.map((genre) => ({
            uniqueId: genre.id,
            name: genre.name,
        })) || [],
    id: data.id || 0,
    languages: pipe(
        data.spoken_languages,
        O.fromNullable,
        A.fromOption,
        A.flatten,
        A.map((obj) => obj.name),
        A.filter(Language.is)
    ),
    title: data.original_title || data.title || "Unknown Title",
    overview: data.overview || "",
    poster: {
        economicQuality: data.backdrop_path
            ? "https://image.tmdb.org/t/p/w300/" + data.poster_path
            : defaultPoster,
        bestQuality: data.backdrop_path
            ? "https://image.tmdb.org/t/p/w1280/" + data.poster_path
            : defaultPoster,
    },
    countries: pipe(
        data.production_countries,
        O.fromNullable,
        A.fromOption,
        A.flatten,
        A.map((obj) => obj.name),
        A.filter(Country.is)
    ),
    release: parseReleaseDate(data.release_date),
    runtime: data.runtime || 0,
    tagline: data.tagline || "",
})

const toMovies: (
    data: t.TypeOf<typeof SuccesfullTMDBAggregateResponse>
) => MovieT[] = (data) =>
    pipe(
        data,
        (data) => data.results,
        A.of,
        A.flatten,
        A.map((result) => ({
            background: {
                economicQuality: result.backdrop_path
                    ? "https://image.tmdb.org/t/p/w300/" + result.backdrop_path
                    : defaultBackground,
                bestQuality: result.backdrop_path
                    ? "https://image.tmdb.org/t/p/w1280/" + result.backdrop_path
                    : defaultBackground,
            },
            genres:
                result.genre_ids?.map(
                    (id) =>
                        tmdbGenres.find((v) => v.uniqueId == id) || {
                            uniqueId: 666,
                            name: "Unknown Genre",
                        }
                ) || [],
            id: result.id || 0,
            languages: [],
            title: result.original_title || result.title || "Unknown Title",
            overview: "",
            poster: {
                economicQuality: result.backdrop_path
                    ? "https://image.tmdb.org/t/p/w300/" + result.poster_path
                    : defaultPoster,
                bestQuality: result.backdrop_path
                    ? "https://image.tmdb.org/t/p/w1280/" + result.poster_path
                    : defaultPoster,
            },
            release: parseReleaseDate(result.release_date),
            countries: [],
            runtime: 0,
            tagline: "",
        }))
    )

export { toMovie, toMovies }
