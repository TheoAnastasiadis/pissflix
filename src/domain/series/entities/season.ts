import * as t from "io-ts"
import { Image } from "../../movies/entities/image"
import { episode } from "./episode"

export const season = t.type({
    id: t.number,
    season_imdbId: t.union([t.string, t.null]),
    order: t.string,
    background: Image,
    poster: Image,
    episodes: t.array(t.number), //episode ids
})

export type SeasonT = t.TypeOf<typeof season>
