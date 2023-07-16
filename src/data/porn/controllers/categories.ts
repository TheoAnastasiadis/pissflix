import { pipe } from "fp-ts/lib/function"
import appConfig from "../../../core/config/app.config"
import { Controller } from "../../../core/sharedObjects/controller"
import { PContext } from "../../../domain/porn/controllers/context"
import { PCategoriesParams } from "../../../domain/porn/controllers/params"
import * as t from "io-ts"
import * as A from "fp-ts/Array"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"
import { getCategories } from "../../../domain/porn/useCases/getCategories"
import { getVideos } from "../../../domain/porn/useCases/getVideos"
import {
    MsxContentItem,
    MsxContentPage,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"

//helper
const shuffle = (unshuffled: any[]) =>
    unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

const baseUrl = appConfig.externalURL

export const categoriesView: Controller<
    PContext,
    t.TypeOf<typeof PCategoriesParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("categories", () => getCategories(context.prepo)),
            TE.bind("videos", ({ categories }) =>
                pipe(
                    categories,
                    A.map((category) =>
                        getVideos(context.prepo)({ name: params.section })(
                            category
                        )(0)
                    ),
                    A.sequence(TE.ApplicativePar)
                )
            ),
            TE.map(
                ({ categories, videos }) =>
                    ({
                        type: "pages",
                        headline: params.section.toUpperCase(),
                        transparent: "2",
                        preload: "none",
                        underlay: {
                            items: [
                                {
                                    type: "space",
                                    id: "title",
                                    layout: "0,0,6,1",
                                    offset: "0,0.5,0,0",
                                    title: "Category",
                                    titleFooter:
                                        "Pick one of the trending videos or play one on random",
                                },
                            ],
                        },
                        pages: [
                            ...shuffle(categories)
                                .slice(0, 52)
                                .map(
                                    //msx limit
                                    (category, i) =>
                                        ({
                                            items: [
                                                ...videos[i].slice(0, 8).map(
                                                    (video, j) =>
                                                        ({
                                                            type: "default",
                                                            layout: `${
                                                                (j % 4) * 3
                                                            },${
                                                                2 +
                                                                Math.floor(
                                                                    j / 4
                                                                ) *
                                                                    2
                                                            },3,2`,
                                                            color: "msx-glass",
                                                            imageFiller:
                                                                "cover",
                                                            image: video.thumbnail,
                                                            stamp: video.duration,
                                                            selection: {
                                                                important: true,
                                                                action:
                                                                    j == 0 ||
                                                                    j == 4
                                                                        ? `[update:content:underlay:title|execute:${baseUrl}${context.matchers.backdrop.formatter.run(
                                                                              R
                                                                                  .Route
                                                                                  .empty,
                                                                              {
                                                                                  query: `${params.section} ${category.name}`,
                                                                              }
                                                                          )}
                                                                    ]`
                                                                        : `update:content:underlay:title`,
                                                                data: {
                                                                    type: "space",
                                                                    id: "title",
                                                                    layout: "0,0,6,1",
                                                                    title: category.name.toUpperCase(),
                                                                    titleFooter:
                                                                        video.title,
                                                                },
                                                            },
                                                            action: `link:${video.url}`,
                                                        } satisfies MsxContentItem)
                                                ),
                                            ],
                                        } satisfies MsxContentPage)
                                ),
                        ],
                    } satisfies MsxContentRoot)
            )
        ),
}
