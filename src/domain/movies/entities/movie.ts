import * as t from "io-ts"
import { Country } from "./country"
import { Genre } from "./genre"
import { ImdbId } from "./imdbId"
import { Language } from "./language"
import { Image } from "./image"

const Movie = t.union([
    t.readonly(
        t.type({
            background: Image,
            genres: t.array(Genre),
            id: t.number,
            languages: t.array(Language),
            title: t.string,
            overview: t.string,
            poster: Image,
            countries: t.array(Country),
            release: t.number,
            runtime: t.number,
            tagline: t.string,
        })
    ),
    t.partial({
        imdbId: ImdbId,
    }),
])

type MovieT = t.TypeOf<typeof Movie>

export { Movie, MovieT }
