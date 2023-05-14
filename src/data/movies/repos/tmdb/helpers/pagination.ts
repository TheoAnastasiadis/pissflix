import { pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../../../core/sharedObjects/pagination"

import * as O from "fp-ts/Option"

const TMDB_RESULTS_LIMIT = 20 //this is hardcoded into the API
const TMDB_MAX_PAGES = 1000 // this is hardcoded into the API

const validatePage = (page: number) =>
    pipe(
        page,
        O.fromPredicate((page: number) => page < TMDB_MAX_PAGES),
        O.getOrElse(() => TMDB_MAX_PAGES - 1)
    )

const validateLimit = (limit: number) =>
    pipe(
        limit,
        O.fromPredicate((l) => l <= TMDB_RESULTS_LIMIT),
        O.getOrElse(() => TMDB_RESULTS_LIMIT)
    )

const resultsPage = (pagination: paginationParamsT) =>
    pipe(
        O.Do,
        O.bind("page", () => O.of(validatePage(pagination.page))),
        O.bind("limit", () => O.of(validateLimit(pagination.limit))),
        O.map(({ page, limit }) => (page - 1) * limit), //first result we're looking for
        O.map((prod) => Math.floor(prod / TMDB_RESULTS_LIMIT) + 1),
        O.map(validatePage),
        O.getOrElse(() => 0)
    )

const resultsStart = (pagination: paginationParamsT) =>
    pipe(
        O.Do,
        O.bind("page", () => O.of(validatePage(pagination.page))),
        O.bind("limit", () => O.of(validateLimit(pagination.limit))),
        O.map(({ page, limit }) => (page - 1) * limit), //first result in the page we're looking for
        O.map((prod) => prod % TMDB_RESULTS_LIMIT),
        O.getOrElse(() => 0)
    )

const resultsEnd = (pagination: paginationParamsT) =>
    pipe(resultsStart(pagination), (startId) =>
        Math.min(startId + pagination.limit, TMDB_RESULTS_LIMIT)
    )

export { resultsPage, resultsStart, resultsEnd }
