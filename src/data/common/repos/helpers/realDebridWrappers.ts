import axios from "axios"
import { pipe } from "fp-ts/function"
import { MagnetURIT } from "../../../../domain/common/entities/magnetURI"
import { addTorrentResponse, availablityT, getTorrentInfoResponse, unrestrictLinkResponse } from "./realDebridSchemas"
import * as TE from "fp-ts/TaskEither"
import * as TO from "fp-ts/TaskOption"
import * as E from "fp-ts/Either"
import realDebridApiKey from "../../../../core/config/debrid.config"
import parseTorrent from "parse-torrent"
const API_KEY = realDebridApiKey.realDebridApiKEY

const api = axios.create({
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "multipart/form-data",
    },
})

const BASE_URL = "https://api.real-debrid.com/rest/1.0"

/**
 *Wrapper for torrents/addMagnet endpoint
 *
 * @param {MagnetURIT} magnet
 */
export const addMagnet = (magnet: MagnetURIT) =>
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

/**
 *Wrapper for torrents/seletFiles/:id endpoint
 *
 * @param {MagnetURIT} magnet
 */
export const selectFile = (fileIdx: number) => (torrentId: string) =>
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

/**
 *Wrapper for torrents/info/:id endpoint
 *
 * @param {MagnetURIT} magnet
 */
export const getLink = (torrentId: string) =>
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

/**
 *Wrapper for unrestrict/link/ endpoint
 *
 * @param {MagnetURIT} magnet
 */
export const unrestrictLink = (link: string) =>
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

/**
 *Wrapper for torrents/instantAvailability endpoint
 *
 * @param {MagnetURIT} magnet
 */
export const instantAvailability = (magnet: MagnetURIT) =>
pipe(
    TO.tryCatch(
        () =>
            api.get(
                `${BASE_URL}/torrents/instantAvailability/${
                    parseTorrent(magnet).infoHash
                }`
            )
    ),
    TO.map((response) => response.data),
    TO.map(
        (data) => Object.keys(data[Object.keys(data)[0]]).length > 0 //real debrid :/
    )
)