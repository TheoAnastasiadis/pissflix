"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const all_iso_language_codes_1 = require("all-iso-language-codes");
class Language {
    constructor(isoCode, isoType) {
        if ((0, all_iso_language_codes_1.isValid)(isoCode, [isoType])) {
            this.isoCode = isoCode;
            this.name = (0, all_iso_language_codes_1.getName)(isoCode, "en");
        }
        else {
            this.isoCode = null;
            this.name = null;
        }
    }
}
exports.Language = Language;
