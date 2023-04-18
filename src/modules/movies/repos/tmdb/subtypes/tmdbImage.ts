import { MovieImage } from "../../../entities/subtypes"

export class TMDBBackgroundImage extends MovieImage {
    constructor(filePath: string) {
        super("https://image.tmdb.org/t/p", filePath, ["w300", "w780", "w1280"])
    }

    getDefaultQuality(): String {
        return this.baseURL + "/" + this.variations[1] + "/" + this.filePath
    }
    getHighestQuality(): String {
        return this.baseURL + "/" + this.variations[2] + "/" + this.filePath
    }
    getLowestQality(): String {
        return this.baseURL + "/" + this.variations[0] + "/" + this.filePath
    }
}

export class TMDBPosterImage extends MovieImage {
    constructor(filePath: string) {
        super("https://image.tmdb.org/t/p", filePath, ["w342", "w500", "w780"])
    }

    getDefaultQuality(): String {
        return this.baseURL + "/" + this.variations[1] + "/" + this.filePath
    }
    getHighestQuality(): String {
        return this.baseURL + "/" + this.variations[2] + "/" + this.filePath
    }
    getLowestQality(): String {
        return this.baseURL + "/" + this.variations[0] + "/" + this.filePath
    }
}
