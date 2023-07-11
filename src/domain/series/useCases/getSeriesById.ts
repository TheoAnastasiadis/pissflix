import { SeriesRepoT } from "../repos/series.repo"

export const getSeriesById = (repo: SeriesRepoT) => (id: number) =>
    repo.findSeries(id)
