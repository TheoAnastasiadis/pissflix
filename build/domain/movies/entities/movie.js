"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const t = __importStar(require("io-ts"));
const country_1 = require("./country");
const genre_1 = require("./genre");
const imdbId_1 = require("./imdbId");
const language_1 = require("./language");
const image_1 = require("./image");
const Movie = t.union([
    t.readonly(t.type({
        background: image_1.Image,
        genres: t.array(genre_1.Genre),
        id: t.number,
        languages: t.array(language_1.Language),
        title: t.string,
        overview: t.string,
        poster: image_1.Image,
        countries: t.array(country_1.Country),
        release: t.number,
        runtime: t.number,
        tagline: t.string,
    })),
    t.partial({
        imdbId: imdbId_1.ImdbId,
    }),
]);
exports.Movie = Movie;
