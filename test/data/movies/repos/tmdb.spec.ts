import { paginationParams } from "../../../../src/core/sharedObjects/paginationHandler"
import { Result } from "../../../../src/core/sharedObjects/result"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"
import { Movie } from "../../../../src/domain/movies/entities/movie.entity"
import {
    MovieImage,
    Language,
    Genre,
} from "../../../../src/domain/movies/entities/subentities"

const repo = new TMDBRepo()

const validTMDBId = 550
const invalidTMDBId = 0
const pagination: paginationParams = { page: 1, limit: 5 }

describe("getMovieById(id)", () => {
    test("given a valid TMDB id returns a movie", async () => {
        const result: Result<Movie | undefined> = await repo.getMovieById(
            validTMDBId
        )
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toBeDefined()
        expect(result.getValue()?.adult).toBeDefined()
        expect(result.getValue()?.background).toBeDefined()
        expect(result.getValue()?.background).toBeInstanceOf(MovieImage)
        expect(result.getValue()?.genres).toBeDefined()
        expect(result.getValue()?.id).toBe(validTMDBId)
        expect(result.getValue()?.languages).toBeDefined()
        expect(result.getValue()?.overview).toBeDefined()
        expect(result.getValue()?.popularity).toBeDefined()
        expect(result.getValue()?.poster).toBeDefined()
        expect(result.getValue()?.poster).toBeInstanceOf(MovieImage)
        expect(result.getValue()?.countries).toBeDefined()
        expect(result.getValue()?.release).toBeDefined()
        expect(result.getValue()?.runtime).toBeDefined()
        expect(result.getValue()?.status).toBeDefined()
        expect(result.getValue()?.tagline).toBeDefined()
        expect(result.getValue()?.rating).toBeDefined()
    })
    test("given an invalid TMDB id returns an error", async () => {
        const result: Result<Movie | undefined> = await repo.getMovieById(
            invalidTMDBId
        )
        expect(result.isFailure).toBe(true)
        expect(result.errorValue()).toBeDefined()
    })
})

const validStartDate = new Date(2000, 0, 0)
const validEndDate = new Date(2001, 7, 7)
const invalidStartDate = new Date(2080, 0, 0) //very far into the future

describe("getMoviesByRealeaseDate(startDate, endDate)", () => {
    test("given valid start and end dates TMDB returns an array of movies", async () => {
        const result: Result<Movie[]> = await repo.getMoviesByRealeaseDate(
            validStartDate,
            validEndDate,
            pagination
        )
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toBeDefined()
        for (const movie of result.getValue() || []) {
            expect(movie.adult).toBeDefined()
            expect(movie.background).toBeDefined()
            expect(movie.background).toBeInstanceOf(MovieImage)
            expect(movie.genres).toBeDefined()
            expect(movie.languages).toBeDefined()
            expect(movie.overview).toBeDefined()
            expect(movie.popularity).toBeDefined()
            expect(movie.poster).toBeDefined()
            expect(movie.poster).toBeInstanceOf(MovieImage)
            expect(movie.countries).toBeDefined()
            expect(movie.release).toBeDefined()
            expect(movie.runtime).toBeDefined()
            expect(movie.status).toBeDefined()
            expect(movie.tagline).toBeDefined()
            expect(movie.rating).toBeDefined()
        }
    })
    test("given invalid dates returns an error", async () => {
        const result: Result<Movie[]> = await repo.getMoviesByRealeaseDate(
            invalidStartDate,
            validEndDate,
            pagination
        )
        expect(result.isFailure).toBe(true)
        expect(result.errorValue()).toBeDefined()
    })
})

const firstLanguage = new Language("en", "639-1")
const secondLanguage = new Language("fr", "639-1")
const invalidLanguage = new Language("--", "639-1")

describe("getMoviesByLanguage(language)", () => {
    test("given a valid language returns an array of movies", async () => {
        const result: Result<Movie[]> = await repo.getMoviesByLanguage(
            firstLanguage,
            pagination
        )
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toBeDefined()
        for (const movie of result.getValue() || []) {
            expect(movie.adult).toBeDefined()
            expect(movie.background).toBeDefined()
            expect(movie.background).toBeInstanceOf(MovieImage)
            expect(movie.genres).toBeDefined()
            expect(movie.languages).toBeDefined()
            expect(movie.overview).toBeDefined()
            expect(movie.popularity).toBeDefined()
            expect(movie.poster).toBeDefined()
            expect(movie.poster).toBeInstanceOf(MovieImage)
            expect(movie.countries).toBeDefined()
            expect(movie.release).toBeDefined()
            expect(movie.runtime).toBeDefined()
            expect(movie.status).toBeDefined()
            expect(movie.tagline).toBeDefined()
            expect(movie.rating).toBeDefined()
        }
    })
    test("given an array of valid languages returns an array of movies", async () => {
        const result: Result<Movie[] | undefined> =
            await repo.getMoviesByLanguage(
                [firstLanguage, secondLanguage],
                pagination
            )
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toBeDefined()
        for (const movie of result.getValue() || []) {
            expect(movie.adult).toBeDefined()
            expect(movie.background).toBeDefined()
            expect(movie.background).toBeInstanceOf(MovieImage)
            expect(movie.genres).toBeDefined()
            expect(movie.languages).toBeDefined()
            expect(movie.overview).toBeDefined()
            expect(movie.popularity).toBeDefined()
            expect(movie.poster).toBeDefined()
            expect(movie.poster).toBeInstanceOf(MovieImage)
            expect(movie.countries).toBeDefined()
            expect(movie.release).toBeDefined()
            expect(movie.runtime).toBeDefined()
            expect(movie.status).toBeDefined()
            expect(movie.tagline).toBeDefined()
            expect(movie.rating).toBeDefined()
        }
    })
    test("given an invalid language return error result", async () => {
        const result: Result<Movie[] | undefined> =
            await repo.getMoviesByLanguage(invalidLanguage, pagination)
        expect(result.isFailure).toBe(true)
        expect(result.errorValue()).toBeDefined()
    })
})

const validGenre: Genre = { uniqueId: 28, name: "Action" }
const invalidGenre: Genre = { uniqueId: 0, name: "Non existent genre" }

describe("getMoviesByGenre(genre)", () => {
    test("given a valid genre returns an array of movies", async () => {
        const result: Result<Movie[]> = await repo.getMoviesByGenre(
            validGenre,
            pagination
        )
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toBeDefined()
        for (const movie of result.getValue() || []) {
            expect(movie.adult).toBeDefined()
            expect(movie.background).toBeDefined()
            expect(movie.background).toBeInstanceOf(MovieImage)
            expect(movie.genres).toBeDefined()
            expect(movie.languages).toBeDefined()
            expect(movie.overview).toBeDefined()
            expect(movie.popularity).toBeDefined()
            expect(movie.poster).toBeDefined()
            expect(movie.poster).toBeInstanceOf(MovieImage)
            expect(movie.countries).toBeDefined()
            expect(movie.release).toBeDefined()
            expect(movie.runtime).toBeDefined()
            expect(movie.status).toBeDefined()
            expect(movie.tagline).toBeDefined()
            expect(movie.rating).toBeDefined()
        }
    })

    test("given an invalid genre return error result", async () => {
        const result: Result<Movie[] | undefined> = await repo.getMoviesByGenre(
            invalidGenre,
            pagination
        )
        expect(result.isFailure).toBe(true)
        expect(result.errorValue()).toBeDefined()
    })
})
