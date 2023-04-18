import { IsoType } from "all-iso-language-codes"

export type Region = {
    name: string
    isoType: IsoType
    languages: string[]
}
