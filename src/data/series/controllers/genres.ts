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
import * as E from "fp-ts/Either"
import { getRandomImage } from "../../../domain/common/useCases/getRandomImage"
import { SeriesGenresT } from "../../../domain/series/entities/seriesGenres"

const keysToQueries: Record<SeriesGenresT["name"], string> = {
    "Action & Adventure": "adrenaline",
    Animation: "cartoon",
    Comedy: "comedy",
    Crime: "crime",
    Documentary: "documentary",
    Drama: "deep",
    Family: "family tv",
    Kids: "children",
    Mystery: "foggy forest",
    News: "news",
    Reality: "tiktok",
    "Sci-Fi & Fantasy": "sci fi",
    Soap: "turkish tv show", //lol this gets the best results, not my fault
    Talk: "talk show",
    "War & Politics": "war & politics",
    Western: "cowboy",
}

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
                TE.fromTask(() =>
                    Promise.all(
                        genres
                            .map((genre) => genre.name)
                            .map((name) =>
                                getRandomImage(keysToQueries[name])(
                                    context.photosRepo
                                )()
                            )
                    )
                )
            ),
            TE.map(({ genres, images }) =>
                pipe(
                    genres,
                    A.mapWithIndex(
                        (i, genre) =>
                            ({
                                title: genre.name,
                                image:
                                    "right" in images[i]
                                        ? (images[i] as E.Right<string>).right
                                        : (images[i] as E.Left<string>).left,
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
                            background:
                                "https://images.unsplash.com/photo-1441095179793-e2c059a90f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&",
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
