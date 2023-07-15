import { TMDBSeriesRepo } from "../../../../src/data/series/repos/tmdb"
import * as E from "fp-ts/Either"
import { SeriesGenresT } from "../../../../src/domain/series/entities/seriesGenres"
import { SeriesT } from "../../../../src/domain/series/entities/series"

const validTMDBId = 64230
const invalidTMDBId = 0

describe("find one series by id", () => {
    test("given a valid TMDB id returns a tv show", async () => {
        const show = await TMDBSeriesRepo.findSeries(validTMDBId)()
        expect(E.isRight(show)).toBe(true)
    })
    test("given an invalid TMDB id returns an error", async () => {
        const show = await TMDBSeriesRepo.findSeries(invalidTMDBId)()
        expect(E.isRight(show)).toBe(false)
    })
})

describe("find one season by id", () => {
    test("given a valid  id returns a tv season", async () => {
        const show = await TMDBSeriesRepo.findSeason(validTMDBId)(1)()
        expect(E.isRight(show)).toBe(true)
    })
    test("given an invalid id returns an error", async () => {
        const show = await TMDBSeriesRepo.findSeason(validTMDBId)(999)()
        expect(E.isRight(show)).toBe(false)
    })
})

describe("find one episode by id", () => {
    test("given a valid id returns a tv episode", async () => {
        const show = await TMDBSeriesRepo.findEpisode(validTMDBId)(1)(1)()
        expect(E.isRight(show)).toBe(true)
    })
    test("given an invalid id returns an error", async () => {
        const show = await TMDBSeriesRepo.findEpisode(validTMDBId)(1)(9999)()
        expect(E.isRight(show)).toBe(false)
    })
})

const validGenre: SeriesGenresT = { id: 16, name: "Animation" }
const pagination = { page: 0, limit: 5 }

describe("find series by genre", () => {
    test("given a valid genre returns an array of tv shows", async () => {
        const shows = await TMDBSeriesRepo.findMany(
            { genre: validGenre },
            pagination
        )()

        expect(E.isRight(shows)).toBeTruthy()
        const showsValue = E.getOrElse(() => [] as SeriesT[])(shows)
        expect(showsValue).toHaveLength(pagination.limit)
    })
})

describe("get trending tv shows", () => {
    test("returns the trending series of the day", async () => {
        const shows = await TMDBSeriesRepo.findMany(
            { trendingType: "day" },
            pagination
        )()
        expect(E.isRight(shows)).toBeTruthy()
    })
    test("returns the trending series of the week", async () => {
        const shows = await TMDBSeriesRepo.findMany(
            { trendingType: "week" },
            pagination
        )()
        expect(E.isRight(shows)).toBeTruthy()
    })
})

describe("search for tv show", () => {
    test("returns shows that match the query string", async () => {
        const shows = await TMDBSeriesRepo.findMany(
            { query: "breaking bad" },
            pagination
        )()
        expect(E.isRight(shows)).toBeTruthy()
    })
})
