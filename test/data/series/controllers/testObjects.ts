import {
    anything,
    mock,
    when,
    instance,
    deepEqual,
    anyString,
    anyNumber,
} from "ts-mockito"
import { SeriesContext } from "../../../../src/domain/series/controllers/context"
import { SeriesRepoT } from "../../../../src/domain/series/repos/series.repo"
import * as TE from "fp-ts/TaskEither"
import * as O from "fp-ts/Option"
import { seriesMatchers } from "../../../../src/domain/series/controllers/matchers"
import { movieMatchers } from "../../../../src/domain/movies/controllers/matchers"
import { EpisodeT } from "../../../../src/domain/series/entities/episode"
import { SeasonT } from "../../../../src/domain/series/entities/season"
import { SeriesT } from "../../../../src/domain/series/entities/series"
import { tmdbSeriesGenres } from "../../../../src/data/series/repos/helpers/tmdbGenres"
import { SeriesGenresT } from "../../../../src/domain/series/entities/seriesGenres"
import { PhotosRepoT } from "../../../../src/domain/common/repos/photos.repo"

const mockEpisode: EpisodeT = {
    id: 0,
    title: "",
    episode_imdbId: "",
    order: "0",
    background: { economicQuality: "", bestQuality: "" },
    poster: { economicQuality: "", bestQuality: "" },
    overview: "",
}

const mockSeason: SeasonT = {
    id: 0,
    season_imdbId: null,
    order: "",
    background: { economicQuality: "", bestQuality: "" },
    poster: { economicQuality: "", bestQuality: "" },
    episodes: [1, 2, 3, 4],
}

const mockSeries: SeriesT = {
    id: 0,
    title: "",
    background: { economicQuality: "", bestQuality: "" },
    poster: { economicQuality: "", bestQuality: "" },
    genres: [],
    overview: "",
    series_imdbId: null,
    seasons: [1, 2, 3, 4],
}

const mockSeriesRepo = mock<SeriesRepoT>()
when(mockSeriesRepo.findEpisode(anyNumber())).thenReturn(
    () => () => TE.right(mockEpisode)
)
when(mockSeriesRepo.findSeason(anyNumber())).thenReturn(() =>
    TE.right(mockSeason)
)
when(mockSeriesRepo.findSeries(anyNumber())).thenReturn(TE.right(mockSeries))
when(
    mockSeriesRepo.findMany(anything(), deepEqual({ page: 0, limit: 6 }))
).thenReturn(TE.right(Array(6).fill(mockSeries)))
when(
    mockSeriesRepo.findMany(anything(), deepEqual({ page: 0, limit: 11 }))
).thenReturn(TE.right(Array(11).fill(mockSeries)))
when(
    mockSeriesRepo.findMany(anything(), deepEqual({ page: 0, limit: 20 }))
).thenReturn(TE.right(Array(20).fill(mockSeries)))
when(mockSeriesRepo.getGenres()).thenReturn(
    O.of(tmdbSeriesGenres as SeriesGenresT[])
)

const mockPhotosRepo = mock<PhotosRepoT>()
when(mockPhotosRepo.search(anyString())).thenReturn(
    TE.right(Array(20).fill("url"))
)

export const mockSeriesContext: SeriesContext = {
    seriesRepo: instance(mockSeriesRepo),
    matchers: seriesMatchers,
    movieMatchers: movieMatchers,
    photosRepo: instance(mockPhotosRepo),
}
