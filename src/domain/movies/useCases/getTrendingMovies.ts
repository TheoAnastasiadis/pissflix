import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { MoviesRepoT } from "../repos/movies.repo"
import * as E from "fp-ts/Either"

export const getTrendingMovies =
    (repo: MoviesRepoT) =>
    (pagination: paginationParamsT) =>
    (type: "day" | "week") =>
        repo.findMany({ trendingType: type }, pagination)
