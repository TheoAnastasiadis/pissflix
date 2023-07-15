import { pipe } from "fp-ts/lib/function"
import applicationConfig from "../../../core/config/app.config"
import {
    MsxContentItem,
    MsxContentRoot,
    addItemToContent,
} from "../../../core/msxUI/contentObjects"
import { Controller } from "../../../core/sharedObjects/controller"
import { SeriesContext } from "../../../domain/series/controllers/context"
import * as TE from "fp-ts/TaskEither"
import { getGenres } from "../../../domain/series/useCases/getGenres"
import * as A from "fp-ts/Array"
import * as R from "fp-ts-routing"

const baseUrl = applicationConfig.externalURL

export const genresView: Controller<SeriesContext> = {
    _tag: "view",
    render: (context) => (params: {}) =>
        pipe(
            TE.Do,
            TE.bind("genres", () =>
                pipe(
                    getGenres(context.seriesRepo),
                    TE.fromOption(() => `[!] No genres were fetched.`)
                )
            ),
            TE.bind("images", ({ genres }) =>
                pipe(
                    genres,
                    A.map((genre) =>
                        context.photosRepo.search(`${genre.name} shows`)
                    ),
                    A.sequence(TE.ApplicativePar),
                    TE.map((photos) => photos[Math.random() * photos.length])
                )
            ),
            TE.map(({ genres, images }) =>
                pipe(
                    genres,
                    A.mapWithIndex(
                        (i, genre) =>
                            ({
                                title: genre.name,
                                image: images?.[i],
                                action: `content:${baseUrl}${context.matchers.genre.formatter.run(
                                    R.Route.empty,
                                    { id: String(genre.id), page: "0" }
                                )}`,
                            } satisfies MsxContentItem)
                    ),
                    A.reduce(
                        {
                            type: "list",
                            headline: "TV Shows",
                            template: {
                                type: "default",
                                layout: "0,0,3,4",
                                image: "",
                                title: "Title",
                                imageFiller: "cover",
                                imageOverlay: 1,
                                enumerate: false,
                            },
                            header: {
                                items: [
                                    {
                                        type: "control",
                                        icon: "search",
                                        layout: "0,0,4,1",
                                        offset: "4,0.75,0,0",
                                        label: "Search",
                                        action: `content:${baseUrl}${context.matchers.search.formatter.run(
                                            R.Route.empty,
                                            { query: "" }
                                        )}`,
                                    },
                                    {
                                        type: "space",
                                        layout: "0,1,12,2",
                                        label: "Millions of titles to chose from!",
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
