import { pipe } from "fp-ts/lib/function"
import { Controller } from "../../../core/sharedObjects/view"
import { MoviesRepoT } from "../../../domain/movies/repos/movies.repo"
import { MoviePaths, searchParams } from "../../../domain/movies/controllers"
import * as E from "fp-ts/Either"
import * as TE from "fp-ts/TaskEither"
import * as A from "fp-ts/Array"

import { searchForMovie } from "../../../domain/movies/useCases/searchForMovie"
import {
    MsxContentItem,
    MsxContentPage,
    addItemToPage,
    addPageToContent,
} from "../../../core/msxUI/contentObjects"
import moment from "moment"
import { DebridProviderRepo } from "../../../domain/common/repos/debridProvider.repo"
import { TorrentRepo } from "../../../domain/common/repos/torrent.repo"

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
    paths: MoviePaths
) => (page: MsxContentPage) => MsxContentPage = (query, paths) => (page) =>
    pipe(
        page,
        (page) =>
            A.reduceWithIndex(page, (i, p, char: string) =>
                addItemToPage(p)({
                    layout: `${i % 12},${Math.floor(i / 12) + 1},${1},${1}`,
                    label: char,
                    alignment: "center",
                    color: "msx-gray",
                    action: `replace:content:${FLAG}:${
                        paths.search +
                        "?" +
                        new URLSearchParams({
                            query: query + char,
                        }).toString()
                    }`,
                })
            )("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")), //alpha characters
        (page) =>
            addItemToPage(page)({
                layout: "2,3,3,1",
                label: "{ico:space-bar}",
                type: "default",
                alignment: "center",
                color: "msx-gray",
                action: `replace:content:${FLAG}:${
                    paths.search
                }?${new URLSearchParams({ query: query + " " }).toString()}`,
            }), //space bar
        (page) =>
            A.reduceWithIndex(page, (i, p, char: string) =>
                addItemToPage(p)({
                    layout: `${5 + i},${3},${1},${1}`,
                    label: char,
                    alignment: "center",
                    color: "msx-gray",
                    action: `replace:content:${FLAG}:${
                        paths.search
                    }?${new URLSearchParams({
                        query: query + char,
                    }).toString()}`,
                })
            )(".!?".split("")), //symbols
        (page) =>
            addItemToPage(page)({
                layout: "8,3,3,1",
                label: "{ico:backspace}",
                type: "default",
                alignment: "center",
                color: "msx-gray",
                action: `replace:content:${FLAG}:${
                    paths.search
                }?${new URLSearchParams({
                    query: query.substring(0, query.length - 1),
                }).toString()}`,
            }), //backspace
        (page) =>
            addItemToPage(page)({
                layout: "11,3,1,1",
                label: "{ico:clear}",
                type: "default",
                alignment: "center",
                color: "msx-gray",
                action: `replace:content:${FLAG}:${
                    paths.search
                }?${new URLSearchParams({ query: "" }).toString()}`,
            }) //clear
    )

export const searchView: Controller<
    MoviePaths["search"],
    {
        moviesRepo: MoviesRepoT
        torrentRepo: TorrentRepo
        debridRepo: DebridProviderRepo
        relativePaths: MoviePaths
        absolutePaths: MoviePaths
    },
    typeof searchParams
> = {
    _tag: "view",
    _path: `/movies/search`,
    render: (context) => (decoder: typeof searchParams) => (params: any) =>
        pipe(
            TE.Do,
            TE.bind("query", () =>
                pipe(
                    params,
                    decoder.decode,
                    E.match(
                        () => TE.right(""),
                        (query) => TE.right(query.query)
                    )
                )
            ),
            TE.bind("movies", ({ query }) =>
                pipe(
                    query,
                    searchForMovie(context.moviesRepo)({ page: 0, limit: 20 })
                )
            ),
            TE.map(({ query, movies }) =>
                pipe(
                    createSearchBarPage(query),
                    addKeyboardToPage(query, context.absolutePaths),
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
            ),
            TE.mapLeft(() =>
                pipe(
                    createSearchBarPage(""), //empty search bar
                    addKeyboardToPage("", context.absolutePaths),
                    addPageToContent({
                        flag: FLAG,
                        type: "list",
                        headline: "Search For Movies",
                        pages: [],
                    })
                )
            )
        ),
}
