import { MoviesRepoT } from "../repos/movies.repo"

export const getMovieById = (repo: MoviesRepoT) => (id: number) =>
    repo.findOne(id)
