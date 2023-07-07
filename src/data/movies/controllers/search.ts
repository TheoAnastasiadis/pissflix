import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import * as TE from "fp-ts/TaskEither"
import * as t from "io-ts"
import { searchForMovie } from "../../../domain/movies/useCases/searchForMovie"
import {
    MsxContentItem,
    MsxContentRoot,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import moment from "moment"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
import { MovieContext } from "../../../domain/movies/controllers/context"
import { searchParams } from "../../../domain/movies/controllers/params"
import { searchBar } from "./helpers/searchBar"
import { addKeyboardPage } from "./helpers/keyboard"
import { MovieT } from "../../../domain/movies/entities/movie"
import appConfig from "../../../core/config/app.config"
import * as R from "fp-ts-routing"
//helpers
const resultPoster: (
    context: MovieContext
) => (movie: MovieT, i: number) => MsxContentItem =
    (context) => (movie, i) => ({
        layout: `${(i % 6) * 2},${
            Math.floor(i / 6) * 3
        },2,3` as `${number},${number},${number},${number}`,
        image: movie.poster.economicQuality,
        type: "teaser",
        titleFooter: moment.unix(movie.release).format("YYYY"),
        action: `content:${
            appConfig.externalURL
        }${context.matchers.info.formatter.run(R.Route.empty, {
            id: String(movie.id),
        })}`,
    })

const rootContent: (backgroundUrl: string, flag: string) => MsxContentRoot = (
    backgroundUrl,
    flag
) => ({
    flag,
    type: "list",
    headline: "Search For Movies",
    background: backgroundUrl,
    pages: [],
})

const FLAG = "_search"

export const searchView: Controller<
    MovieContext,
    t.TypeOf<typeof searchParams>
> = {
    _tag: "view",
    render: (context) => (params) =>
        pipe(
            TE.Do,
            TE.bind("query", () => TE.right(params.query)),
            TE.bind("movies", ({ query }) =>
                query.length > 0
                    ? searchForMovie(context.moviesRepo)({
                          page: 0,
                          limit: 11,
                      })(query)
                    : getTrendingMovies(context.moviesRepo)({
                          page: 0,
                          limit: 11,
                      })("day")
            ), //if query is empty, a list of trending movies is returned
            TE.map(({ query, movies }) =>
                pipe(
                    searchBar(query),
                    addKeyboardPage(query, context.matchers, FLAG),
                    addPageToContent(
                        rootContent(
                            movies && movies[0]
                                ? movies[0].background.economicQuality
                                : "",
                            FLAG
                        )
                    ),
                    (content) =>
                        addPageToContent(content)({
                            items: movies.map(resultPoster(context)),
                        })
                )
            )
        ),
}
