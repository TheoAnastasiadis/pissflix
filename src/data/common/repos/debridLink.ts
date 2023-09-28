import * as TE from "fp-ts/TaskEither"
import * as TO from "fp-ts/TaskOption"
import * as E from "fp-ts/Either"
import config from "../../../core/config/debrid.config"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import axios from "axios"
import { pipe } from "fp-ts/lib/function"
import {
    addTorrentResponse,
    cachedTorrentResponse,
    createTranscodeResponse,
} from "./decoders/debridLink.schemas"

const api = axios.create({
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${config.debridLinkApiKey}`,
        "Content-Type": "application/json",
    },
})

const BASE_URL = "https://debrid-link.com/api/v2"

export const DebridLinkRepo: DebridProviderRepo = {
    getStreamingLink: (magnet: string) => (fileIdx: number) =>
        pipe(
            TE.tryCatch(
                () =>
                    api.post(`${BASE_URL}/seedbox/add`, {
                        url: magnet,
                    }),
                () =>
                    `[ADD TORRENT] Connection with Debrid Link could not be established`
            ),
            TE.map((reponse) => reponse.data),
            TE.chain((data) =>
                pipe(
                    data,
                    addTorrentResponse.decode,
                    E.mapLeft(
                        () =>
                            `[ADD TORRENT] Response was recieved but not in the expected format`
                    ),
                    TE.fromEither
                )
            ),
            TE.map((response) => response.value.files[fileIdx].id),
            TE.chain(
                TE.fromPredicate(
                    (id) => typeof id === "string",
                    () =>
                        `[ADD TORRENT] File id ${fileIdx} not in torrent filelist`
                )
            ),
            TE.chain((id) =>
                TE.tryCatch(
                    () => api.post(`${BASE_URL}/stream/transcode/add`, { id }),
                    () =>
                        `[CREATE STREAMING LINK] Connection with Debrid Link could not be established`
                )
            ),
            TE.map((response) => response.data),
            TE.chain((data) =>
                pipe(
                    data,
                    createTranscodeResponse.decode,
                    E.mapLeft(
                        () =>
                            `[CREATE STREAMING LINK] Response was recieved but not in the expected format`
                    ),
                    TE.fromEither
                )
            ),
            TE.map((data) => data.value.streamUrl)
        ),
    checkIfAvailable: (magnet: string) => (fileIdx: number) =>
        pipe(
            TO.tryCatch(() =>
                api.get(`${BASE_URL}/seedbox/cached?url=${magnet}`)
            ),
            TO.map((response) => response.data),
            TO.chain((response) =>
                pipe(response, cachedTorrentResponse.decode, TO.fromEither)
            ),
            TO.chain(TO.fromPredicate((data) => data.success === true)),
            TO.map((data) => Object.keys(data.value).length > 0)
        ),
}
