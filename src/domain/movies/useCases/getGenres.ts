import { Result } from "../../../core/sharedObjects/result"
import { Genre } from "../entities/subentities"
import { IMoviesRepo } from "../repos/movies.repo"

export const getGenres = (repo: IMoviesRepo): Promise<Result<Genre[]>> => {
    return Promise.resolve(repo.getGenres())
}
