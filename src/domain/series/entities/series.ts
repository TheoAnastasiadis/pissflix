import * as t from "io-ts"
import { Image } from "../../movies/entities/image"
import { seriesGenres } from "./seriesGenres"
import { season } from "./season"

export const series = t.readonly(
    t.type({
        id: t.number,
        title: t.string,
        background: Image,
        poster: Image,
        genres: t.array(seriesGenres),
        overview: t.string,
        series_imdbId: t.union([t.string, t.null]),
        seasons: t.array(season),
    })
)

export type SeriesT = t.TypeOf<typeof series>
