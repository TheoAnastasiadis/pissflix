import { subtitleParams } from "./params"
import { CommonPaths } from "./paths"
import * as R from "fp-ts-routing"

export const commonMatchers = {
    subtitle: R.lit("subtitle").then(R.query(subtitleParams)),
    start: R.lit("start.json"),
    menu: R.lit("menu"),
} satisfies Record<CommonPaths, R.Match<any>>

export type commonmatcherT = typeof commonMatchers

export const prependCommonMatchers =
    (prefix: string) => (matchers: commonmatcherT) =>
        ({
            subtitle: R.lit(prefix).then(matchers.subtitle),
            start: R.lit(prefix).then(matchers.start),
            menu: R.lit(prefix).then(matchers.menu),
        } satisfies commonmatcherT)
