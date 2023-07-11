import { SeriesRepoT } from "../repos/series.repo"

export const getEpisodeById = (repo: SeriesRepoT) => (id: number) =>
    repo.findEpisode(id)
