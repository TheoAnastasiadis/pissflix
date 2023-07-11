import { SeriesRepoT } from "../repos/series.repo"

export const getSeasonById = (repo: SeriesRepoT) => (id: number) =>
    repo.findSeason(id)
