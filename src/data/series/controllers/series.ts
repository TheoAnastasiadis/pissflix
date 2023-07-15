import { Controller } from "../../../core/sharedObjects/controller"
import { SeriesContext } from "../../../domain/series/controllers/context"
import * as t from "io-ts"
import { seriesParams } from "../../../domain/series/controllers/params"
import { pipe } from "fp-ts/lib/function"
import { getSeriesById } from "../../../domain/series/useCases/getSeriesById"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"
import * as A from "fp-ts/Array"
import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"
import appConfig from "../../../core/config/app.config"
import { getSeasonById } from "../../../domain/series/useCases/getSeasonById"

const baseUrl = appConfig.externalURL

export const seriesView: Controller<
    SeriesContext,
    t.TypeOf<typeof seriesParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("series", () =>
                pipe(
                    params.id,
                    (id) => Number(id),
                    getSeriesById(context.seriesRepo)
                )
            ),
            TE.bind("seasons", ({ series }) =>
                pipe(
                    series.seasons,
                    A.map(getSeasonById(context.seriesRepo)(series.id)),
                    A.sequence(TE.ApplicativePar)
                )
            ),
            TE.map(
                ({ series, seasons }) =>
                    ({
                        type: "list",
                        headline: series.title,
                        background: series.background.bestQuality,
                        template: {
                            type: "teaser",
                            layout: "0,0,3,4",
                            imageFiller: "cover",
                        },
                        header: {
                            items: [
                                {
                                    type: "space",
                                    title: series.title,
                                    titleFooter: series.overview,
                                    layout: "0,0,7,2",
                                    offset: "0,0.5,0,0",
                                },
                                {
                                    type: "control",
                                    extensionIcon: "play-circle",
                                    label: "Play",
                                    action: "focus:index:0",
                                    layout: "0,4,3,1",
                                    offset: "0,-1,0,0",
                                },
                                {
                                    type: "space",
                                    image: series.poster.bestQuality,
                                    layout: "8,0,4,5",
                                    offset: "0,0,-0.4,-0.5",
                                },
                            ],
                        },
                        items: [
                            ...seasons.map(
                                (season, i) =>
                                    ({
                                        title: `Season ${i}`,
                                        titleFooter: `${season.episodes.length} Episodes`,
                                        image: season.poster.bestQuality,
                                        action: `panel:${baseUrl}${context.matchers.season.formatter.run(
                                            R.Route.empty,
                                            {
                                                series: String(series.id),
                                                id: String(i),
                                            }
                                        )}`,
                                    } satisfies MsxContentItem)
                            ),
                        ],
                    } satisfies MsxContentRoot)
            )
        ),
}
