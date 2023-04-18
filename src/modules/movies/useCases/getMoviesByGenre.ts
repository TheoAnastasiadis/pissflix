import { Result } from "../../../shared/Objects/result"
import { Movie } from "../entities/movie.entity"
import { Genre } from "../entities/subtypes"
import { IMoviesRepo } from "../repos/movies.repo.interface"

export function getMoviesByGenre(
    repo: IMoviesRepo,
    genre: Genre
): Promise<Result<Movie[]>> {
    //validate genre
    //history
    //analytics
    return repo.getMoviesByGenre(genre)
}
