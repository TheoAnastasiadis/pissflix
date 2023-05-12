import * as t from "io-ts"

interface ImdbIdI {
    readonly ImdbId: unique symbol
}

export const ImdbId = t.brand(
    t.string,
    (s): s is t.Branded<string, ImdbIdI> => !!s.match(/tt\d{1,7}/), //'tt1234' --> true, 'abcd' --> false
    "ImdbId"
)
