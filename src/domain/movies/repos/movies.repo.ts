import { TaskEither } from "fp-ts/lib/TaskEither"
import * as O from "fp-ts/Option"

import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { MovieT } from "../entities/movie"
import { GenreT } from "../entities/genre"
import { LanguageT } from "../entities/language"
import { DateBrandType } from "../entities/date"

export type MoviesRepoT = {
    findOne(id: number): TaskEither<string, MovieT>
    findMany(
        params:
            | (
                  | { genre: GenreT | Array<GenreT> }
                  | (
                        | { startDate: DateBrandType; endDate?: DateBrandType } //one of
                        | { startDate?: DateBrandType; endDate: DateBrandType }
                    )
                  | { language: LanguageT | Array<LanguageT> }
              )
            | { trendingType: "day" | "week" }
            | { query?: string },
        pagination: paginationParamsT
    ): TaskEither<string, Array<MovieT>>
    getGenres(): O.Option<Array<GenreT>>
}
