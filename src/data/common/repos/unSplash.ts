import { pipe } from "fp-ts/function"
import unsplashConfig from "../../../core/config/unsplash.config"
import { PhotosRepoT } from "../../../domain/common/repos/photos.repo"
import { createApi } from "unsplash-js"
import * as TE from "fp-ts/TaskEither"
const serverApi = createApi({
    accessKey: unsplashConfig.usplashApiKey as string,
})

export const UnsplashRepo: PhotosRepoT = {
    search: (query) =>
        pipe(
            TE.fromTask(() =>
                serverApi.search.getPhotos({ query, page: 1, perPage: 20 })
            ),
            TE.chain((response) =>
                typeof response.response === "undefined"
                    ? TE.left(response.errors)
                    : TE.right(response)
            ),
            TE.map((photos) =>
                photos.response?.results.map((v) => v.urls.regular)
            ),
            TE.mapLeft((errors) => errors.join("\n"))
        ),
}
