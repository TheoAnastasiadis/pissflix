import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { Genre } from "../entities/subentities"
import { IMoviesRepo } from "../repos/movies.repo"

export function getMoviesByGenre(
    repo: IMoviesRepo,
    genre: Genre
): Promise<Result<Movie[]>> {
    //validate genre
    //history
    //analytics
    return repo.getMoviesByGenre(genre)
}
