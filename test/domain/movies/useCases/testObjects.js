"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleMovie = exports.image = void 0;
exports.image = {
    baseURL: "example.com",
    filePath: "/image.jpg",
    variations: undefined,
    getDefaultQuality: function () {
        return (this.baseURL + this.filePath);
    },
    getHighestQuality: function () {
        return this.getDefaultQuality();
    },
    getLowestQuality: function () {
        return this.getDefaultQuality();
    },
};
exports.exampleMovie = {
    adult: false,
    background: exports.image,
    id: 123456,
    overview: "Overview",
    popularity: 100,
    poster: exports.image,
    release: new Date("2020"),
    runtime: 100,
    tagline: "Tagline",
    imdbId: "tt1234567",
    status: "Status",
    rating: 100,
    title: "Title",
    genres: [
        {
            name: "Genre",
            uniqueId: 100,
        },
    ],
    languages: [
        {
            name: "Language",
            isoCode: "ln",
        },
    ],
    countries: [
        {
            name: "Country",
            isoCode: "co",
        },
    ],
};
