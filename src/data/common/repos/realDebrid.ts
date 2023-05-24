import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import * as t from "io-ts"
import axios from "axios"
import realDebridApiKey from '../../../core/config/debrid.config'

import {
    addTorrentResponse,
    getTorrentInfoResponse,
    unrestrictLinkResponse,
} from "./helpers/realDebridSchemas"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { MagnetURI } from "../../../domain/common/entities/magnetURI"

const API_KEY = realDebridApiKey.realDebridApiKEY

const api = axios.create({
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const BASE_URL = "https://api.real-debrid.com/rest/1.0/"

const addMagnet = (magnet: MagnetURI) =>
    pipe(
        TE.tryCatch(
            () => api.post(`${BASE_URL}/torrents/addMagnet`, { magnet }),
            () => `Connection with Real Debrid could not be established`
        ),
        TE.map((reponse) => reponse.data),
        TE.chain((data) =>
            pipe(
                data,
                addTorrentResponse.decode,
                E.map((response) => response.id),
                E.mapLeft(
                    () =>
                        `Response was recieved but was not in the expected format`
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
                    files: String(fileIdx),
                }),
            () => `Connection with Real Debrid could not be established`
        )
    )

const getLink = (torrentId: string) =>
    pipe(
        TE.tryCatch(
            () => api.get(`${BASE_URL}/torrents/info/${torrentId}`),
            () => `Connection with Real Debrid could not be established`
        ),
        TE.map((reponse) => reponse.data),
        TE.chain((data) =>
            pipe(
                data,
                getTorrentInfoResponse.decode,
                E.map((response) => response.links[0]), //it will be the first link since we have only selected one file
                E.mapLeft(
                    () =>
                        `Response was recieved but was not in the expected format`
                ),
                TE.fromEither
            )
        )
    )

const unrestrictLink = (link: string) =>
    pipe(
        TE.tryCatch(
            () => api.post(`${BASE_URL}/unrestrict/link/`, { link }),
            () => `Connection with Real Debrid could not be established`
        ),
        TE.map((reponse) => reponse.data),
        TE.chain((data) =>
            pipe(
                data,
                unrestrictLinkResponse.decode,
                E.map((response) => response.download),
                E.mapLeft(
                    () =>
                        `Response was recieved but was not in the expected format`
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
        )
}
        