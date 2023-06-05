import * as t from "io-ts"
import { Language } from "../../movies/entities/language"

export const subtitle = t.type({
    id: t.number,
    language: t.union([Language, t.null]),
    fps: t.number,
})

export type SubtitleT = t.TypeOf<typeof subtitle>
