import { identity, pipe } from "fp-ts/lib/function"
import { paginationParamsT } from "../../../../src/core/sharedObjects/pagination"
import { TMDBRepo } from "../../../../src/data/movies/repos/tmdb"

import * as E from "fp-ts/Either"
import * as T from "fp-ts/Task"
import * as TE from "fp-ts/TaskEither"

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
        console.error(movie)
        expect(E.isRight(movie)).toBe(false)
    })
})

// const validStartDate = new Date(2000, 0, 0)
// const validEndDate = new Date(2001, 7, 7)
// const invalidStartDate = new Date(2080, 0, 0) //very far into the future

// describe("getMoviesByRealeaseDate(startDate, endDate)", () => {
//     test("given valid start and end dates TMDB returns an array of movies", async () => {

//     })
//     test("given invalid dates returns an error", async () => {

//     })
// })

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
