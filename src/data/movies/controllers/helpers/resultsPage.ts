import moment from "moment"
import {
    MsxContentPage,
    addItemToPage,
} from "../../../../core/msxUI/contentObjects"
import { MovieT } from "../../../../domain/movies/entities/movie"
import * as A from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"
import { MovieMatchersT } from "../../../../domain/movies/controllers/matchers"
import * as R from "fp-ts-routing"

export const resultsPage = (
    headline: string,
    title: string,
    subtitle: string,
    movies: MovieT[],
    panelUrl: string,
    matchers: MovieMatchersT
) => {
    const page: MsxContentPage = {
        background: movies[0].background.bestQuality,
        headline,
        items: [
            {
                label: title,
                //text: subtitle,
                layout: "0,0,12,1",
                type: "space",
            },
        ],
    }

    return pipe(
        movies,
        A.reduceWithIndex(page, (i, p, m: MovieT) =>
            addItemToPage(p)({
                titleHeader: m.title,
                titleFooter: moment.unix(m.release).format("YYYY"),
                image: m.poster.economicQuality,
                layout: `${i * 2},1,2,4`,
                type: "separate",
                action: `content:${matchers.info.formatter.run(R.Route.empty, {
                    id: String(m.id),
                })}`,
            })
        ),
        (p) =>
            addItemToPage(p)({
                //show more button
                layout: `10,1,2,4`,
                type: "separate",
                icon: "more-horiz",
                action: `panel:${panelUrl}`,
            })
    )
}
