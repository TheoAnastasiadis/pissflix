import { pipe } from "fp-ts/function"
import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
import { Controller } from "../../../core/sharedObjects/controller"
import { CommonContext } from "../../../domain/common/controllers/context"
import * as TE from "fp-ts/TaskEither"
import * as E from "fp-ts/Either"
import { getRandomImage } from "../../../domain/common/useCases/getRandomImage"
import appConfig from "../../../core/config/app.config"

//helpers
const placementsToQueries = {
    background: "tv screens",
    series: "tv shows",
    movies: "movie posters",
    music: "music albums",
    porn: "masturbation",
    content: "albania",
} as const

const getPicForKey = (
    key: keyof typeof placementsToQueries,
    pics: E.Either<string, string>[]
) => {
    const index = Object.keys(placementsToQueries).indexOf(key)
    return pics[index]._tag == "Right"
        ? (pics[index] as E.Right<string>).right
        : (pics[index] as E.Left<string>).left
}

export const menuController: Controller<CommonContext> = {
    _tag: "view",
    render: (context) => () =>
        pipe(
            TE.Do,
            TE.bind("pics", () =>
                TE.fromTask(() =>
                    Promise.all(
                        Object.values(placementsToQueries).map((query) =>
                            getRandomImage(query)(context.photosRepo)()
                        )
                    )
                )
            ),
            TE.map(
                ({ pics }) =>
                    ({
                        headline: "Welcome Back",
                        type: "pages",
                        pages: [
                            {
                                background: getPicForKey("background", pics),
                                headline: "Select content",
                                items: [
                                    {
                                        type: "teaser",
                                        title: "Series",
                                        titleFooter:
                                            "Stream your favourite TV shows",
                                        layout: "0,0,4,6",
                                        enable: false,
                                        badge: "Comming soon",
                                        image: getPicForKey("series", pics),
                                        imageFiller: "cover",
                                    },
                                    {
                                        type: "teaser",
                                        layout: "4,0,4,3",
                                        title: "Movies",
                                        titleFooter:
                                            "Discover the latest releases",
                                        image: getPicForKey("movies", pics),
                                        imageFiller: "cover",
                                        action: `menu:${appConfig.externalURL}/movies/menu`,
                                    },
                                    {
                                        type: "teaser",
                                        layout: "4,3,4,3",
                                        title: "Music",
                                        titleFooter:
                                            "Stream all the important artists",
                                        enable: false,
                                        badge: "Comming soon",
                                        image: getPicForKey("music", pics),
                                        imageFiller: "cover",
                                    },
                                    {
                                        type: "teaser",
                                        layout: "8,0,4,2",
                                        title: "Porn",
                                        titleFooter:
                                            "All the great X-rated content",
                                        enable: false,
                                        badge: "Comming soon",
                                        image: getPicForKey("porn", pics),
                                        imageFiller: "cover",
                                    },
                                    {
                                        type: "teaser",
                                        layout: "8,2,4,2",
                                        title: "Albanian Weddings",
                                        enable: false,
                                        badge: "Comming soon",
                                        image: getPicForKey("content", pics),
                                        imageFiller: "cover",
                                    },
                                    {
                                        type: "button",
                                        icon: "settings",
                                        layout: "8,4,4,2",
                                        title: "Settings",
                                    },
                                ],
                            },
                        ],
                    } satisfies MsxContentRoot)
            )
        ),
}
