import { PornRepoT } from "../../../domain/porn/repos/prepo"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import { avapiCategories } from "./helpers/avapiCategories"
import { avapiSections } from "./helpers/avapiSections"
import { pipe } from "fp-ts/lib/function"
import axios from "axios"
import { getAllResponse } from "./decoders/avapiSchemas"
import { PVideoT } from "../../../domain/porn/entities/video"
import { PSectionT } from "../../../domain/porn/entities/section"
import { PCategoryT } from "../../../domain/porn/entities/category"
import avapiConfig from "../../../core/config/avapi.config"

const api = axios.create({
    headers: { "X-API-Key": avapiConfig.avApiKey, Accept: "application/json" },
})

const baseUrl = "https://adultvideosapi.com/api/"

export const AVAPIRepo: PornRepoT = {
    getCategories: () => TE.of(avapiCategories as unknown as PCategoryT[]),
    getSections: () => TE.of(avapiSections as unknown as PSectionT[]),
    getVideos: (section, category, page) =>
        pipe(
            TE.tryCatch(
                () =>
                    api.get(
                        baseUrl +
                            `videos/get-all?categories=${category.id}&sections=${section.name}`
                    ),
                () =>
                    `[Get Videos] Connections with AdultVideoAPI could not be established`
            ),
            TE.map((response) => response.data),
            TE.chain((data) =>
                pipe(
                    data,
                    getAllResponse.decode,
                    E.mapLeft(
                        () =>
                            `[Get Videos] Response was not in the expected format`
                    ),
                    TE.fromEither
                )
            ),
            TE.map((data) =>
                data.data.map(
                    (result) =>
                        ({
                            title: result.title,
                            duration: new Date((result.duration || 0) * 1000)
                                .toISOString()
                                .substring(14, 19),
                            url: result.embed_url,
                            thumbnail: result.default_thumb_url || "",
                        } satisfies PVideoT)
                )
            )
        ),
}
