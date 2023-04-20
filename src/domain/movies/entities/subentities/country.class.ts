import { isValid, getName } from "i18n-iso-countries"

export class Country {
    isoCode: string | null
    name: String | null
    constructor(code: string) {
        if (isValid(code)) {
            this.isoCode = code
            this.name = getName(code, "en")
        } else {
            this.isoCode = null
            this.name = null
        }
    }
}
