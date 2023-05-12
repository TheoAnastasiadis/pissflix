import { pipe } from "fp-ts/lib/function"
import { MoviesRepoT } from "../repos/movies.repo"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import * as E from "fp-ts/Either"
import { DateBrand, DateBrandType } from "../entities/date"
import { Year } from "../../../core/sharedObjects/decades"

export const getMoviesByDecade =
    (firstYearOfDecade: Year) =>
    (pagination: paginationParamsT) =>
    (repo: MoviesRepoT) =>
        pipe(
            firstYearOfDecade,
            E.fromPredicate(
                DateBrand.is,
                () => `${firstYearOfDecade} is not a valid year numnber`
            ),
            E.map((decade) =>
                repo.findMany(
                    {
                        startDate: decade,
                        endDate: (decade + 10) as DateBrandType, //`if` DateBrand.is(2010) == true `then` DateBrand.is(2020) == true
                    },
                    pagination
                )
            )
        )
