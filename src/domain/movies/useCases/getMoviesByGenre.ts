import { identity, pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { Genre, GenreT } from "../entities/genre"
import { MoviesRepoT } from "../repos/movies.repo"
import * as E from "fp-ts/Either"
import * as A from "fp-ts/Array"

export const getMoviesByGenre =
    (repo: MoviesRepoT) =>
    (pagination: paginationParamsT) =>
    (genre: GenreT | Array<GenreT>) =>
        pipe(
            genre,
            E.fromPredicate((genre) => Array.isArray(genre), identity),
            E.match(
                (genre) => repo.findMany({ genre }, pagination),
                (genres) =>
                    pipe(
                        genres as GenreT[],
                        A.map(Genre.decode),
                        A.filter(E.isRight),
                        A.map((genre) => genre.right),
                        (genres) => repo.findMany({ genre: genres }, pagination)
                    )
            )
        )
