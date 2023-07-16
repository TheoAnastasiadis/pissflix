import { Response } from "../../../core/sharedObjects/controller"
import { MovieContext } from "../../../domain/movies/controllers/context"
import { streamParams } from "../../../domain/movies/controllers/params"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import { getStreamingLink } from "../../../domain/common/useCases/getStreamingLink"
import applicationConfig from "../../../core/config/app.config"
import { SubtitleT } from "../../../domain/common/entities/subtitle"
import { pipe } from "fp-ts/lib/function"
import { MsxServerResponse } from "../../../core/msxUI/response"
import { getSubtitles } from "../../../domain/common/useCases/getSubtitles"
import { LanguageT } from "../../../domain/movies/entities/language"

//helpers
const parseSubtitles = (subtitles: SubtitleT[]) =>
    Object.fromEntries(
        subtitles.map((sub) => [
            `torrent:subtitle:${sub.language}:${sub.id}`,
            `${applicationConfig.externalURL}/msx/subtitle?id=${sub.id}`,
        ])
    )
const streamRegex =
    /^https:\/\/\d{2}\.stream\.real-debrid\.com\/t\/(\S*)\d{2}\/.*\.mpd$/
const replacePattern = "https://app.real-debrid.com/rest/1.0/streaming/ping/$1/"

export const streamResponse: Response<
    MovieContext,
    t.TypeOf<typeof streamParams>
> = {
    _tag: "response",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("link", () =>
                getStreamingLink(context.debridRepo)(Number(params.fileIdx))(
                    params.magnet
                )
            ),
            TE.bind(
                "subtitles",
                () =>
                    getSubtitles(context.subtitlesRepo)([
                        "en" as LanguageT,
                        "el" as LanguageT,
                    ])(params.episodeImdbId || params.imdbId) //check for specific episode and use general id as fallback
            ),
            TE.map(
                ({ link, subtitles }) =>
                    ({
                        response: {
                            status: 200,
                            text: params.title,
                            data: {
                                action: `video:plugin:${applicationConfig.externalURL}/plugin`,
                                data: {
                                    playerLabel: params.title,
                                    properties: {
                                        "torrent:fallbackUrl": link,
                                        "torrent:rdPingUrl": link.replace(
                                            streamRegex,
                                            replacePattern
                                        ),
                                        ...parseSubtitles(subtitles),
                                        "button:content:icon": "settings",
                                        "button:content:action":
                                            "panel:request:player:options",
                                    },
                                },
                            },
                        },
                    } satisfies MsxServerResponse)
            )
        ),
}
