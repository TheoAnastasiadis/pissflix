import { Year } from "../../../shared/Objects/decades"
import { Result } from "../../../shared/Objects/result"
import { Movie } from "../entities/movie.entity"
import { IMoviesRepo } from "../repos/movies.repo.interface"

export function getMoviesByDecade(
    repo: IMoviesRepo,
    firstYearOfDecade: Year
): Promise<Result<Movie[]>> {
    //validate year
    //history
    //analytics
    return repo.getMoviesByRealeaseDate(
        new Date(firstYearOfDecade, 0, 0),
        new Date(firstYearOfDecade + 9, 11, 30)
    )
}
