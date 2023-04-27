import { paginationParams } from "../../../core/sharedObjects/paginationHandler"
import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { Genre, Language } from "../entities/subentities"

export interface IMoviesRepo {
    getMovieById(id: Number): Promise<Result<Movie>>
    getMoviesByGenre(
        genre: Genre | Genre[],
        pagination: paginationParams
    ): Promise<Result<Movie[]>>
    getMoviesByRealeaseDate(
        startDate: Date,
        endDate: Date,
        pagination: paginationParams
    ): Promise<Result<Movie[]>>
    getMoviesByLanguage(
        language: Language | Language[],
        pagination: paginationParams
    ): Promise<Result<Movie[]>>
    getGenres(): Result<Genre[]>
    getTrendingMovies(
        type: "day" | "week",
        pagination: paginationParams
    ): Promise<Result<Movie[]>>
    searchForMovie(
        query: string,
        pagination: paginationParams
    ): Promise<Result<Movie[]>>
}
