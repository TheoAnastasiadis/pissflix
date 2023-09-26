import {
    anything,
    mock,
    when,
    instance,
    deepEqual,
    anyString,
} from "ts-mockito"
import { MoviesRepoT } from "../../../../src/domain/movies/repos/movies.repo"
import * as TE from "fp-ts/TaskEither"
import * as TO from "fp-ts/TaskOption"
import * as O from "fp-ts/Option"
import { exampleMovie } from "../../../domain/movies/useCases/testObjects"
import { TorrentRepo } from "../../../../src/domain/common/repos/torrent.repo"
import { tmdbGenres } from "../../../../src/data/movies/repos/helpers/tmdbGenres"
import { DebridProviderRepo } from "../../../../src/domain/common/repos/debridProvider.repo"
import { MovieContext } from "../../../../src/domain/movies/controllers/context"
import { movieMatchers } from "../../../../src/domain/movies/controllers/matchers"
import { SubtitleRepo } from "../../../../src/domain/common/repos/subtitle.repo"
import { SubtitleT } from "../../../../src/domain/common/entities/subtitle"
import { LanguageT } from "../../../../src/domain/movies/entities/language"

//movies repo
const mockedMoviesRepo = mock<MoviesRepoT>()
when(
    mockedMoviesRepo.findMany(anything(), deepEqual({ page: 0, limit: 5 }))
).thenReturn(TE.right(Array(5).fill(exampleMovie))) //for simple page results
when(
    mockedMoviesRepo.findMany(anything(), deepEqual({ page: 0, limit: 20 }))
).thenReturn(TE.right(Array(20).fill(exampleMovie))) //for panel results
when(
    mockedMoviesRepo.findMany(anything(), deepEqual({ page: 0, limit: 11 }))
).thenReturn(TE.right(Array(11).fill(exampleMovie))) //for search page results
when(mockedMoviesRepo.findOne(anything())).thenReturn(TE.right(exampleMovie))
when(mockedMoviesRepo.getGenres()).thenReturn(O.some(tmdbGenres))
const mockedMoviesRepoInstance = instance(mockedMoviesRepo)

//torrent repo
const mockedTorrentRepo = mock<TorrentRepo>()
when(mockedTorrentRepo.getTorrentsByImdbId(anyString())).thenReturn(
    TE.right([
        ...Array(5).fill({
            title: "",
            magnetURI: "",
            fileIdx: 0,
            size: 1024,
            seeders: 112,
            resolution: "4K",
        }),
        ...Array(5).fill({
            title: "",
            magnetURI: "",
            fileIdx: 0,
            size: 1024,
            seeders: 112,
            resolution: "8K",
        }),
    ])
)
const mockedTorrentRepoInstance = instance(mockedTorrentRepo)

//debrid repo
const mockedDebridRepo = mock<DebridProviderRepo>()
when(mockedDebridRepo.getStreamingLink(anything())).thenReturn(() =>
    TE.right("https://www.example.com/streamingLink.mp4")
)
when(mockedDebridRepo.checkIfAvailable(anyString())).thenReturn(TO.some(true))
const mockedDebridRepoInstance = instance(mockedDebridRepo)

//subtitles repo
const mockedSubtitleRepo = mock<SubtitleRepo>()
when(mockedSubtitleRepo.findByImdbId(anything())).thenReturn(() =>
    TE.right([
        { id: 0, language: "fr" as LanguageT, fps: 0 } satisfies SubtitleT,
    ])
)
const mockedSubtitleRepoInstance = instance(mockedSubtitleRepo)

export const mockedContext: MovieContext = {
    moviesRepo: mockedMoviesRepoInstance,
    torrentRepo: mockedTorrentRepoInstance,
    debridRepo: mockedDebridRepoInstance,
    subtitlesRepo: mockedSubtitleRepoInstance,
    matchers: movieMatchers,
}
