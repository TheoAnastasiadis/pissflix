"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const i18n_iso_countries_1 = require("i18n-iso-countries");
class Country {
    constructor(code) {
        if ((0, i18n_iso_countries_1.isValid)(code)) {
            this.isoCode = code;
            this.name = (0, i18n_iso_countries_1.getName)(code, "en");
        }
        else {
            this.isoCode = null;
            this.name = null;
        }
    }
}
exports.Country = Country;
