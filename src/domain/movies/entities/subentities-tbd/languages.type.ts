import { IsoType, getName, isValid } from "all-iso-language-codes"

export class Language {
    isoCode: string | null
    name: String | null
    constructor(isoCode: string, isoType: IsoType) {
        if (isValid(isoCode, [isoType])) {
            this.isoCode = isoCode
            this.name = getName(isoCode, "en")
        } else {
            this.isoCode = null
            this.name = null
        }
    }
}
