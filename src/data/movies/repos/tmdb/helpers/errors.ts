import { Result } from "../../../../../core/sharedObjects/result"

export class ErrorResult<T> {
    invalidCredentials = (): Result<T> =>
        new Result<T>(false, "TMDB API: Invalid credentials")
    noResults = (message: string): Result<T> =>
        new Result<T>(false, `TMDB API: No results (info:{${message})}`)
    notResponding = (): Result<T> =>
        new Result<T>(
            false,
            "Unexpected Error: Connection to TMDB server could not be made"
        )
}
