import { identity, pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../../src/core/sharedObjects/pagination"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"

import * as E from "fp-ts/Either"
import * as T from "fp-ts/Task"
import * as TE from "fp-ts/TaskEither"
import { MovieT } from "../../../../src/domain/movies/entities/movie"
import moment from "moment"

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

describe("getMoviesByRealeaseDate(startDate, endDate)", () => {
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

// const firstLanguage = new Language("en", "639-1")
// const secondLanguage = new Language("fr", "639-1")
// const invalidLanguage = new Language("--", "639-1")

// describe("getMoviesByLanguage(language)", () => {
//     test("given a valid language returns an array of movies", async () => {

//     })
//     test("given an array of valid languages returns an array of movies", async () => {

//     })
//     test("given an invalid language return error result", async () => {

//     })
// })

// const validGenre: Genre = { uniqueId: 28, name: "Action" }
// const invalidGenre: Genre = { uniqueId: 0, name: "Non existent genre" }

// describe("getMoviesByGenre(genre)", () => {
//     test("given a valid genre returns an array of movies", async () => {

//     })

//     test("given an invalid genre return error result", async () => {

//     })
// })

// const validGenres: Genre[] = tmdbGenres
// describe("getGenres()", () => {

// })

// describe("getTrendingMovies(day | week)", () => {
//     test("returns the trending movies of the day", async () => {

//     })
//     test("returns the trending movies of the week", async () => {

//     })
//     test("respects the page number and limit given in the paginations params", async () => {

//     })
// })
