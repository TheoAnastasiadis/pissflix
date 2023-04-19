import { Result } from "../../../shared/Objects/result"
import { UseCase } from "../../../shared/Objects/useCase"
import { Movie } from "../entities/movie.entity"
import { IMoviesRepo } from "../repos/movies.repo.interface"

export const getMovieById: UseCase<IMoviesRepo, number, Result<Movie>> = (
    repo: IMoviesRepo,
    id: number
): Promise<Result<Movie>> => {
    //validate id
    //history
    //analytics
    return repo.getMovieById(id)
}
