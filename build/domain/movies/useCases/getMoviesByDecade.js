"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
