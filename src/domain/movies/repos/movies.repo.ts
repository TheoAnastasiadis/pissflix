import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as t from "io-ts"

import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { MovieT } from "../entities/movie"
import { GenreT } from "../entities/genre"
import { LanguageT } from "../entities/language"
import { DateBrandType } from "../entities/date"

type MovieParamsT = {
    genre?: GenreT | Array<GenreT>
    startDate?: Date
    endDate?: Date
    language?: LanguageT | Array<LanguageT>
    trendingType?: "day" | "week"
    query?: string
}

type MoviesRepoT = {
    findOne(id: number): TE.TaskEither<string, MovieT>
    findMany(
        params: MovieParamsT,
        pagination: paginationParamsT
    ): TE.TaskEither<string, Array<MovieT>>
    getGenres(): O.Option<Array<GenreT>>
}

export { MoviesRepoT, MovieParamsT }
