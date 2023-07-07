import axios, { AxiosError } from "axios"
import { identity, pipe } from "fp-ts/function"
import config from "../../../../core/config/openSubtitles.config"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import * as A from "fp-ts/Array"
import {
    Language,
    LanguageT,
} from "../../../../domain/movies/entities/language"
import {
    SuccesfullDownloadResponse,
    succesfullSearchResponse,
    unsuccesfullResponse,
} from "./openSubtitleSchemas"
import { SubtitleT } from "../../../../domain/common/entities/subtitle"

//helpers
const convertToErrorString = (error: AxiosError) =>
    pipe(
        error.response?.data,
        unsuccesfullResponse.decode,
        E.match(
            () => "Response could not be recognized.",
            (data) => data.errors.reduce((p, c) => p + "\n" + c)
        )
    )

const OS_API_KEY = config.osApiKey

const api = axios.create({
    headers: {
        "Api-Key": OS_API_KEY,
    },
})

const baseUrl = "https://api.opensubtitles.com/api/v1/"
/**
 *Wrapper around /subtitles?imdb_id=:i&languages=:ln1,:ln2 endpoint
 *
 * @param {string} imdbId will be used as the imdb_id param ex. tt12345678
 * @param {LanguageT[]} languages will be used (combined) as the languages param ex. en,fr,de
 */
export const searchForSubtitle = (imdbId: string, languages: LanguageT[]) =>
    pipe(
        TE.tryCatch(
            () =>
                api.get(baseUrl + "subtitles", {
                    params: {
                        imdb_id: imdbId,
                        languages: languages
                            .map((lang) => lang.valueOf())
                            .reduce((p, c) => p + "," + c),
                    },
                }),
            identity
        ),
        TE.map((response) => response.data),
        TE.mapLeft((error) => convertToErrorString(error as AxiosError)),
        TE.chain((data) =>
            pipe(
                data,
                (d) => {
                    console.log(JSON.stringify(d, undefined, 2))
                    return d
                },
                succesfullSearchResponse.decode,
                E.mapLeft(
                    () =>
                        "[Search for subtitle] Response was recieved, but not in the expected format"
                ),
                TE.fromEither
            )
        ),
        TE.map((data) =>
            pipe(
                data.data,
                A.map(
                    (data) =>
                        ({
                            id: Number(data.id),
                            fps: data.attributes.fps || 0,
                            language: pipe(
                                data.attributes.language,
                                Language.decode,
                                E.getOrElseW(() => null)
                            ),
                        } satisfies SubtitleT)
                )
            )
        )
    )

export const downloadSubtitle = (subtitleiId: number) =>
    pipe(
        TE.tryCatch(
            () =>
                api.post(baseUrl + "donwload", {
                    data: {
                        file_id: subtitleiId,
                    },
                }),
            identity
        ),
        TE.mapLeft((error) => convertToErrorString(error as AxiosError)),
        TE.map((response) => response.data),
        TE.chain((data) =>
            pipe(
                data,
                SuccesfullDownloadResponse.decode,
                E.mapLeft(
                    () =>
                        "[Download subtitle] Response was recieved, but not in the expected format"
                ),
                TE.fromEither
            )
        ),
        TE.map((data) => ({ link: data.link, isVtt: false }))
    )
