import { getTrendingSeries } from "../../../domain/series/useCases/getTrendingSeries"
import * as TE from "fp-ts/TaskEither"
import { pipe } from "fp-ts/function"
import { Controller } from "../../../core/sharedObjects/controller"
import { SeriesContext } from "../../../domain/series/controllers/context"
import appConfig from "../../../core/config/app.config"
import * as R from "fp-ts-routing"

const baseUrl = appConfig.externalURL

export const discoverView: Controller<SeriesContext> = {
    _tag: "view",
    render: (context) => (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("seriesOfTheDay", () =>
                getTrendingSeries(context.seriesRepo)({ limit: 6, page: 0 })(
                    "day"
                )
            ),
            TE.bind("seriesOfTheWeek", () =>
                getTrendingSeries(context.seriesRepo)({ limit: 6, page: 0 })(
                    "week"
                )
            ),
            TE.map(({ seriesOfTheDay, seriesOfTheWeek }) => ({
                headline: "Discover Popular Content",
                type: "list",
                pages: [
                    {
                        background: seriesOfTheDay[0].background.bestQuality,
                        headline: "TV shows trending today",
                        items: [
                            {
                                label: "TV Shows trending today",
                                layout: "0,0,12,1",
                                type: "space",
                            },
                            ...seriesOfTheDay.map((s, i) => ({
                                titleHeader: s.title,
                                image: s.poster.economicQuality,
                                layout: `${i * 2},1,2,4`,
                                type: "separate",
                                action: `content:${baseUrl}${context.matchers.series.formatter.run(
                                    R.Route.empty,
                                    {
                                        id: String(s.id),
                                    }
                                )}`,
                            })),
                        ],
                    },
                    {
                        background: seriesOfTheWeek[0].background.bestQuality,
                        headline: "TV show trending this week",
                        items: [
                            {
                                label: "TV show trending this week",
                                layout: "0,0,12,1",
                                type: "space",
                            },
                            ...seriesOfTheWeek.map((s, i) => ({
                                titleHeader: s.title,
                                image: s.poster.economicQuality,
                                layout: `${i * 2},1,2,4`,
                                type: "separate",
                                action: `content:${baseUrl}${context.matchers.series.formatter.run(
                                    R.Route.empty,
                                    {
                                        id: String(s.id),
                                    }
                                )}`,
                            })),
                        ],
                    },
                ],
            }))
        ),
}
