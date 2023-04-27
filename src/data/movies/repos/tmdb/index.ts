import axios from "axios"
import {
    Language,
    Country,
    Genre,
} from "../../../../domain/movies/entities/subentities"
import { IMoviesRepo } from "../../../../domain/movies/repos/movies.repo"
import { TMDBBackgroundImage, TMDBPosterImage } from "./subtypes/tmdbImage"
import {
    TMDBResult,
    successfullTMDBResponse,
    SuccesfullTMDBAggregateResponse,
} from "./subtypes/tmdbSchemas"
import tmdbConfig from "../../../../core/config/tmdb.config"
import { Result } from "../../../../core/sharedObjects/result"
import { Movie } from "../../../../domain/movies/entities/movie.entity"
import { paginationParams } from "../../../../core/sharedObjects/paginationHandler"
import { tmdbGenres } from "./subtypes/tmdbGenres"

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

class ErrorResult<T> {
    invalidCredentials = (): Result<T> =>
        new Result<T>(false, "TMDB API: Invalid credentials")
    noResults = (message: string): Result<T> =>
        new Result<T>(false, `TMDB API: No results (info:{${message})}`)
    notResponding = (): Result<T> =>
        new Result<T>(
            false,
            "Unexpected Error: Connection to TMDB server could not be made"
        )
}

export class TMDBRepo implements IMoviesRepo {
    getGenres(): Result<Genre[]> {
        return new Result<Genre[]>(true, undefined, tmdbGenres)
    }
    async getTrendingMovies(
        type: "day" | "week",
        pagination: paginationParams
    ): Promise<Result<Movie[]>> {
        try {
            const response = await api.get(baseURL + "trending/movie/" + type)
            if (response.status == 200 && response.data.results.length > 0) {
                const data: SuccesfullTMDBAggregateResponse = response.data
                return new Result(
                    true,
                    undefined,
                    data.results.map(resultToMovieProps)
                )
            } else {
                return response.status == 404 ||
                    response.data.results.length == 0 //404s or empty results should return error Result
                    ? new ErrorResult<Movie[]>().noResults(
                          `type: trending/${type}`
                      )
                    : new ErrorResult<Movie[]>().invalidCredentials()
            }
        } catch (e) {
            return new ErrorResult<Movie[]>().notResponding()
        }
    }
    async searchForMovie(
        query: string,
        pagination: paginationParams
    ): Promise<Result<Movie[]>> {
        try {
            const response = await api.get(baseURL + "search/movie/" + query)
            if (response.status == 200 && response.data.results.length > 0) {
                const data: SuccesfullTMDBAggregateResponse = response.data
                return new Result(
                    true,
                    undefined,
                    data.results.map(resultToMovieProps)
                )
            } else {
                return response.status == 404 ||
                    response.data.results.length == 0 //404s or empty results should return error Result
                    ? new ErrorResult<Movie[]>().noResults(`query: ${query}`)
                    : new ErrorResult<Movie[]>().invalidCredentials()
            }
        } catch (e) {
            return new ErrorResult<Movie[]>().notResponding()
        }
    }
    async getMovieById(id: Number): Promise<Result<Movie>> {
        try {
            const response = await api.get(baseURL + "movie/" + id)
            if (response.status == 200) {
                const data: successfullTMDBResponse = response.data
                return new Result(
                    true,
                    undefined,
                    new Movie({
                        adult: data.adult,
                        background: data.backdrop_path
                            ? new TMDBBackgroundImage(
                                  data.backdrop_path as string
                              )
                            : defaultBackground,
                        id: data.id,
                        overview: data.overview ? data.overview : "",
                        popularity: data.popularity,
                        poster: data.poster_path
                            ? new TMDBPosterImage(data.poster_path as string)
                            : defaultPoster,
                        release: new Date(data.release_date as string),
                        runtime: data.runtime ? data.runtime : 0,
                        tagline: data.tagline,
                        imdbId: data.imdb_id || null, //TODO: We need this, it cannot be null
                        rating: data.popularity,
                        status: data.status,
                        title: data.original_title
                            ? data.original_title
                            : "Unknown Title",
                        genres: data.genres.map((genre) => ({
                            name: genre.name,
                            uniqueId: genre.id,
                        })),
                        languages: data.spoken_languages.map(
                            (language) =>
                                new Language(
                                    language.iso_639_1 as string,
                                    "639-1"
                                )
                        ),
                        countries: data.production_countries.map(
                            (country) =>
                                new Country(country.iso_3166_1 as string)
                        ),
                    })
                )
            } else {
                return response.status == 404
                    ? new ErrorResult<Movie>().noResults(`id: ${id}`)
                    : new ErrorResult<Movie>().invalidCredentials()
            }
        } catch (e) {
            return new ErrorResult<Movie>().notResponding()
        }
    }
    async getMoviesByRealeaseDate(
        startDate: Date,
        endDate: Date
    ): Promise<Result<Movie[]>> {
        try {
            const response = await api.get(
                baseURL +
                    `discover/movie/?primary_release_date.gte=${startDate
                        .toLocaleDateString("en-US")
                        .replace(
                            /(\d{1,2})\/(\d{1,2})\/(\d{4})/gm,
                            "$3"
                        )}&primary_release_date.lte=${endDate
                        .toLocaleDateString("en-US")
                        .replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/gm, "$3")}` //TMDB API bug: 2020-01-01 --> no results, 2020 --> 20 results
            )
            if (response.status == 200 && response.data.results.length > 0) {
                //Empty results should return error Result
                const data: SuccesfullTMDBAggregateResponse = response.data
                return new Result(
                    true,
                    undefined,
                    data.results.map(resultToMovieProps)
                )
            } else {
                return response.status == 404 ||
                    response.data.results.length == 0 //404s or empty results should return error Result
                    ? new ErrorResult<Movie[]>().noResults(
                          `startDate: ${startDate.toLocaleString(
                              "en-US"
                          )}, endDate: ${endDate.toLocaleString("en-US")}`
                      )
                    : new ErrorResult<Movie[]>().invalidCredentials()
            }
        } catch (e) {
            return new ErrorResult<Movie[]>().notResponding()
        }
    }
    async getMoviesByGenre(genre: Genre | Genre[]): Promise<Result<Movie[]>> {
        try {
            const response = await api.get(
                baseURL +
                    `discover/movie/?with_genres=${
                        Array.isArray(genre)
                            ? genre.map((g) => g.uniqueId).join("|")
                            : genre.uniqueId
                    }`
            )
            if (response.status == 200 && response.data.results.length > 0) {
                const data: SuccesfullTMDBAggregateResponse = response.data
                return new Result(
                    true,
                    undefined,
                    data.results.map(resultToMovieProps)
                )
            } else {
                return response.status == 404 ||
                    response.data.results.length == 0 //404s or empty results should return error Result
                    ? new ErrorResult<Movie[]>().noResults(`genres: ${genre}`)
                    : new ErrorResult<Movie[]>().invalidCredentials()
            }
        } catch (e) {
            return new ErrorResult<Movie[]>().notResponding()
        }
    }
    async getMoviesByLanguage(
        language: Language | Language[]
    ): Promise<Result<Movie[]>> {
        try {
            const response = await api.get(
                baseURL +
                    `discover/movie/?with_original_language=${
                        Array.isArray(language)
                            ? language.map((lang) => lang.isoCode).join("|")
                            : language.isoCode
                    }`
            )
            if (response.status == 200 && response.data.results.length > 0) {
                const data: SuccesfullTMDBAggregateResponse = response.data
                return new Result(
                    true,
                    undefined,
                    data.results.map(resultToMovieProps)
                )
            } else {
                return response.status == 404 ||
                    response.data.results.length == 0 //404s or empty results should return error Result
                    ? new ErrorResult<Movie[]>().noResults(
                          `languages: ${language}`
                      )
                    : new ErrorResult<Movie[]>().invalidCredentials()
            }
        } catch (e) {
            return new ErrorResult<Movie[]>().notResponding()
        }
    }
}
