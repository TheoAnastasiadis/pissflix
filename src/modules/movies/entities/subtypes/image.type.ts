import { Image } from "../../../../shared/Objects/image"

export abstract class MovieImage implements Image {
    baseURL = ""
    filePath = ""
    variations: [String, String, String]
    constructor(
        baseUrl: string,
        filePath: string,
        variations: [string, string, string]
    ) {
        this.baseURL = baseUrl
        this.filePath = filePath
        this.variations = variations
    }
    getDefaultQuality(): String {
        throw new Error("Method not implemented.")
    }
    getHighestQuality(): String {
        throw new Error("Method not implemented.")
    }
    getLowestQuality(): String {
        throw new Error("Method not implemented.")
    }
}
