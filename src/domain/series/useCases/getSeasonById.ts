import { SeriesRepoT } from "../repos/series.repo"

export const getSeasonById =
    (repo: SeriesRepoT) => (seriesId: number) => (seasonId: number) =>
        repo.findSeason(seriesId)(seasonId)
