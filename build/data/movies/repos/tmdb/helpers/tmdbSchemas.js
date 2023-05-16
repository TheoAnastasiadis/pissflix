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
exports.SuccesfullTMDBAggregateResponse = exports.UnsuccesfullTMDBResponse = exports.successfullTMDBResponse = void 0;
const t = __importStar(require("io-ts"));
const successfullTMDBResponse = t.partial({
    adult: t.boolean,
    backdrop_path: t.string,
    belongs_to_collection: t.string,
    budget: t.number,
    genres: t.array(t.type({
        id: t.number,
        name: t.string,
    })),
    homepage: t.string,
    id: t.number,
    imdb_id: t.string,
    original_language: t.string,
    original_title: t.string,
    overview: t.string,
    popularity: t.number,
    poster_path: t.string,
    production_companies: t.array(t.type({
        id: t.number,
        logo_path: t.string,
        name: t.string,
        origin_country: t.string,
    })),
    production_countries: t.array(t.type({
        iso_3166_1: t.string,
        name: t.string,
    })),
    release_date: t.string,
    revenue: t.number,
    runtime: t.number,
    spoken_languages: t.array(t.type({
        iso_639_1: t.string,
        name: t.string,
    })),
    status: t.union([
        t.literal("Rumored"),
        t.literal("Planned"),
        t.literal("In Production"),
        t.literal("Post Production"),
        t.literal("Released"),
        t.literal("Canceled"),
    ]),
    tagline: t.string,
    title: t.string,
    video: t.boolean,
    vote_average: t.number,
    vote_count: t.number,
});
exports.successfullTMDBResponse = successfullTMDBResponse;
const UnsuccesfullTMDBResponse = t.partial({
    status_message: t.string,
    success: t.boolean,
    status_code: t.number,
});
exports.UnsuccesfullTMDBResponse = UnsuccesfullTMDBResponse;
const SuccesfullTMDBAggregateResponse = t.type({
    page: t.number,
    results: t.array(t.partial({
        poster_path: t.string,
        adult: t.boolean,
        overview: t.string,
        release_date: t.string,
        genre_ids: t.array(t.number),
        id: t.number,
        original_title: t.string,
        original_language: t.string,
        title: t.string,
        backdrop_path: t.string,
        popularity: t.number,
        vote_count: t.number,
        video: t.boolean,
        vote_average: t.number,
    })),
    total_results: t.number,
    total_pages: t.number,
});
exports.SuccesfullTMDBAggregateResponse = SuccesfullTMDBAggregateResponse;
