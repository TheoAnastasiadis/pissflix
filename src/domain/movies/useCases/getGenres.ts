import { MoviesRepoT } from "../repos/movies.repo"

import * as E from "fp-ts/Either"

export const getGenres = (repo: MoviesRepoT) => repo.getGenres()
