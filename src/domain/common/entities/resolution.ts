import * as t from "io-ts"
import { Searcher } from "fast-fuzzy"
import { pipe } from "fp-ts/lib/function"

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
const matcher = new Searcher(Object.values(videoResolutions).flat())
export const fuzzyMatchResolution : (s: string) => keyof typeof videoResolutions = (s) => //converts resolution string to one of the resolution keys above
    Object.keys(videoResolutions).find((key) => 
        videoResolutions[key as keyof typeof videoResolutions].includes(
            matcher.search(s)[0]
        )
    )  as keyof typeof videoResolutions

//Compare resolutions
export const indexOfResolution = (resolution: keyof typeof videoResolutions) => //gets the key index
    pipe(
        Object.keys(videoResolutions).findIndex(key => resolution == key),
        (index) => (index == -1 ? 6 : index)
    ) //all -1 values will be mapped to 'Unknown'

//Branded type
export const Resolution = t.keyof(videoResolutions)
