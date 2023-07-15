import { SeriesContext } from "../../../domain/series/controllers/context"
import * as t from "io-ts"
import { searchParams } from "../../../domain/series/controllers/params"
import { Controller } from "../../../core/sharedObjects/controller"
import { pipe } from "fp-ts/lib/function"
import * as TE from "fp-ts/TaskEither"
import { searchForSeries } from "../../../domain/series/useCases/searchForSeries"
import { getTrendingSeries } from "../../../domain/series/useCases/getTrendingSeries"
import { searchBar } from "../../movies/controllers/helpers/searchBar"
import {
    MsxContentItem,
    MsxContentRoot,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import { SeriesT } from "../../../domain/series/entities/series"
import appConfig from "../../../core/config/app.config"
import * as R from "fp-ts-routing"
import { addKeyboardPage } from "../helpers/MsxKeyboard"

//helpers
const resultPoster: (
    context: SeriesContext
) => (series: SeriesT, i: number) => MsxContentItem =
    (context) => (series, i) => ({
        layout: `${(i % 6) * 2},${
            Math.floor(i / 6) * 3
        },2,3` as `${number},${number},${number},${number}`,
        image: series.poster.economicQuality,
        type: "teaser",
        action: `content:${
            appConfig.externalURL
        }${context.matchers.series.formatter.run(R.Route.empty, {
            id: String(series.id),
        })}`,
    })

const rootContent: (backgroundUrl: string, flag: string) => MsxContentRoot = (
    backgroundUrl,
    flag
) => ({
    flag,
    type: "list",
    headline: "Search For TV Shows",
    background: backgroundUrl,
    pages: [],
})

const FLAG = "_search"

export const searchView: Controller<
    SeriesContext,
    t.TypeOf<typeof searchParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("query", () => TE.right(params.query)),
            TE.bind("series", ({ query }) =>
                query.length > 0
                    ? searchForSeries(context.seriesRepo)({
                          page: 0,
                          limit: 11,
                      })(query)
                    : getTrendingSeries(context.seriesRepo)({
                          page: 0,
                          limit: 11,
                      })("day")
            ), //if query is empty, a list of trending movies is returned
            TE.map(({ query, series }) =>
                pipe(
                    searchBar(query),
                    addKeyboardPage(query, context.matchers, FLAG),
                    addPageToContent(
                        rootContent(
                            series && series[0]
                                ? series[0].background.economicQuality
                                : "",
                            FLAG
                        )
                    ),
                    (content) =>
                        addPageToContent(content)({
                            items: series.map(resultPoster(context)),
                        })
                )
            )
        ),
}
