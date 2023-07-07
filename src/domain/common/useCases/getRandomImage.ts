import { pipe } from "fp-ts/lib/function"
import { PhotosRepoT } from "../repos/photos.repo"
import * as TE from "fp-ts/TaskEither"
export const getRandomImage = (query: string) => (repo: PhotosRepoT) =>
    pipe(
        repo.search(query),
        TE.map((photos) => photos.at(Math.random() * photos.length) as string),
        TE.mapLeft(
            () =>
                "https://images.unsplash.com/photo-1578589315522-9e5521b9c158?q=10"
        ) //fallback pic
    )
