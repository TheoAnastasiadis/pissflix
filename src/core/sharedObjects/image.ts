export interface Image {
    baseURL: String
    filePath: String | ""
    variations: String[] | undefined

    getDefaultQuality(): String
    getHighestQuality(): String
    getLowestQuality(): String
}
