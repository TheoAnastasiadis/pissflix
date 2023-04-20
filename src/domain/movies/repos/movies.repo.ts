import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { Genre, Language } from "../entities/subentities"

export interface IMoviesRepo {
    getMovieById(id: Number): Promise<Result<Movie>>
    getMoviesByGenre(genre: Genre | Genre[]): Promise<Result<Movie[]>>
    getMoviesByRealeaseDate(
        startDate: Date,
        endDate: Date
    ): Promise<Result<Movie[]>>
    getMoviesByLanguage(
        language: Language | Language[]
    ): Promise<Result<Movie[]>>
}
