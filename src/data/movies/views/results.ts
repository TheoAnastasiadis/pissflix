import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"
import { Result } from "../../../core/sharedObjects/result"
import { URLMaker } from "../../../core/sharedObjects/urlMaker"
import { View } from "../../../core/sharedObjects/view"
import { Movie } from "../../../domain/movies/entities/movie.entity"
import { IMoviesRepo } from "../../../domain/movies/repos/movies.repo"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"

export class ResultsPanel extends View<MsxContentRoot> {
    repo: IMoviesRepo
    constructor(
        externalUrl: string,
        moviesUrl: string,
        discoverPageUrl: string,
        moviesRepo: IMoviesRepo
    ) {
        const requiredParams: {
            name: string
            type: "string" | "number" | "boolean"
        }[] = [
            {
                name: "type",
                type: "string",
            },
            {
                name: "page",
                type: "number",
            },
        ]
        super(externalUrl, moviesUrl, discoverPageUrl, requiredParams)
        this.repo = moviesRepo
    }
    renderer: (
        params?: { [key: string]: string | number | boolean } | undefined
    ) => Result<MsxContentRoot> | Promise<Result<MsxContentRoot>> = async (
        params
    ) => {
        //params
        const type = params?.type as "day" | "week"
        const page = params?.page as number

        const flag = "results_panel"

        const content = new MsxContentRoot({
            type: "list",
            flag,
        })

        content.addTemplate(
            new MsxContentItem({
                layout: "0,0,2,4",
                imageFiller: "cover",
                type: "separate",
                title: "Movie Title",
                titleFooter: "(Release Year)",
                selection: { action: "info:{context:description}" },
                enumerate: false,
            })
        )

        if (page > 0) {
            //previous page button
            content.addItem(
                new MsxContentItem({
                    type: "separate",
                    icon: "arrow-left",
                    action: `replace:panel:${flag}:${URLMaker.make(
                        this.externalUrl,
                        this.groupUrl,
                        this.specialUrl,
                        { page: page - 1, type }
                    )}`,
                })
            )
        }

        switch (type) {
            case "day" || "week":
                const movies: Result<Movie[]> = await getTrendingMovies(
                    this.repo,
                    type,
                    { page, limit: 20 }
                )
                if (movies.isSuccess) {
                    for (const movie of movies.getValue() || []) {
                        content.addItem(
                            new MsxContentItem({
                                image: movie.poster.getDefaultQuality(),
                                title: movie.title,
                                titleFooter: movie.release
                                    .getFullYear()
                                    .toString(),
                                selection: { action: `info:${movie.overview}` },
                            })
                        )
                    }
                } else {
                    return new Result<MsxContentRoot>(false, movies.error)
                }
                break

            case "week":
                break

            default:
                break
        }

        content.addItem(
            new MsxContentItem({
                //next page button
                type: "separate",
                icon: "arrow-right",
                action: `replace:panel:${flag}:${URLMaker.make(
                    this.externalUrl,
                    this.groupUrl,
                    this.specialUrl,
                    { page: page + 1, type }
                )}`,
            })
        )

        return new Result<MsxContentRoot>(true, undefined, content)
    }
}
