import { MoviesRepoT } from "../repos/movies.repo"

export const getGenres = (repo: MoviesRepoT) => repo.getGenres()
