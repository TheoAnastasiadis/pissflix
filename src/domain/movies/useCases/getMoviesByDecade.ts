import { pipe } from "fp-ts/lib/function"
import { MoviesRepoT } from "../repos/movies.repo"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import moment from "moment"

export const getMoviesByDecade =
    (repo: MoviesRepoT) =>
    (pagination: paginationParamsT) =>
    (firstYearOfDecade: number) =>
        pipe(
            Math.round(moment(firstYearOfDecade).year() / 10) * 10, //1963 -> 196.3 -> 196 -> 1960
            (year) =>
                repo.findMany(
                    {
                        startDate: moment(year).unix(),
                        endDate: moment(year + 10).unix(),
                    },
                    pagination
                )
        )
