import { paginationParamsT } from "../../../../src/core/sharedObjects/pagination"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
import * as E from "fp-ts/Either"
import * as O from "fp-ts/Option"

import { MovieT } from "../../../../src/domain/movies/entities/movie"
import moment from "moment"
import { Language } from "../../../../src/domain/movies/entities/language"
import { GenreT } from "../../../../src/domain/movies/entities/genre"
import { tmdbGenres } from "../../../../src/data/movies/repos/helpers/tmdbGenres"

const validTMDBId = 550
const invalidTMDBId = 0
const pagination: paginationParamsT = { page: 1, limit: 5 }

describe("find one movie by id", () => {
    test("given a valid TMDB id returns a movie", async () => {
        const movie = await TMDBRepo.findOne(validTMDBId)()
        expect(E.isRight(movie)).toBe(true)
    })
    test("given an invalid TMDB id returns an error", async () => {
        const movie = await TMDBRepo.findOne(invalidTMDBId)()
        expect(E.isRight(movie)).toBe(false)
    })
})

const startDate = moment("1980-1-1").unix()
const endDate = moment("1980-1-6").unix()

describe("find movies by release date", () => {
    test("given valid start and end dates TMDB returns an array of movies", async () => {
        const movies = await TMDBRepo.findMany(
            { startDate, endDate },
            pagination
        )()
        expect(E.isRight(movies)).toBeTruthy
        const movieSvalue = E.getOrElse(() => [] as MovieT[])(movies)
        expect(movieSvalue).toHaveLength(pagination.limit)
        for (const movie of movieSvalue) {
            expect(movie.release).toBeGreaterThanOrEqual(startDate)
            expect(movie.release).toBeLessThanOrEqual(endDate)
        }
    })
})

const french = Language.decode("fr")
const german = Language.decode("fr")

describe("find movies by screenplay language", () => {
    test("given a valid language returns an array of movies", async () => {
        if (E.isRight(french)) {
            const movies = await TMDBRepo.findMany(
                { language: french.right },
                pagination
            )()
            expect(E.isRight(movies)).toBeTruthy
            const movieSvalue = E.getOrElse(() => [] as MovieT[])(movies)
            expect(movieSvalue).toHaveLength(pagination.limit)
        } else {
            throw new Error(
                "Test could not be completed, please provide a valid language."
            )
        }
    })
    test("given an array of valid languages returns an array of movies", async () => {
        if (E.isRight(french) && E.isRight(german)) {
            const movies = await TMDBRepo.findMany(
                { language: [french.right, german.right] },
                pagination
            )()
            expect(E.isRight(movies)).toBeTruthy
            const movieSvalue = E.getOrElse(() => [] as MovieT[])(movies)
            expect(movieSvalue).toHaveLength(pagination.limit)
        } else {
            throw new Error(
                "Test could not be completed, please provide two valid languages."
            )
        }
    })
})

const validGenre: GenreT = { uniqueId: 28, name: "Action" }

describe("find movies by genre", () => {
    test("given a valid genre returns an array of movies", async () => {
        const movies = await TMDBRepo.findMany(
            { genre: validGenre },
            pagination
        )()
        expect(E.isRight(movies)).toBeTruthy()
        const movieSvalue = E.getOrElse(() => [] as MovieT[])(movies)
        expect(movieSvalue).toHaveLength(pagination.limit)
    })
})

const validGenres: GenreT[] = tmdbGenres
describe("get genres", () => {
    test("returns TMDB genres", () => {
        const genres = TMDBRepo.getGenres()
        expect(O.isSome(genres)).toBeTruthy()
    })
})

describe("get trending movies", () => {
    test("returns the trending movies of the day", async () => {
        const movies = await TMDBRepo.findMany(
            { trendingType: "day" },
            pagination
        )()
        expect(E.isRight(movies)).toBeTruthy()
    })
    test("returns the trending movies of the week", async () => {
        const movies = await TMDBRepo.findMany(
            { trendingType: "week" },
            pagination
        )()
        expect(E.isRight(movies)).toBeTruthy()
    })
})
