import * as t from "io-ts"
import { Searcher } from "fast-fuzzy"
import { pipe } from "fp-ts/lib/function"

export interface VideoResolution {
    readonly VideoResolution: unique symbol
}

const videoResolutions = {
    SD: ["SD", "480p"],
    HD: ["HD", "720p"],
    "Full HD": ["FHD", "1080p"],
    "2K": ["QHD", "1440p", "2K"],
    "4K": ["4K", "2160p"],
    "8K": ["8K", "4320p"],
    Unknown: ["Unknown"],
}

//Match texts to resolution categories
const matcher = new Searcher(Object.entries(videoResolutions).flat())
export const fuzzyMatchResolution = (s: string) => matcher.search(s)[0]

//Compare resolutions
export const indexOfResolution = (resolution: string) =>
    pipe(
        Object.entries(videoResolutions).findIndex((entries) =>
            entries.includes(resolution)
        ),
        (index) => (index == -1 ? 6 : index)
    ) //all -1 values will be mapped to 'Unknown'

//Branded type
export const Resolution = t.brand(
    t.string,
    (input): input is t.Branded<string, VideoResolution> =>
        Object.entries(videoResolutions).flat().includes(input),
    "VideoResolution"
)
