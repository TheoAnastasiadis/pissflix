import {
    MsxContentItem,
    MsxContentRoot,
} from "../../../core/msxUI/contentObjects"
import { Year } from "../../../core/sharedObjects/decades"
import { Region, regions } from "../../../core/sharedObjects/regions"
import { Result } from "../../../core/sharedObjects/result"
import { URLMaker } from "../../../core/sharedObjects/urlMaker"
import { View } from "../../../core/sharedObjects/view"
import { Movie } from "../../../domain/movies/entities/movie.entity"
import { Genre } from "../../../domain/movies/entities/subentities"
import { IMoviesRepo } from "../../../domain/movies/repos/movies.repo"
import { getMoviesByDecade } from "../../../domain/movies/useCases/getMoviesByDecade"
import { getMoviesByGenre } from "../../../domain/movies/useCases/getMoviesByGenre"
import { getMoviesByRegion } from "../../../domain/movies/useCases/getMoviesByRegion"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"

const populateContent = (content: MsxContentRoot, movies: Movie[]) => {
    for (const movie of movies) {
        content.addItem(
            new MsxContentItem({
                image: movie.poster.getDefaultQuality(),
                title: movie.title,
                titleFooter: movie.release.getFullYear().toString(),
                selection: { action: `info:${movie.overview}` },
            })
        )
    }
}

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
        const type = params?.type as
            | "day"
            | "week"
            | `genre:${number}`
            | `era:${Year}`
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

        let moviesResult: Result<Movie[]>
        let movies: Movie[]

        if (type == "day" || type == "week") {
            moviesResult = await getTrendingMovies(this.repo, type, {
                page,
                limit: 20,
            })
        } else if (type.startsWith("genre:")) {
            const genre: Genre = {
                name: null,
                uniqueId: parseInt(type.substring(6)),
            }
            moviesResult = await getMoviesByGenre(this.repo, genre, {
                page,
                limit: 20,
            })
        } else if (type.startsWith("era:")) {
            const decade: Year = parseInt(type.substring(4)) as Year
            moviesResult = await getMoviesByDecade(this.repo, decade, {
                page,
                limit: 20,
            })
        } else if (type.startsWith("region:")) {
            const region: Region = regions.find(
                (r) => r.name == type.substring(7)
            ) || { name: "blank", languages: [], isoType: "639-1" }
            moviesResult = await getMoviesByRegion(this.repo, region, {
                page,
                limit: 20,
            })
        } else {
            return new Result<MsxContentRoot>(
                false,
                `Invalid 'type' parameter: ${type}`
            )
        }

        if (moviesResult.isSuccess) {
            movies = moviesResult.getValue() || []
            populateContent(content, movies)
        } else {
            return new Result<MsxContentRoot>(false, moviesResult.errorValue())
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
