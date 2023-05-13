import { Image } from "../../../../core/sharedObjects/image.ts-tbd"

export abstract class MovieImage implements Image {
    baseURL: string
    filePath: string
    variations: [string, string, string] | undefined
    constructor(
        baseUrl: string = "",
        filePath: string = "",
        variations: [string, string, string] | undefined = undefined
    ) {
        this.baseURL = baseUrl
        this.filePath = filePath
        this.variations = variations
    }
    getDefaultQuality(): string {
        throw new Error("Method not implemented.")
    }
    getHighestQuality(): string {
        throw new Error("Method not implemented.")
    }
    getLowestQuality(): string {
        throw new Error("Method not implemented.")
    }
}
