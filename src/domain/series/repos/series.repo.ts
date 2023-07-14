import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import { SeriesGenresT } from "../entities/seriesGenres"
import { SeriesT } from "../entities/series"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { SeasonT } from "../entities/season"
import { EpisodeT } from "../entities/episode"

export type SeriesParamsT = {
    genre?: SeriesGenresT | Array<SeriesGenresT>
    trendingType?: "day" | "week"
    query?: string
}

export type SeriesRepoT = {
    findSeries: (id: number) => TE.TaskEither<string, SeriesT>
    findSeason: (
        seriesId: number
    ) => (seasonId: number) => TE.TaskEither<string, SeasonT>
    findEpisode: (
        seriesId: number
    ) => (
        seasonId: number
    ) => (episodeId: number) => TE.TaskEither<string, EpisodeT>
    findMany: (
        params: SeriesParamsT,
        pagination: paginationParamsT
    ) => TE.TaskEither<string, Array<SeriesT>>
    getGenres(): O.Option<Array<SeriesGenresT>>
}
