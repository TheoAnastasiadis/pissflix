import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { MoviesRepoT } from "../repos/movies.repo"
import * as E from "fp-ts/Either"

export const getTrendingMovies =
    (type: "day" | "week") =>
    (pagination: paginationParamsT) =>
    (repo: MoviesRepoT) =>
        E.of(repo.findMany({ trendingType: type }, pagination))
