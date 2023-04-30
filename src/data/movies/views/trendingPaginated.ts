import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"
import { Result } from "../../../core/sharedObjects/result"
import { View } from "../../../core/sharedObjects/view"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
import { TMDBRepo } from "../repos/tmdb"

const repo = new TMDBRepo()

export class TrendingMovies extends View<MsxContentRoot> {
    constructor(externalUrl: string, moviesUrl: string, trendingUrl: string) {
        super(externalUrl, moviesUrl, trendingUrl, [
            {
                name: "type",
                type: "string",
            },
            {
                name: "page",
                type: "number",
            },
        ])
    }
    renderer = async (
        params: { [key: string]: string | number | boolean } | undefined
    ) => {
        if (params?.type != "week" && params?.type != "day") {
            return new Result<MsxContentRoot>(
                false,
                "'type' parameter should exist and have a value of 'day' or 'week'"
            )
        }
        const content = new MsxContentRoot({})
        const type = params.type as "week" | "day"
        const page = params.page as number

        const trendingMovies = await getTrendingMovies(repo, type, {
            page,
            limit: 5,
        })
        if (trendingMovies.isSuccess) {
            const movies = trendingMovies.getValue() || []
            for (let i = 0; i < movies.length; i++) {
                content.addItem(
                    new MsxContentItem({
                        //movie posters
                        titleHeader: movies[i].title,
                        titleFooter: movies[i].release.getFullYear().toString(),
                        image: movies[i].poster.getDefaultQuality(),
                        layout: `${i * 2},1,12,2`,
                        type: "separate",
                    })
                )
            }
        } else {
            return new Result<MsxContentRoot>(
                false,
                trendingMovies.errorValue()
            )
        }
        return new Result<MsxContentRoot>(true, undefined, content)
    }
}
