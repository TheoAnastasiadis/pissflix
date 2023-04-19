"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
class Movie {
    constructor(props) {
        this.adult = props.adult;
        this.background = props.background;
        this.id = props.id;
        this.overview = props.overview;
        this.popularity = props.popularity;
        this.poster = props.poster;
        this.release = props.release;
        this.runtime = props.runtime;
        this.tagline = props.tagline;
        this.imdbId = props.imdbId;
        this.status = props.status;
        this.rating = props.rating;
        this.title = props.title;
        this.genres = props.genres;
        this.languages = props.languages;
        this.countries = props.countries;
    }
}
exports.Movie = Movie;
