import * as t from "io-ts"
import { Searcher } from "fast-fuzzy"

export interface VideoResolution {
    readonly VideoResolution: unique symbol
}

const videoResolutions = [
    "SD",
    "480p",
    "HD",
    "720p",
    "FHD",
    "1080p",
    "QHD",
    "1440p",
    "2K",
    "4K",
    "2160p",
    "8K",
    "4320p",
    "Unknown",
]

const matcher = new Searcher(videoResolutions)
export const fuzzyMatchResolution = (s: string) => matcher.search(s)[0]

export const Resolution = t.brand(
    t.string,
    (input): input is t.Branded<string, VideoResolution> =>
        videoResolutions.includes(input),
    "VideoResolution"
)
