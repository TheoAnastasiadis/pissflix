import { Result } from "../../../shared/Objects/result"
import { Movie } from "../entities/movie.entity"
import { IMoviesRepo } from "../repos/movies.repo.interface"

export function getMovieById(
    repo: IMoviesRepo,
    id: number
): Promise<Result<Movie>> {
    //validate id
    //history
    //analytics
    return repo.getMovieById(id)
}
