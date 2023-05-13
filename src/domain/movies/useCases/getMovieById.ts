import { MoviesRepoT } from "../repos/movies.repo"

import * as E from "fp-ts/Either"

export const getMovieById = (id: number) => (repo: MoviesRepoT) =>
    E.of(repo.findOne(id))
