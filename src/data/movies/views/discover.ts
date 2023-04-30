import {
    MsxContentItem,
    MsxContentPage,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"
import { Result } from "../../../core/sharedObjects/result"
import { View } from "../../../core/sharedObjects/view"
import { Movie } from "../../../domain/movies/entities/movie.entity"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
import { TMDBRepo } from "../repos/tmdb"

const repo = new TMDBRepo()

const populateRow = (
    movies: Movie[],
    title: string,
    content: MsxContentRoot
) => {
    const page = new MsxContentPage({
        background: movies[0].background.getHighestQuality(),
        headline: title,
    })
    page.addItem(
        new MsxContentItem({
            //headline
            title: title,
            layout: "0,0,12,1",
            type: "space",
        })
    )
    for (let i = 0; i < movies.length; i++) {
        page.addItem(
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
    page.addItem(
        new MsxContentItem({
            //next page button
            layout: `10,1,12,2`,
            type: "separate",
            icon: "arrow-right",
        })
    )

    content.addPage(page)
}

export class DiscoverPage extends View<MsxContentRoot> {
    constructor(
        externalUrl: string,
        moviesUrl: string,
        discoverPageUrl: string
    ) {
        super(externalUrl, moviesUrl, discoverPageUrl)
    }
    renderer = async () => {
        const dailyTrendingMovies = await getTrendingMovies(repo, "week", {
            page: 0,
            limit: 5,
        })
        const weeklyTrendingMovies = await getTrendingMovies(repo, "week", {
            page: 0,
            limit: 5,
        })

        const content = new MsxContentRoot({
            headline: "Discover Popular Content",
            type: "list",
        })

        if (dailyTrendingMovies.isSuccess) {
            const movies = dailyTrendingMovies.getValue() || []
            populateRow(movies, "Movie Trending Today", content)
        }

        if (weeklyTrendingMovies.isSuccess) {
            const movies = weeklyTrendingMovies.getValue() || []
            populateRow(movies, "Movie Trending This Week", content)
        }

        return new Result<MsxContentRoot>(true, undefined, content)
    }
}
