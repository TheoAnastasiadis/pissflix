import { Result } from "../../../core/sharedObjects/result"
import { UseCase } from "../../../core/sharedObjects/useCase"
import { Movie } from "../entities/movie.entity"
import { IMoviesRepo } from "../repos/movies.repo"

export const getMovieById: UseCase<IMoviesRepo, number, Result<Movie>> = (
    repo: IMoviesRepo,
    id: number
): Promise<Result<Movie>> => {
    //validate id
    //history
    //analytics
    return repo.getMovieById(id)
}
