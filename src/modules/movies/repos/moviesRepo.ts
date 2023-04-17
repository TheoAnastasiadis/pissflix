import { Result } from "../../../shared/Objects/result"
import { Movie } from "../entity"

export interface IMoviesRepo {
    getMovieById(id: Number): Promise<Result<Movie>>
    // getMoviesByGenre(genre: Genre) : Result<Movie[]>
    getMoviesByYear(year: Date): Promise<Result<Movie[]>>
    getMoviesByDecade(decade: Date): Promise<Result<Movie[]>>
    // getMoviesByLanguage(language: Language) : Result<Movie[]>
}
