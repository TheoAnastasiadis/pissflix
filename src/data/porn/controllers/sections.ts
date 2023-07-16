import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import { PContext } from "../../../domain/porn/controllers/context"
import * as TE from "fp-ts/TaskEither"
import * as R from "fp-ts-routing"
import * as A from "fp-ts/Array"
import { getSections } from "../../../domain/porn/useCases/getSections"
import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
import appConfig from "../../../core/config/app.config"
import { getRandomImage } from "../../../domain/common/useCases/getRandomImage"
import { posters } from "./content/backdrops"

const baseUrl = appConfig.externalURL

export const SectionsView: Controller<PContext> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("sections", () => getSections(context.prepo)),
            TE.bind("images", ({ sections }) =>
                pipe(
                    sections,
                    A.map((section) => section.name),
                    A.map((query) => getRandomImage(query)(context.photosRepo)),
                    A.sequence(TE.ApplicativePar),
                    TE.alt(() => TE.of(Object.values(posters)))
                )
            ),
            TE.map(
                ({ sections, images }) =>
                    ({
                        type: "pages",
                        headline: "Porn",
                        pages: [
                            {
                                headline: "Select Content",
                                items: [
                                    {
                                        type: "teaser",
                                        layout: "0,0,4,6",
                                        title: sections[0].name.toUpperCase(),
                                        image: images[0],
                                        imageFiller: "cover",
                                        action: `content:${baseUrl}${context.matchers.categories.formatter.run(
                                            R.Route.empty,
                                            {
                                                section: sections[0].name,
                                                page: "0",
                                            }
                                        )}`,
                                    },
                                    {
                                        type: "teaser",
                                        layout: "4,0,4,6",
                                        title: sections[1].name.toUpperCase(),
                                        image: images[1],
                                        imageFiller: "cover",
                                        action: `content:${baseUrl}${context.matchers.categories.formatter.run(
                                            R.Route.empty,
                                            {
                                                section: sections[1].name,
                                                page: "0",
                                            }
                                        )}`,
                                    },
                                    {
                                        type: "teaser",
                                        layout: "8,0,4,3",
                                        title: sections[2].name.toUpperCase(),
                                        image: images[2],
                                        imageFiller: "cover",
                                        action: `content:${baseUrl}${context.matchers.categories.formatter.run(
                                            R.Route.empty,
                                            {
                                                section: sections[2].name,
                                                page: "0",
                                            }
                                        )}`,
                                    },
                                    {
                                        type: "teaser",
                                        layout: "8,3,4,2",
                                        title: sections[3].name.toUpperCase(),
                                        image: images[3],
                                        imageFiller: "cover",
                                        action: `content:${baseUrl}${context.matchers.categories.formatter.run(
                                            R.Route.empty,
                                            {
                                                section: sections[3].name,
                                                page: "0",
                                            }
                                        )}`,
                                    },
                                    {
                                        type: "teaser",
                                        layout: "8,5,4,1",
                                        title: sections[4].name.toUpperCase(),
                                        image: images[4],
                                        imageFiller: "cover",
                                        action: `content:${baseUrl}${context.matchers.categories.formatter.run(
                                            R.Route.empty,
                                            {
                                                section: sections[4].name,
                                                page: "0",
                                            }
                                        )}`,
                                    },
                                ],
                            },
                        ],
                    } satisfies MsxContentRoot)
            )
        ),
}
