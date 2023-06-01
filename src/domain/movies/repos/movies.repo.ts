import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"

import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { MovieT } from "../entities/movie"
import { GenreT } from "../entities/genre"
import { LanguageT } from "../entities/language"

export type MovieParamsT = {
    genre?: GenreT | Array<GenreT>
    startDate?: number
    endDate?: number
    language?: LanguageT | Array<LanguageT>
    trendingType?: "day" | "week"
    query?: string
}

export type MoviesRepoT = {
    findOne: (id: number) => TE.TaskEither<string, MovieT>
    findMany: (
        params: MovieParamsT,
        pagination: paginationParamsT
    ) => TE.TaskEither<string, Array<MovieT>>
    getGenres(): O.Option<Array<GenreT>>
}
