import { DebridProviderRepo } from "../../../../src/domain/common/repos/debridProvider.repo"
import { PornContext } from "../../../../src/domain/porn/controllers/context"
import { anyString, anything, instance, mock, when } from "ts-mockito"
import * as TE from "fp-ts/TaskEither"
import * as TO from "fp-ts/TaskOption"
import { PhotosRepoT } from "../../../../src/domain/common/repos/photos.repo"
import { pornMatchers } from "../../../../src/domain/porn/controllers/matchers"
import { PornRepoT } from "../../../../src/domain/porn/repos/prepo"
import { PVideoT } from "../../../../src/domain/porn/entities/video"
import { PCategoryT } from "../../../../src/domain/porn/entities/category"
import { PSectionT } from "../../../../src/domain/porn/entities/section"

//p*rn repo
const mockPRepo = mock<PornRepoT>()
when(mockPRepo.getVideos).thenReturn(() =>
    TE.right(
        Array(10).fill({
            title: "",
            thumbnail: "",
            duration: "",
            url: "",
        } satisfies PVideoT)
    )
)
when(mockPRepo.getCategories).thenReturn(() =>
    TE.right(
        Array(20).fill({
            id: 1,
            name: "category",
        } satisfies PCategoryT)
    )
)
when(mockPRepo.getSections).thenReturn(() =>
    TE.right(
        Array(5).fill({
            name: "section",
        } satisfies PSectionT)
    )
)

//debrid repo
const mockedDebridRepo = mock<DebridProviderRepo>()
when(mockedDebridRepo.getStreamingLink(anything())).thenReturn(() =>
    TE.right("https://www.example.com/streamingLink.mp4")
)
when(mockedDebridRepo.checkIfAvailable(anyString())).thenReturn(TO.some(true))

//photos repo
const mockPhotosRepo = mock<PhotosRepoT>()
when(mockPhotosRepo.search(anyString())).thenReturn(
    TE.right(Array(20).fill("https://www.example.com/photo.jpg"))
)

export const mockPContext: PornContext = {
    pornRepo: instance(mockPRepo),
    debridRepo: instance(mockedDebridRepo),
    matchers: pornMatchers,
    photosRepo: instance(mockPhotosRepo),
}
