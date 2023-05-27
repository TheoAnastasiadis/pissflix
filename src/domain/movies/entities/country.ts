import * as t from "io-ts"
import countries from "i18n-iso-countries"

interface Country {
    readonly Country: unique symbol
}

export const Country = t.brand(
    t.string,
    (s): s is t.Branded<string, Country> => countries.isValid(s),
    "Country"
)

export type CountryT = t.TypeOf<typeof Country>
