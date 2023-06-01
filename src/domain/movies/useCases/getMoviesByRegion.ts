import { pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { Region } from "../../../core/sharedObjects/regions"
import { MoviesRepoT } from "../repos/movies.repo"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import { Language } from "../entities/language"

export const getMoviesByRegion =
    (repo: MoviesRepoT) =>
    (pagination: paginationParamsT) =>
    (region: Region) =>
        pipe(
            region,
            (r) => r.countries,
            (countries) => repo.findMany({ country: countries }, pagination)
        )
