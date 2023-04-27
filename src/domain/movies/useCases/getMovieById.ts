import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { IMoviesRepo } from "../repos/movies.repo"

export const getMovieById = (
    repo: IMoviesRepo,
    id?: number
): Promise<Result<Movie>> => {
    if (typeof id == "undefined")
        return Promise.resolve(new Result(false, "No movie id provided"))
    return repo.getMovieById(id)
}
