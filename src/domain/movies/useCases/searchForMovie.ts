import { pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { MoviesRepoT } from "../repos/movies.repo"
import * as O from "fp-ts/Option"
import * as TE from "fp-ts/TaskEither"

export const searchForMovie =
    (repo: MoviesRepoT) => (pagination: paginationParamsT) => (query: string) =>
        pipe(
            query,
            O.fromPredicate((s) => s.trim().length > 0),
            O.map((trimmedString) =>
                repo.findMany({ query: trimmedString }, pagination)
            ),
            O.getOrElseW(() => TE.left("Provide a search keyword"))
        )
