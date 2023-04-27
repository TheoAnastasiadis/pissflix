import { Year } from "../../../core/sharedObjects/decades"
import { paginationParams } from "../../../core/sharedObjects/paginationHandler"
import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { IMoviesRepo } from "../repos/movies.repo"

export function getMoviesByDecade(
    repo: IMoviesRepo,
    firstYearOfDecade: Year,
    pagination: paginationParams = {page: 1, limit: 20}
): Promise<Result<Movie[]>> {
    return repo.getMoviesByRealeaseDate(
        new Date(firstYearOfDecade, 0, 0),
        new Date(firstYearOfDecade + 9, 11, 30),
        pagination
    )
}
