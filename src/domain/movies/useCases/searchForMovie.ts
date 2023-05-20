import { pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { MoviesRepoT } from "../repos/movies.repo"
import * as O from "fp-ts/Option"
import * as E from "fp-ts/Either"

export const searchForMovie =
    (repo: MoviesRepoT) => (pagination: paginationParamsT) => (query: string) =>
        pipe(
            query,
            O.fromPredicate((s) => s.trim().length > 0),
            O.map((trimmedString) =>
                repo.findMany({ query: trimmedString }, pagination)
            ),
            E.fromOption(() => "Provide a search keyword")
        )
