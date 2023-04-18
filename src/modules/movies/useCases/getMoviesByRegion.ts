import { Region } from "../../../shared/Objects/regions"
import { Result } from "../../../shared/Objects/result"
import { Movie } from "../entities/movie.entity"
import { Language } from "../entities/subtypes"
import { IMoviesRepo } from "../repos/movies.repo.interface"

export function getMoviesByGenre(
    repo: IMoviesRepo,
    region: Region
): Promise<Result<Movie[]>> {
    //validate year
    //history
    //analytics
    return repo.getMoviesByLanguage(
        region.languages.map(
            (language) => new Language(language, region.isoType)
        )
    )
}
