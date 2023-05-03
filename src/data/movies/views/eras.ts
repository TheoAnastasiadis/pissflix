import { MsxContentRoot } from "../../../core/msxUI/contentObjects"
import { Year } from "../../../core/sharedObjects/decades"
import { Result } from "../../../core/sharedObjects/result"
import { URLMaker } from "../../../core/sharedObjects/urlMaker"
import { View } from "../../../core/sharedObjects/view"
import { Movie } from "../../../domain/movies/entities/movie.entity"
import { IMoviesRepo } from "../../../domain/movies/repos/movies.repo"
import { getMoviesByDecade } from "../../../domain/movies/useCases/getMoviesByDecade"
import { MovieRelativePaths } from "../../../domain/movies/views"
import { resultsPage } from "./helpers/resultsPage"

export class ErasPage extends View<MsxContentRoot> {
    repo: IMoviesRepo
    constructor(
        externalUrl: string,
        moviesUrl: string,
        genresUrl: string,
        repo: IMoviesRepo
    ) {
        super(externalUrl, moviesUrl, genresUrl)
        this.repo = repo
    }

    renderer = async () => {
        const content = new MsxContentRoot({
            headline: "Discover Content By Specific Time Period",
            type: "list",
        })

        const eras: Year[] = Array(10).map((v, i) => (1920 + i) as Year)
        const movieResults: Result<Movie[]>[] = await Promise.all(
            eras.map((decade) =>
                getMoviesByDecade(this.repo, decade, { limit: 5, page: 0 })
            )
        )
        for (const idx in eras) {
            if (movieResults[idx].isSuccess) {
                const movies = movieResults[idx].getValue() || []
                content.addPage(
                    resultsPage(
                        eras[idx].toString(),
                        "", //eras subtitle
                        movies,
                        URLMaker.make(
                            this.externalUrl,
                            this.groupUrl,
                            MovieRelativePaths.resultsPanel,
                            {
                                type: `era:${eras[idx]}`,
                                page: 0,
                            }
                        )
                    )
                )
            } //if some decade didn't return, we just skip it.
        }

        return new Result<MsxContentRoot>(true, undefined, content)
    }
}
