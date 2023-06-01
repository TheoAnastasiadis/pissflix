import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/controller"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"
import * as R from "fp-ts-routing"
import * as t from "io-ts"
import { searchForMovie } from "../../../domain/movies/useCases/searchForMovie"
import {
    MsxContentItem,
    MsxContentPage,
    addItemToPage,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import moment from "moment"
import { getTrendingMovies } from "../../../domain/movies/useCases/getTrendingMovies"
import { MovieContext } from "../../../domain/movies/controllers/context"
import { searchParams } from "../../../domain/movies/controllers/params"

const FLAG = "_search"

const createSearchBarPage: (query: string) => MsxContentPage = (query) => ({
    items: [
        {
            layout: "0,0,12,1",
            extensionIcon: "search",
            label: query && query.length > 0 ? query : "Start typing...",
            type: "control",
            action: "reload:content",
        },
    ],
})

const addKeyboardToPage: (
    query: string,
    matchers: MovieContext["matchers"],
    topLevelRoute: R.Route
) => (page: MsxContentPage) => MsxContentPage =
    (query, matchers, topLevelRoute) => (page) =>
        pipe(
            page,
            (page) =>
                A.reduceWithIndex(page, (i, p, char: string) =>
                    addItemToPage(p)({
                        layout: `${i % 12},${Math.floor(i / 12) + 1},${1},${1}`,
                        label: char,
                        alignment: "center",
                        color: "msx-gray",
                        action: `replace:content:${FLAG}:${matchers.search.formatter
                            .run(R.Route.empty, { query: query + char })
                            .toString()}`,
                    })
                )("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")), //alpha characters
            (page) =>
                addItemToPage(page)({
                    layout: "2,3,3,1",
                    label: "{ico:space-bar}",
                    type: "default",
                    alignment: "center",
                    color: "msx-gray",
                    action: `replace:content:${FLAG}:${matchers.search.formatter
                        .run(R.Route.empty, { query: query + " " })
                        .toString()}`,
                }), //space bar
            (page) =>
                A.reduceWithIndex(page, (i, p, char: string) =>
                    addItemToPage(p)({
                        layout: `${5 + i},${3},${1},${1}`,
                        label: char,
                        alignment: "center",
                        color: "msx-gray",
                        action: `replace:content:${FLAG}:${matchers.search.formatter
                            .run(R.Route.empty, { query: query + char })
                            .toString()}`,
                    })
                )(".!?".split("")), //symbols
            (page) =>
                addItemToPage(page)({
                    layout: "8,3,3,1",
                    label: "{ico:backspace}",
                    type: "default",
                    alignment: "center",
                    color: "msx-gray",
                    action: `replace:content:${FLAG}:${matchers.search.formatter
                        .run(R.Route.empty, {
                            query: query.substring(0, query.length - 1),
                        })
                        .toString()}`,
                }), //backspace
            (page) =>
                addItemToPage(page)({
                    layout: "11,3,1,1",
                    label: "{ico:clear}",
                    type: "default",
                    alignment: "center",
                    color: "msx-gray",
                    action: `replace:content:${FLAG}:${matchers.search.formatter
                        .run(R.Route.empty, { query: "" })
                        .toString()}`,
                }) //clear
        )

export const searchView: Controller<
    MovieContext,
    t.TypeOf<typeof searchParams>
> = {
    _tag: "view",
    render: (context, topLevelRoute: R.Route) => (params) =>
        pipe(
            TE.Do,
            TE.bind("query", () => TE.right(params.query)),
            TE.bind("movies", ({ query }) =>
                query.length == 0
                    ? searchForMovie(context.moviesRepo)({
                          page: 0,
                          limit: 20,
                      })(query)
                    : getTrendingMovies(context.moviesRepo)({
                          page: 0,
                          limit: 20,
                      })("day")
            ), //if query is empty, a list of trending movies is returned
            TE.map(({ query, movies }) =>
                pipe(
                    createSearchBarPage(query),
                    addKeyboardToPage(query, context.matchers, topLevelRoute),
                    addPageToContent({
                        flag: FLAG, //this is important to be able to replace the page content
                        type: "list",
                        headline: "Search For Movies",
                        background:
                            movies && movies[0]
                                ? movies[0].background.bestQuality
                                : "",
                        pages: [],
                    }),
                    (content) =>
                        addPageToContent(content)({
                            items: movies
                                .slice(0, Math.min(11, movies.length))
                                .map(
                                    (movie, i) =>
                                        ({
                                            layout: `${(i % 6) * 2},${
                                                Math.floor(i / 6) * 3
                                            },2,3` as `${number},${number},${number},${number}`,
                                            image: movie.poster.economicQuality,
                                            type: "teaser",
                                            titleFooter: moment
                                                .unix(movie.release)
                                                .format("YYYY"),
                                        } satisfies MsxContentItem)
                                ),
                        })
                )
            )
        ),
}
