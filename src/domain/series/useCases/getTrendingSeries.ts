import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { SeriesRepoT } from "../repos/series.repo"

export const getTrendingSeries =
    (repo: SeriesRepoT) =>
    (pagination: paginationParamsT) =>
    (type: "day" | "week") =>
        repo.findMany({ trendingType: type }, pagination)
