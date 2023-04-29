import { paginationParams } from "../../../core/sharedObjects/pagination"
import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { IMoviesRepo } from "../repos/movies.repo"

export function getTrendingMovies(
    repo: IMoviesRepo,
    type: "day" | "week",
    pagination: paginationParams = { page: 1, limit: 20 }
): Promise<Result<Movie[]>> {
    return repo.getTrendingMovies(type, pagination)
}
