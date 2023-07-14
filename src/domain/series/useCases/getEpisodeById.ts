import { SeriesRepoT } from "../repos/series.repo"

export const getEpisodeById =
    (repo: SeriesRepoT) =>
    (seriesId: number) =>
    (seasonId: number) =>
    (episodeId: number) =>
        repo.findEpisode(seriesId)(seasonId)(episodeId)
