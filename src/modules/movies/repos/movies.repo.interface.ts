import { Result } from "../../../shared/Objects/result"
import { Movie } from "../entities/movie.entity"
import { Genre, Language } from "../entities/subtypes"

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
