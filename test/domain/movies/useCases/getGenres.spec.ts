import { instance, mock, when } from 'ts-mockito'
import { TMDBRepo } from '../../../../src/data/movies/repos/tmdb'
import { Genre } from '../../../../src/domain/movies/entities/subentities'
import { IMoviesRepo } from '../../../../src/domain/movies/repos/movies.repo'
import {getGenres} from '../../../../src/domain/movies/useCases/getGenres'
import { Result } from '../../../../src/core/sharedObjects/result'

const mockedRepo : IMoviesRepo = mock(TMDBRepo)
const exampleGenres : Genre[] = [{uniqueId: 0, name: "firstGenre"}, {uniqueId: 1, name: "secondGenre"}]
when(mockedRepo.getGenres()).thenReturn(new Result<Genre[]>(true, undefined, exampleGenres))
const mockedRepoInstance: IMoviesRepo = instance(mockedRepo)

describe('getGenres()', () => {
    test("returns list of genres", () => {
        const result = getGenres(mockedRepoInstance)
        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toEqual(exampleGenres)
    })
})