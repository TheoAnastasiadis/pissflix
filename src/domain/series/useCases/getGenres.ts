import { SeriesRepoT } from "../repos/series.repo"

export const getGenres = (repo: SeriesRepoT) => repo.getGenres()
