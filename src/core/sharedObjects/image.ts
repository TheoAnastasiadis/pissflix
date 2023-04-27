export interface Image {
    baseURL: string
    filePath: string | ""
    variations: string[] | undefined

    getDefaultQuality(): string
    getHighestQuality(): string
    getLowestQuality(): string
}
