import { Controller } from "../../../core/sharedObjects/controller"
import { SeriesContext } from "../../../domain/series/controllers/context"
import * as t from "io-ts"
import { seasonParams } from "../../../domain/series/controllers/params"
import { pipe } from "fp-ts/function"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as R from "fp-ts-routing"
import appConfig from "../../../core/config/app.config"
import { getSeasonById } from "../../../domain/series/useCases/getSeasonById"
import { getEpisodeById } from "../../../domain/series/useCases/getEpisodeById"
import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"

const baseUrl = appConfig.externalURL

export const seasonView: Controller<
    SeriesContext,
    t.TypeOf<typeof seasonParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("season", () =>
                pipe(
                    params.id,
                    (id) => Number(id),
                    getSeasonById(context.seriesRepo)(Number(params.series))
                )
            ),
            TE.bind("episodes", ({ season }) =>
                pipe(
                    season.episodes,
                    A.map(
                        getEpisodeById(context.seriesRepo)(
                            Number(params.series)
                        )(season.id)
                    ),
                    A.sequence(TE.ApplicativePar)
                )
            ),
            TE.map(
                ({ season, episodes }) =>
                    ({
                        headline: "Season " + season.id,
                        flag: "_overlay",
                        overlay: {
                            items: [
                                {
                                    type: "space",
                                    id: "description",
                                    layout: "0,0,8,1",
                                    text: "",
                                },
                            ],
                        },
                        template: {
                            type: "default",
                            layout: "0,0,8,1",
                            area: "0,1,8,4",
                        },
                        items: [
                            ...episodes.map(
                                (episode, i) =>
                                    ({
                                        title: `S${season.id}E${i} ${episode.title}`,
                                        selection: {
                                            important: true,
                                            action: `update:content:overlay:description`,
                                            data: {
                                                type: "space",
                                                id: "description",
                                                layout: "0,0,8,1",
                                                text: `{txt:white:Overview:} ${episode.overview}`,
                                            },
                                        },
                                        action: `content:${baseUrl}${context.movieMatchers.watch.formatter.run(
                                            R.Route.empty,
                                            {
                                                imdbId: `${episode.episode_imdbId}`,
                                                player: "remote",
                                                title: `S${season.id}E${i} ${episode.title}`,
                                            }
                                        )}`,
                                    } satisfies MsxContentItem)
                            ),
                        ],
                    } satisfies MsxContentRoot)
            )
        ),
}
