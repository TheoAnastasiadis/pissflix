import { pipe } from "fp-ts/lib/function"
import { MoviesRepoT } from "../repos/movies.repo"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import * as E from "fp-ts/Either"
import { DateBrand, DateBrandType } from "../entities/date"

// export const getMoviesByDecade =
//     (firstYearOfDecade: number) =>
//     (pagination: paginationParamsT) =>
//     (repo: MoviesRepoT) =>
//         pipe(
//             firstYearOfDecade,
//             E.fromPredicate(
//                 DateBrand.is,
//                 () => `${firstYearOfDecade} is not a valid year numnber`
//             ),
//             E.map((decade) =>
//                 repo.findMany(
//                     {
//                         startDate: Date.parse(decade),
//                         endDate: Date(decade + 10),
//                     },
//                     pagination
//                 )
//             )
//         )
