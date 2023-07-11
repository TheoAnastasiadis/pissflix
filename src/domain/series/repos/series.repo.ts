import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import { SeriesGenresT } from "../entities/seriesGenres"
import { SeriesT } from "../entities/series"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"

export type SeriesParamsT = {
    genre?: SeriesGenresT | Array<SeriesGenresT>
    trendingType?: "day" | "week"
    query?: string
}

export type SerierRepoT = {
    findOne: (id: number) => TE.TaskEither<string, SeriesT>
    findMany: (
        params: SeriesParamsT,
        pagination: paginationParamsT
    ) => TE.TaskEither<string, Array<SeriesT>>
    getGenres(): O.Option<Array<SeriesGenresT>>
}
