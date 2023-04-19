import { MovieImage } from "../../../entities/subtypes"

export class TMDBBackgroundImage extends MovieImage {
    baseURL!: string
    filePath!: string
    variations!: [string, string, string]
    constructor(filePath: string) {
        super("https://image.tmdb.org/t/p", filePath, ["w300", "w780", "w1280"])
    }

    getDefaultQuality :() => string = () => {
        return this.baseURL + "/" + this.variations[1] + "/" + this.filePath
    }
    getHighestQuality(): string {
        return this.baseURL + "/" + this.variations[2] + "/" + this.filePath
    }
    getLowestQality(): string {
        return this.baseURL + "/" + this.variations[0] + "/" + this.filePath
    }
}

export class TMDBPosterImage extends MovieImage {
    baseURL!: string
    filePath!: string
    variations!: [string, string, string]
    constructor(filePath: string) {
        super("https://image.tmdb.org/t/p", filePath, ["w342", "w500", "w780"])
    }

    getDefaultQuality(): string {
        return this.baseURL + "/" + this.variations[1] + "/" + this.filePath
    }
    getHighestQuality(): string {
        return this.baseURL + "/" + this.variations[2] + "/" + this.filePath
    }
    getLowestQality(): string {
        return this.baseURL + "/" + this.variations[0] + "/" + this.filePath
    }
}
