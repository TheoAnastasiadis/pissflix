import { Movie } from "../../../../../domain/movies/entities/movie.entity"
import { Language } from "../../../../../domain/movies/entities/subentities"
import { TMDBBackgroundImage, TMDBPosterImage } from "../subtypes/tmdbImage"
import { TMDBResult } from "../subtypes/tmdbSchemas"

export const defaultBackground = new TMDBBackgroundImage("")
export const defaultPoster = new TMDBPosterImage("")

export const resultToMovie = (result: TMDBResult) =>
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
