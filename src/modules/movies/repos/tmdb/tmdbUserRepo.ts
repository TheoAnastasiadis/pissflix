import { Result } from "../../../../shared/Objects/result"
import { Movie } from "../../entity"
import { IMoviesRepo } from "../moviesRepo"
import tmdbConfig from "../../../../shared/config/tmdb.config"
import axios from "axios"
import { TMDBBackgroundImage, TMDBPosterImage } from "./tmdbImage"
import { successfullTMDBResponse } from "./tmdbSchemas"
import { Language } from "../../entity/movieLanguages"
import { Country } from "../../entity/movieCountries"

const api = axios.create({
    headers: {
        Authorization: `Bearer ${tmdbConfig.tmdbApiKey}`,
    },
})
const baseURL = "https://api.themoviedb.org/3/"
const defaultBackground = new TMDBBackgroundImage("")
const defaultPoster = new TMDBPosterImage("")

export class tmdbMoviesRepo implements IMoviesRepo {
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
            return new Result(false, "TMDB API: Authentication error")
        }
    }
    getMoviesByYear(year: Date): Promise<Result<Movie[]>> {
        throw new Error("Method not implemented.")
    }
    getMoviesByDecade(decade: Date): Promise<Result<Movie[]>> {
        throw new Error("Method not implemented.")
    }
}
