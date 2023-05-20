import moment from "moment"
import {
    MsxContentPage,
    addItemToPage,
} from "../../../../core/msxUI/contentObjects"
import { MovieT } from "../../../../domain/movies/entities/movie"
import * as A from "fp-ts/Array"
import { pipe } from "fp-ts/lib/function"

export const resultsPage = (
    headline: string,
    subtitle: string,
    movies: MovieT[],
    panelUrl: string
) => {
    const page: MsxContentPage = {
        background: movies[0].background.bestQuality,
        headline,
        items: [
            {
                titleHeader: headline,
                titleFooter: subtitle,
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
                titleFooter: moment(m.release).format("YYYY"),
                image: m.poster.economicQuality,
                layout: `${i * 2},1,2,4`,
                type: "separate",
            })
        ),
        (p) =>
            addItemToPage(p)({
                //show more button
                layout: `10,1,12,2`,
                type: "separate",
                icon: "more-horiz",
                action: `panel:${panelUrl}`,
            })
    )
}
