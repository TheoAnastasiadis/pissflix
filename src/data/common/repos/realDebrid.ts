import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import axios from "axios"
import realDebridApiKey from "../../../core/config/debrid.config"

import {
    addTorrentResponse,
    availablityT,
    getTorrentInfoResponse,
    unrestrictLinkResponse,
} from "./helpers/realDebridSchemas"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { MagnetURIT } from "../../../domain/common/entities/magnetURI"
import parseTorrent from "parse-torrent"
const API_KEY = realDebridApiKey.realDebridApiKEY

const api = axios.create({
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "multipart/form-data",
    },
})

const BASE_URL = "https://api.real-debrid.com/rest/1.0"

const addMagnet = (magnet: MagnetURIT) =>
    pipe(
        TE.tryCatch(
            () => api.post(`${BASE_URL}/torrents/addMagnet`, { magnet }),
            (reason) =>
                `[ADD MAGNET] Connection with Real Debrid could not be established.\n${JSON.stringify(
                    reason,
                    undefined,
                    2
                )}`
        ),
        TE.map((reponse) => reponse.data),
        TE.chain((data) =>
            pipe(
                data,
                addTorrentResponse.decode,
                E.map((response) => response.id),
                E.mapLeft(
                    () =>
                        `[ADD MAGNET] Response was recieved but was not in the expected format`
                ),
                TE.fromEither
            )
        )
    )

const selectFile = (fileIdx: number) => (torrentId: string) =>
    pipe(
        TE.tryCatch(
            () =>
                api.post(`${BASE_URL}/torrents/selectFiles/${torrentId}`, {
                    files: String(fileIdx + 1), //realdebrid uses 1-indexing
                }),
            () =>
                `[SELECT FILE] Connection with Real Debrid could not be established`
        )
    )

const getLink = (torrentId: string) =>
    pipe(
        TE.tryCatch(
            () => api.get(`${BASE_URL}/torrents/info/${torrentId}`),
            () =>
                `[GET LINK] Connection with Real Debrid could not be established`
        ),
        TE.map((reponse) => reponse.data),
        TE.chain((data) =>
            pipe(
                data,
                getTorrentInfoResponse.decode,
                E.map((response) => response.links[0]), //it will be the first link since we have only selected one file
                E.mapLeft(
                    () =>
                        `[GET LINK] Response was recieved but was not in the expected format`
                ),
                TE.fromEither
            )
        )
    )

const unrestrictLink = (link: string) =>
    pipe(
        TE.tryCatch(
            () => api.post(`${BASE_URL}/unrestrict/link/`, { link }),
            () =>
                `[UNRESTRICT LINK] Connection with Real Debrid could not be established`
        ),
        TE.map((reponse) => reponse.data),
        TE.chain((data) =>
            pipe(
                data,
                unrestrictLinkResponse.decode,
                E.map((response) => response.download),
                E.mapLeft(
                    () =>
                        `[UNRESTRICT LINK] Response was recieved but was not in the expected format`
                ),
                TE.fromEither
            )
        )
    )

export const RealDebridRepo: DebridProviderRepo = {
    getStreamingLink: (magnet) => (fileIdx) =>
        pipe(
            TE.of(magnet),
            TE.chain(addMagnet),
            TE.chainFirst(selectFile(fileIdx)),
            TE.chain(getLink),
            TE.chain(unrestrictLink)
        ),
    checkIfAvailable: (magnet: MagnetURIT) =>
        pipe(
            TE.tryCatch(
                () =>
                    api.get(
                        `${BASE_URL}/torrents/instantAvailability/${
                            parseTorrent(magnet).infoHash
                        }`
                    ),
                () => `[CHECK AVAILABILITY] Connection could not be established`
            ),
            TE.map((response) => response.data),
            TE.chain(
                TE.fromPredicate(
                    (data) =>
                        Object.keys(
                            (data as availablityT)[
                                parseTorrent(magnet).infoHash as string
                            ]
                        ).length > 0, //Don't ask me, ask Real Debrid???
                    () => `Torrent not available`
                )
            ),
            TE.getOrElse(() => () => Promise.reject()),
            (task) => task() //I need to return a regular ol' promise so I can call Promise.any on the view renderer.
        ),
}
