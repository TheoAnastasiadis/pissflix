import * as t from "io-ts"
import { isValid as isValidLanguage } from "all-iso-language-codes"

interface Language {
    readonly Language: unique symbol
}

const Language = t.brand(
    t.string,
    (s): s is t.Branded<string, Language> => isValidLanguage(s) as boolean,
    "Language"
)

type LanguageT = t.TypeOf<typeof Language>

export { Language, LanguageT }
