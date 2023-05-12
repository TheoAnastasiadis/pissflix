import { pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { Region } from "../../../core/sharedObjects/regions"
import { MoviesRepoT } from "../repos/movies.repo"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"
import { Language } from "../entities/language"

export const getMoviesByRegion =
    (region: Region) =>
    (pagination: paginationParamsT) =>
    (repo: MoviesRepoT) =>
        pipe(
            region,
            O.of,
            O.map((r) => r.languages),
            A.fromOption,
            A.filter(Language.is),
            O.fromPredicate((l) => l.length > 0),
            E.fromOption(() => `Region ${region} contains no valid languages`),
            E.map((filteredLangs) =>
                repo.findMany({ language: filteredLangs }, pagination)
            )
        )
