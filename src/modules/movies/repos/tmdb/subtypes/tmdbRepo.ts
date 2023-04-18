import axios from "axios"
import { Result } from "../../../../../shared/Objects/result"
import tmdbConfig from "../../../../../shared/config/tmdb.config"
import { Movie } from "../../../entities/movie.entity"
import { Language, Country, Genre } from "../../../entities/subtypes"
import { IMoviesRepo } from "../../movies.repo.interface"
import { TMDBBackgroundImage, TMDBPosterImage } from "./tmdbImage"
import {
    TMDBResult,
    successfullTMDBResponse,
    SuccesfullTMDBAggregateResponse,
} from "./tmdbSchemas"

const api = axios.create({
    headers: {
        Authorization: `Bearer ${tmdbConfig.tmdbApiKey}`,
    },
})
const baseURL = "https://api.themoviedb.org/3/"
const defaultBackground = new TMDBBackgroundImage("")
const defaultPoster = new TMDBPosterImage("")

const resultToMovieProps = (result: TMDBResult) =>
    new Movie({
        adult: result.adult,
        background: result.backdrop_path
            ? new TMDBBackgroundImage(result.backdrop_path)
            : defaultBackground,
        genres: result.genre_ids.map((genre) => ({
            name: "",
            uniqueId: genre,
        })),
        id: result.id,
        imdbId: null,
        languages: [new Language(result.original_language, "639-1")],
        title: result.original_title,
        overview: result.overview,
        popularity: result.popularity,
        poster: result.poster_path
            ? new TMDBPosterImage(result.poster_path)
            : defaultPoster,
        countries: [],
        release: new Date(result.release_date),
        runtime: 0,
        status: "Released",
        tagline: "",
        rating: result.vote_average,
    })

export class TMDBRepo implements IMoviesRepo {
    async getMovieById(id: Number): Promise<Result<Movie>> {
        try {
            const response: successfullTMDBResponse = (
                await api.get(baseURL + "movie/" + id)
            ).data
            return new Result(
                true,
                undefined,
                new Movie({
                    adult: response.adult,
                    background: response.backdrop_path
                        ? new TMDBBackgroundImage(
                              response.backdrop_path as string
                          )
                        : defaultBackground,
                    id: response.id,
                    overview: response.overview ? response.overview : "",
                    popularity: response.popularity,
                    poster: response.poster_path
                        ? new TMDBPosterImage(response.poster_path as string)
                        : defaultPoster,
                    release: new Date(response.release_date as string),
                    runtime: response.runtime ? response.runtime : 0,
                    tagline: response.tagline,
                    imdbId: response.imdb_id || null, //TODO: We need this, it cannot be null
                    rating: response.popularity,
                    status: response.status,
                    title: response.original_title
                        ? response.original_title
                        : "Unknown Title",
                    genres: response.genres.map((genre) => ({
                        name: genre.name,
                        uniqueId: genre.id,
                    })),
                    languages: response.spoken_languages.map(
                        (language) =>
                            new Language(language.iso_639_1 as string, "639-1")
                    ),
                    countries: response.production_countries.map(
                        (country) => new Country(country.iso_3166_1 as string)
                    ),
                })
            )
        } catch (e) {
            return new Result(false, "TMDB API: Movie could not be fetched.")
        }
    }
    async getMoviesByRealeaseDate(
        startDate: Date,
        endDate: Date
    ): Promise<Result<Movie[]>> {
        try {
            const response: SuccesfullTMDBAggregateResponse = (
                await api.get(
                    baseURL +
                        `discover/movie/?primary_release_date.gte=${startDate
                            .toLocaleDateString("en-US")
                            .replace(
                                "/",
                                "-"
                            )}&primary_release_date.lte=${endDate
                            .toLocaleDateString("en-US")
                            .replace("/", "-")}`
                )
            ).data
            return new Result(
                true,
                undefined,
                response.results.map(resultToMovieProps)
            )
        } catch (e) {
            return new Result(
                false,
                "TMDB API: Movie Results could not be fetched."
            )
        }
    }
    async getMoviesByGenre(genre: Genre | Genre[]): Promise<Result<Movie[]>> {
        try {
            const response: SuccesfullTMDBAggregateResponse = (
                await api.get(
                    baseURL +
                        `discover/movie/?with_genres=${
                            Array.isArray(genre)
                                ? genre.map((g) => g.uniqueId).join("|")
                                : genre.uniqueId
                        }`
                )
            ).data
            return new Result(
                true,
                undefined,
                response.results.map(resultToMovieProps)
            )
        } catch (e) {
            return new Result(
                false,
                "TMDB API: Movie Results could not be fetched."
            )
        }
    }
    async getMoviesByLanguage(
        language: Language | Language[]
    ): Promise<Result<Movie[]>> {
        try {
            const response: SuccesfullTMDBAggregateResponse = (
                await api.get(
                    baseURL +
                        `discover/movie/?with_original_language=${
                            Array.isArray(language)
                                ? language.map((lang) => lang.isoCode).join("|")
                                : language.isoCode
                        }`
                )
            ).data
            return new Result(
                true,
                undefined,
                response.results.map(resultToMovieProps)
            )
        } catch (e) {
            return new Result(
                false,
                "TMDB API: Movie Results could not be fetched."
            )
        }
    }
}
