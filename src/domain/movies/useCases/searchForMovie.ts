import { paginationParams } from "../../../core/sharedObjects/pagination"
import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { IMoviesRepo } from "../repos/movies.repo"

export function searchForMovie(
    repo: IMoviesRepo,
    query: string,
    pagination: paginationParams = { page: 1, limit: 20 }
): Promise<Result<Movie[]>> {
    return repo.searchForMovie(query, pagination)
}
