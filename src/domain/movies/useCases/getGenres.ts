import { Result } from "../../../core/sharedObjects/result"
import { Genre } from "../entities/subentities"
import { IMoviesRepo } from "../repos/movies.repo"

export const getGenres = (repo: IMoviesRepo): Result<Genre[]> => {
    return repo.getGenres()
}
