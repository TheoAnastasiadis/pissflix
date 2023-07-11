import * as t from "io-ts"
import { Image } from "../../movies/entities/image"

export const episode = t.type({
    id: t.number,
    episode_imdbId: t.union([t.string, t.null]),
    order: t.string,
    background: Image,
    poster: Image,
})

export type EpisodeT = t.TypeOf<typeof episode>
