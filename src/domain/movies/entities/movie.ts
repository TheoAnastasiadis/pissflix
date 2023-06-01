import * as t from "io-ts"
import { Country } from "./country"
import { Genre } from "./genre"
import { Language } from "./language"
import { Image } from "./image"

export const Movie = t.readonly(
    t.type({
        background: Image,
        genres: t.array(Genre),
        id: t.number,
        languages: t.array(Language),
        title: t.string,
        overview: t.string,
        poster: Image,
        countries: t.array(Country),
        release: t.number, //unix time
        runtime: t.number,
        tagline: t.string,
        imdbId: t.union([t.string, t.null]),
    })
)

export type MovieT = t.TypeOf<typeof Movie>
