import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { SeriesGenresT, seriesGenres } from "../entities/seriesGenres"
import { SeriesRepoT } from "../repos/series.repo"
import { identity, pipe } from "fp-ts/lib/function"
import * as E from "fp-ts/Either"
import * as A from "fp-ts/Array"

export const getMoviesByGenre =
    (repo: SeriesRepoT) =>
    (pagination: paginationParamsT) =>
    (genre: SeriesGenresT | Array<SeriesGenresT>) =>
        pipe(
            genre,
            E.fromPredicate((genre) => Array.isArray(genre), identity),
            E.match(
                (genre) => repo.findMany({ genre }, pagination),
                (genres) =>
                    pipe(
                        genres as SeriesGenresT[],
                        A.map(seriesGenres.decode),
                        A.filter(E.isRight),
                        A.map((genre) => genre.right),
                        (genres) => repo.findMany({ genre: genres }, pagination)
                    )
            )
        )
