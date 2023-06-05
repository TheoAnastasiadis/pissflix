import { mock, when, instance } from "ts-mockito"
import * as TE from "fp-ts/TaskEither"
import * as TO from "fp-ts/TaskOption"
import { TorrentRepo } from "../../../../src/domain/common/repos/torrent.repo"
import { DebridProviderRepo } from "../../../../src/domain/common/repos/debridProvider.repo"
import * as dotenv from "dotenv"
import { TorrentT } from "../../../../src/domain/common/entities/torrent"
dotenv.config()

//torrent repo
const mockedTorrentRepo = mock<TorrentRepo>()
when(mockedTorrentRepo.getTorrentsByImdbId("tt1234")).thenReturn(
    TE.right([
        ...Array(5).fill({
            title: process.env.EXAMPLE_MAGNET_URI,
            magnetURI: "First Title",
            fileIdx: 0,
            size: 1024,
            seeders: 112,
            resolution: "4K",
        }),
        ...Array(5).fill({
            title: "Second Title",
            magnetURI: process.env.EXAMPLE_MAGNET_URI,
            fileIdx: 0,
            size: 1024,
            seeders: 112,
            resolution: "8K",
        }),
    ])
)
when(mockedTorrentRepo.getTorrentsByImdbId("tt5678")).thenReturn(TE.right([]))
export const mockedTorrentRepoInstance = instance(mockedTorrentRepo)

//debrid repo
export const goodTorrent: TorrentT = {
    title: "good",
    magnetURI: "magnet:?good",
    fileIdx: 0,
    size: 0,
    seeders: 0,
    resolution: "SD",
    imdbId: "",
}
export const badTorrent: TorrentT = {
    title: "bad",
    magnetURI: "magnet:?bad",
    fileIdx: 1,
    size: 0,
    seeders: 0,
    resolution: "SD",
    imdbId: "",
}
const mockedDebridRepo = mock<DebridProviderRepo>()
when(mockedDebridRepo.getStreamingLink(goodTorrent.magnetURI)).thenReturn(
    () =>
        TE.right("https://www.example.com/streamingLink.mp4") as TE.TaskEither<
            string,
            string
        >
)
when(mockedDebridRepo.getStreamingLink(badTorrent.magnetURI)).thenReturn(() =>
    TE.left("")
)
when(mockedDebridRepo.checkIfAvailable("abc")).thenReturn(TO.some(true))
when(mockedDebridRepo.checkIfAvailable("def")).thenReturn(TO.some(false))
export const mockedDebridRepoInstance = instance(mockedDebridRepo)
