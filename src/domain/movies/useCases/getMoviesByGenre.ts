import { identity, pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../core/sharedObjects/pagination"
import { Genre, GenreT } from "../entities/genre"
import { MoviesRepoT } from "../repos/movies.repo"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"
import * as A from "fp-ts/Array"

export const getMoviesByGenre =
    (genre: GenreT | Array<GenreT>) =>
    (pagination: paginationParamsT) =>
    (repo: MoviesRepoT) => {
        const getWithOneGenre = (genre: GenreT) =>
            pipe(
                genre,
                E.fromPredicate(
                    Genre.is,
                    () => `${genre} is not a valid genre`
                ),
                E.map((genre) =>
                    repo.findMany(
                        {
                            genre,
                        },
                        pagination
                    )
                )
            )

        const getWithMultipleGenres = (genres: Array<GenreT>) =>
            pipe(
                genres,
                A.filter(Genre.is),
                O.fromPredicate((xs) => xs.length > 0),
                E.fromOption(
                    () => `Array [${genres}] contains no valid genres.`
                ),
                E.map((filteredGenres) =>
                    repo.findMany({ genre: filteredGenres }, pagination)
                )
            )

        return pipe(
            genre,
            E.fromPredicate(Array.isArray, identity),
            E.match(getWithOneGenre, getWithMultipleGenres)
        )
    }
