import { pipe } from "fp-ts/lib/function"
import { PhotosRepoT } from "../../../domain/common/repos/photos.repo"
import * as TE from "fp-ts/TaskEither"
import axios from "axios"
import * as cheerio from "cheerio"

const baseUrl = "https://www.pornpics.com/?q="

export const PPicsRepo: PhotosRepoT = {
    search: (query) =>
        pipe(
            TE.tryCatch(
                () => axios.get(baseUrl + query),
                () =>
                    `[Search] Connection with Porn Pics could not be established.`
            ),
            TE.map((response) => response.data),
            TE.map((html) => cheerio.load(html)),
            TE.map(($) =>
                [...$("#tiles > li > a > img")].map(
                    (el) => el.attribs["data-src"]
                )
            )
        ),
}
