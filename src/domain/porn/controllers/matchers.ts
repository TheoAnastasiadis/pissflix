import * as R from "fp-ts-routing"
import { PPaths } from "./paths"
import { PCategoriesParams, backDropParams } from "./params"

//Matchers
export const PMatchers = {
    sections: R.lit("sections").then(R.end),
    categories: R.lit("categories")
        .then(R.query(PCategoriesParams))
        .then(R.end),
    /*stream: R.lit("stream").then(R.query(PStreamParams)).then(R.end),*/
    backdrop: R.lit("backdrop").then(R.query(backDropParams)).then(R.end),
} satisfies Record<PPaths, R.Match<any>>

export type PMatchersT = typeof PMatchers

export const prependPMatchers = (prefix: string) => (matchers: PMatchersT) =>
    ({
        sections: R.lit(prefix).then(matchers.sections),
        categories: R.lit(prefix).then(matchers.categories),
        /*stream: R.lit(prefix).then(matchers.stream),*/
        backdrop: R.lit(prefix).then(matchers.backdrop),
    } satisfies PMatchersT)
