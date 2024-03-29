import { pipe } from "fp-ts/lib/function"
import {
    MsxContentPage,
    addItemToPage,
} from "../../../core/msxUI/contentObjects"
import { SeriesContext } from "../../../domain/series/controllers/context"
import * as A from "fp-ts/Array"
import * as R from "fp-ts-routing"
import appConfig from "../../../core/config/app.config"

const baseUrl = appConfig.externalURL

export const addKeyboardPage: (
    query: string,
    matchers: SeriesContext["matchers"],
    FLAG: string
) => (page: MsxContentPage) => MsxContentPage =
    (query, matchers, FLAG) => (page) =>
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
                            baseUrl +
                            matchers.search.formatter
                                .run(R.Route.empty, { query: query + char })
                                .toString()
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
                        baseUrl +
                        matchers.search.formatter
                            .run(R.Route.empty, { query: query + " " })
                            .toString()
                    }`,
                }), //space bar
            (page) =>
                A.reduceWithIndex(page, (i, p, char: string) =>
                    addItemToPage(p)({
                        layout: `${5 + i},${3},${1},${1}`,
                        label: char,
                        alignment: "center",
                        color: "msx-gray",
                        action: `replace:content:${FLAG}:${
                            baseUrl +
                            matchers.search.formatter
                                .run(R.Route.empty, { query: query + char })
                                .toString()
                        }`,
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
                        baseUrl +
                        matchers.search.formatter
                            .run(R.Route.empty, {
                                query: query.substring(0, query.length - 1),
                            })
                            .toString()
                    }`,
                }), //backspace
            (page) =>
                addItemToPage(page)({
                    layout: "11,3,1,1",
                    label: "{ico:clear}",
                    type: "default",
                    alignment: "center",
                    color: "msx-gray",
                    action: `replace:content:${FLAG}:${
                        baseUrl +
                        matchers.search.formatter
                            .run(R.Route.empty, { query: "" })
                            .toString()
                    }`,
                }) //clear
        )
