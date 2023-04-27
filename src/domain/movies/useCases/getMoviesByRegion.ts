import { paginationParams } from "../../../core/sharedObjects/paginationHandler"
import { Region } from "../../../core/sharedObjects/regions"
import { Result } from "../../../core/sharedObjects/result"
import { Movie } from "../entities/movie.entity"
import { Language } from "../entities/subentities"
import { IMoviesRepo } from "../repos/movies.repo"

export function getMoviesByRegion(
    repo: IMoviesRepo,
    region: Region,
    pagination: paginationParams = { page: 1, limit: 20 }
): Promise<Result<Movie[]>> {
    return repo.getMoviesByLanguage(
        region.languages.map(
            (language) => new Language(language, region.isoType)
        ),
        pagination
    )
}
