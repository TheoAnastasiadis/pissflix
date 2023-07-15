import { pipe } from "fp-ts/lib/function"
import appConfig from "../../../core/config/app.config"
import { Controller } from "../../../core/sharedObjects/controller"
import { SeriesContext } from "../../../domain/series/controllers/context"
import { genreParams } from "../../../domain/series/controllers/params"
import * as t from "io-ts"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as O from "fp-ts/Option"
import * as R from "fp-ts-routing"
import { getSeriesByGenre } from "../../../domain/series/useCases/getSeriesByGenre"
import { tmdbSeriesGenres } from "../repos/helpers/tmdbGenres"
import { SeriesGenresT } from "../../../domain/series/entities/seriesGenres"
import {
    MsxContentItem,
    MsxContentRoot,
    addItemToContent,
} from "../../../core/msxUI/contentObjects"

const baseUrl = appConfig.externalURL

export const genreView: Controller<
    SeriesContext,
    t.TypeOf<typeof genreParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("genre", () =>
                pipe(
                    params.id,
                    (id) =>
                        tmdbSeriesGenres.find(
                            (genre) => genre.id == Number(id)
                        ),
                    O.fromNullable,
                    TE.fromOption(() => `Invalid genre id parameter.`)
                )
            ),
            TE.bind("series", ({ genre }) =>
                getSeriesByGenre(context.seriesRepo)({
                    page: Number(params.page),
                    limit: 20,
                })(genre as SeriesGenresT)
            ),
            TE.map(({ genre, series }) =>
                pipe(
                    series,
                    A.map(
                        (show) =>
                            ({
                                title: show.title,
                                titleFooter: `${show.seasons.length} Seasons`,
                                image: show.poster.bestQuality,
                            } satisfies MsxContentItem)
                    ),
                    A.reduce(
                        {
                            type: "list",
                            headline: genre.name,
                            flag: "GENRE",
                            background: series.at(0)?.background.bestQuality,
                            template: {
                                type: "separate",
                                layout: "0,0,2,4",
                                image: "",
                                title: "Title",
                                titleFooter: "Unkown Seasons",
                                imageFiller: "cover",
                                imageOverlay: 1,
                                enumerate: false,
                            },
                            header: {
                                items: [
                                    {
                                        type: "space",
                                        title: series.at(0)?.title,
                                        titleFooter: series.at(0)?.overview,
                                        layout: "1,2,11,2",
                                        offset: "0,-1,0,0",
                                    },
                                    {
                                        type: "control",
                                        extensionIcon: "play-circle",
                                        label: "Watch Now",
                                        layout: "1,4,3,1",
                                        offset: "0,-1,0,0",
                                        action: `content:${baseUrl}${context.matchers.series.formatter.run(
                                            R.Route.empty,
                                            { id: `${series.at(0)?.id}` }
                                        )}`,
                                    },
                                ],
                            },
                            footer: {
                                items: [
                                    {
                                        type: "button",
                                        layout: "0,0,12,1",
                                        label: "Load More {ico:arrow-drop-down}",
                                        action: `replace:content:GENRE${context.matchers.genre.formatter.run(
                                            R.Route.empty,
                                            {
                                                id: params.id,
                                                page: String(
                                                    Number(params.page) + 1
                                                ), //next page
                                            }
                                        )}`,
                                    },
                                ],
                            },
                        } as MsxContentRoot,
                        (content, item) => addItemToContent(content)(item)
                    )
                )
            )
        ),
}
