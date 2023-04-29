import { paginationParams } from "../../../core/sharedObjects/pagination"
import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { Genre } from "../entities/subentities"
import { IMoviesRepo } from "../repos/movies.repo"

export function getMoviesByGenre(
    repo: IMoviesRepo,
    genre: Genre,
    pagination: paginationParams = { page: 1, limit: 20 }
): Promise<Result<Movie[]>> {
    return repo.getMoviesByGenre(genre, pagination)
}
